# Viber

## 1. Title of the Project
Viber

## 2. Project Description
Viber is a modern, production‑ready web application built with Next.js and TypeScript. It provides a scalable foundation for building authenticated, data‑driven user experiences with a strong focus on developer ergonomics, performance, and accessibility.

A live deployment is available at: https://viber-five.vercel.app

Tech stack highlights:
- Framework and Language: Next.js (App Router) and TypeScript
- UI and Styling: Tailwind CSS, Radix UI, Lucide Icons, Embla Carousel, next-themes
- Data and APIs: Prisma ORM, tRPC (type‑safe APIs), TanStack React Query, SuperJSON
- Authentication: Clerk
- Background/Events: Inngest
- Utilities: Zod (validation), date-fns, react-hook-form, prismjs (code highlighting)
- Runtime: React 19, Node.js
- Deployment: Vercel (recommended), Dockerfile included

## 3. Features
- Authentication and user management via Clerk
- Type‑safe end‑to‑end APIs using tRPC
- Database access via Prisma with generated types and migrations
- Modern, accessible UI using Radix UI and Tailwind CSS
- Dark/Light theme support with next-themes
- Data fetching and caching with TanStack React Query
- Charts and visualizations with Recharts
- Carousel and interactive components (Embla, CMDK, etc.)
- Production‑grade rate limiting (rate-limiter-flexible)
- Ready for serverless deployment (Vercel) and containerization (Dockerfile)

## 4. Installation Instructions

### Prerequisites
- Node.js 20+ (LTS recommended)
- A package manager (one of): npm, pnpm, or yarn
- A SQL database supported by Prisma (PostgreSQL, MySQL, SQLite, etc.). Examples below use PostgreSQL.
- A Clerk account (for authentication keys)
- Optional: Docker (to build and run a containerized deployment)

### Environment Variables
Create a .env or .env.local file at the project root and configure required variables. Common variables include:
```
# Database (example for PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# App URL (used by auth/providers)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Inngest (if used)
INNGEST_SIGNING_KEY="your-inngest-signing-key"
INNGEST_EVENT_KEY="your-inngest-event-key"
```
Adjust and add any other environment variables your deployment requires.

### Setup Steps
Using npm (substitute with pnpm or yarn if preferred):
```bash
# 1) Clone the repository
git clone https://github.com/AnjanCode/Viber.git
cd Viber

# 2) Install dependencies
npm install

# 3) Generate Prisma Client (runs automatically on postinstall, safe to run again)
npx prisma generate

# 4) Initialize the database schema
# For first-time local setup, you can use migrate or push:
npx prisma migrate dev --name init
# or
npx prisma db push

# 5) Start the development server
npm run dev
```

### Optional: Run with Docker
Build and run the application locally using Docker (ensure your .env is configured):
```bash
# Build the image
docker build -t viber:local .

# Run the container (exposes port 3000)
docker run --env-file ./.env -p 3000:3000 viber:local
```

## 5. Usage Guidelines

### Local Development
```bash
# Start dev server with Turbopack
npm run dev

# Lint the codebase
npm run lint

# Open Prisma Studio (DB inspector)
npx prisma studio
```
- Access the app at http://localhost:3000
- To enable sign‑in/sign‑up, configure Clerk keys in your environment variables and set your application URL in Clerk.

### Production Build
```bash
# Create an optimized production build
npm run build

# Start the production server
npm run start
```

### Notes
- tRPC provides type‑safe APIs between server and client. Endpoints are organized within the codebase and consumed via TanStack React Query.
- Prisma manages schema and migrations. Update your schema.prisma as needed and run migrations with `npx prisma migrate dev`.

## 6. Contributing

We welcome contributions! Please follow the steps below:

1) Fork the repository and create a feature branch:
```bash
git checkout -b feat/your-feature-name
```

2) Make your changes and ensure the project builds and lints:
```bash
npm run lint
npm run build
```

3) Commit with clear, descriptive messages:
```bash
git add .
git commit -m "feat: add <concise description>"
```

4) Push your branch and open a Pull Request against the main branch. In your PR description:
- Explain the motivation and context for the change
- Include screenshots or recordings for UI changes
- Note any required environment variable or migration changes
- Reference related issues (if any)

5) Be responsive to review feedback and keep commit history clean (squash if requested).

For larger changes, consider opening an issue first to discuss design and scope.

## 7. License
No license file is currently provided. All rights reserved by the repository owner. If you intend to use or redistribute this software, please open an issue to discuss licensing. The owner may choose to add a license (e.g., MIT) in the future.

## 8. Contact Information
- Repository Owner: @AnjanCode (https://github.com/AnjanCode)
- Project Homepage: https://viber-five.vercel.app
- For questions or support, please open an issue in this repository.

## 9. Acknowledgments
- Next.js and React
- Tailwind CSS
- Prisma ORM
- tRPC and TanStack React Query
- Clerk
- Radix UI and Lucide Icons
- Embla Carousel
- Inngest
- Vercel
