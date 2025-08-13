"use client";

import { dark } from "@clerk/themes";
import { useCurrenttheme } from "@/hooks/use-current-theme";
import { UserButton } from "@clerk/nextjs";

interface Props {
    showName? : boolean;
}

export const UserControl = ({ showName } : Props) => {
    const currentTheme = useCurrenttheme();
    
    return (
        <UserButton 
            showName={showName}
            appearance={{
                elements : {
                    userButtonBox: "rounded-md!",
                    userButtonAvatarBox: "rounded-md! size-8!",
                    userButtonTrigger: "rounded-md!"
                },
                baseTheme: currentTheme === "dark" ? dark : undefined,
            }}
        />
    );
}; 