# Viber AI Website Builder

## 1. Title of the Project
Viber AI Website Builder

## 2. Project Description
Viber AI Website Builder is a modern, production‑ready web application built with Next.js and TypeScript. It empowers users to create websites through a user-friendly AI-powered chat interface, automatically generating code and layouts based on user input. Viber provides a scalable foundation for building authenticated, data‑driven user experiences with a strong focus on developer ergonomics, performance, and accessibility.

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
# Build the Docker image
docker build -t viber-app .

# Run the container
docker run -p 3000:3000 --env-file .env viber-app
```

## 5. Features
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

## 6. Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository and create a branch.
2. Make your changes with proper documentation.
3. Submit a pull request describing your modifications.
4. Participate in discussion for feedback and improvements.

## 7. License
No license file is currently provided. All rights reserved by the repository owner. If you intend to use or redistribute this software, please open an issue to discuss licensing. The owner may choose to add a license (e.g., MIT) in the future.

## 8. Contact Information
- Repository Owner: [@AnjanCode](https://github.com/AnjanCode)
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
