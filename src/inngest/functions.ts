import { Sandbox } from "@e2b/code-interpreter"
import { openai, createAgent, createTool, createNetwork, type Tool } from "@inngest/agent-kit";
import { inngest } from "./client";
import { getSandbox, lastAssistantTextMessageContent } from "./utils";
import { z }  from "zod";
import { PROMPT } from "@/prompt";
import { prisma } from "@/lib/db";

interface AgentState {
  summary : string;
  files : {[path : string]: string};
};

export const codeAgentFunction = inngest.createFunction(
  { id: "code-agent" },
  { event: "code-agent/run" },
  async ({ event, step }) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("viber-nextjs-anjan-test");
      return sandbox.sandboxId;
    })


    const codeAgent = createAgent<AgentState>({
      name: "code-agent",
      description : "An expert coding agent",
      system: PROMPT,
      model: openai({
        model: "gpt-4.1",
        defaultParameters : {
          temperature : 0.1
        },
      }),
      tools : [
        createTool({
          name : "terminals",
          description : "Use the terminal to run commands",
          parameters : z.object({
            command : z.string(),
          }),
          handler : async ({ command }, { step }) => {
            return await step?.run("terminal", async () => {
              const buffers = { stdout:"", stderr: "" };
              try {
                const sandbox = await getSandbox(sandboxId);
                const result = await sandbox.commands.run(command, {
                  onStdout: (data : string) => {
                    buffers.stdout += data;
                  },
                  onStderr: (data : string) => {
                    buffers.stderr += data;
                  }
                });
                return result.stdout;
              } catch (error) {
                console.error(
                  `Command failed: ${error} \nstdout: ${buffers.stdout}\nstderror: ${buffers.stderr}`
                );
                return `Command failed: ${error} \nstdout: ${buffers.stdout}\nstderror: ${buffers.stderr}`;
              }
            })
          }
        }),
        createTool({
          name : "CreateOrUpdateFiles",
          description : "Create or update file in sandbox",
          parameters : z.object({
            files : z.array(
              z.object({
                path : z.string(),
                content : z.string(),
              })
            )
          }),
          handler : async (
            { files },
            { step, network } : Tool.Options<AgentState>
          ) => {
            const newFile = await step?.run("CreateOrUpdateFiles", async () => {
              try {
                const updatedFiles = network.state.data.files || {};
                const sandbox = await getSandbox(sandboxId);
                for (const file of files) {
                  await sandbox.files.write(file.path, file.content);
                  updatedFiles[file.path] = file.content;
                } 

                return updatedFiles;
              } catch (error) {
                return "Error : " + error;
              }
            });

            if (typeof newFile === "object") {
              network.state.data.files = newFile;
            }
          }
        }),
        createTool({
          name : "readFiles",
          description : "Read files from the sandbox",
          parameters : z.object({
            files : z.array(z.string())
          }),
          handler : async ({ files }, { step }) => {
            return await step?.run("readFiles", async () => {
              try {
                const sandbox = await getSandbox(sandboxId);
                const contents = [];
                for (const file of files) {
                  const content = await sandbox.files.read(file);
                  contents.push({ path : file, content });
                }
                return JSON.stringify(contents);
              } catch (error) {
                return "Error : " + error;
              }
            })
          }
        })
      ],
      lifecycle : {
        onResponse: async ({ result, network}) => {
          const lastAssistantMessageText = 
            lastAssistantTextMessageContent(result);

          if (lastAssistantMessageText && network) {
            if (lastAssistantMessageText.includes("<task_summary>")) {
              network.state.data.summary = lastAssistantMessageText;
            }
          }

          return result;
        },
      },
    });

    const network = createNetwork<AgentState>({
      name : "coding-agent-network",
      agents : [codeAgent],
      maxIter : 15,
      router : async ({ network }) => {
        const summary = network.state.data.summary;

        if (summary) {
          return;
        }
        return codeAgent;
      }
    });

    const result = await network.run(event.data.value);

    const isError = 
      !result.state.data.summary ||
      Object.keys(result.state.data.files || {}).length === 0;

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });

    await step.run("save-result", async () => {
      if (isError) {
        return await prisma.message.create({
          data : {
            content : "Something went wrong. Please try again.",
            role : "ASSISTANT",
            type : "ERROR"
          },
        });
      }

      return await prisma.message.create({
        data : {
          content : result.state.data.summary,
          role : "ASSISTANT",
          type : "RESULT",
          fragment : {
            create : {
              sandboxUrl : sandboxUrl,
              title : "Fragment", 
              files : result.state.data.files,
            }
          }
        }
      })
    })


    return { 
      url : sandboxUrl,
      title : "Fragment",
      files : result.state.data.files,
      summary : result.state.data.summary
    };
  },
);