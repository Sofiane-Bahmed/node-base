# NodeBase

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-12-FF0072?style=for-the-badge&logo=react)](https://reactflow.dev/)
[![Inngest](https://img.shields.io/badge/Inngest-Background_Jobs-7139F3?style=for-the-badge&logo=inngest)](https://www.inngest.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

NodeBase is a powerful, visual node-based automation platform that allows you to build complex workflows by connecting AI models, external triggers, and messaging services. Built with a modern tech stack focusing on performance and scalability.

## 🚀 Key Features

- **Visual Workflow Editor:** Intuitive drag-and-drop interface powered by React Flow (XYFlow).
- **AI-First Integrations:** Native support for OpenAI, Anthropic, and Google Gemini.
- **Dynamic Triggers:** Start workflows via Manual triggers, HTTP requests, Stripe events, or Google Form submissions.
- **Action Nodes:** Send automated messages to Discord and Slack.
- **Execution Tracking:** Real-time monitoring and detailed history of all workflow runs.
- **Secure Credential Management:** Encrypted storage for API keys and sensitive tokens.
- **Robust Background Processing:** Reliable workflow orchestration handled by Inngest.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Turbopack)
- **Frontend UI:** [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn](https://ui.shadcn.com/), [Lucide Icons](https://lucide.dev/)
- **Workflow Engine:** [React Flow](https://reactflow.dev/) (@xyflow/react)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/) & [Prisma](https://www.prisma.io/)
- **API:** [tRPC](https://trpc.io/) & [React Query](https://tanstack.com/query/latest)
- **Workflows/Queues:** [Inngest](https://www.inngest.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Billing:** [Polar](https://polar.sh/)
- **AI SDK:** [Vercel AI SDK](https://sdk.vercel.ai/docs)
- **Monitoring:** [Sentry](https://sentry.io/)
- **Code Quality:** [Biome](https://biomejs.dev/)

## 📋 Prerequisites

- **Node.js** (v20 or later)
- **PostgreSQL** (local instance or managed service)
- **Inngest Dev Server** (for local development)
- **Ngrok** (optional, for testing webhooks locally)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sofiane-Bahmed/node-base.git
   cd node-base
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/nodebase"

   # Encryption (for credentials)
   ENCRYPTION_KEY="your-random-encryption-key"

   # Auth (Better Auth)
   BETTER_AUTH_SECRET = "your-better-auth-secret"
   BETTER_AUTH_URL = "your-better-auth-url"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # generative AI
   GOOGLE_GENERATIVE_AI_API_KEY= "your-google-ai-api-key"

   OPENAI_API_KEY= "your-openai-ai-api-key"

   ANTHROPIC_API_KEY ="your-anthropic-ai-api-key"

   # Sentry
   SENTRY_AUTH_TOKEN="your-sentry-auth-token"

   # Apps & Webhooks
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   POLAR_ACCESS_TOKEN="your-polar-token"
   POLAR_SUCCESS_URL="http://localhost:3000/success"
   NGROK_URL="your-ngrok-url"
   ```

4. **Initialize the Database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the Development Servers:**
   In separate terminals:
   ```bash
   # Next.js App
   npm run dev

   # Inngest Dev Server
   npx inngest-cli@latest dev
   ```

## 📖 Usage

### Creating a Workflow
1. Navigate to the dashboard.
2. Click **"New Workflow"**.
3. Use the **Node Selector** to add a Trigger node (e.g., Manual Trigger).
4. Connect the Trigger to an AI node (e.g., Gemini).
5. Configure the node data (prompts, parameters) in the sidebar.
6. Connect the output to an Action node (e.g., Discord).
7. Save and Publish the workflow.

### Managing Credentials
Go to the **Credentials** section to securely add your API keys for OpenAI, Anthropic, or Gemini before using them in workflow nodes.

## 🧪 Testing

- **Linting:** `npm run lint` (uses Biome)
- **Formatting:** `npm run format`

## 🚀 Deployment

The project is optimized for deployment on **Vercel**. Ensure you configure all environment variables in your Vercel project settings.

1. Push your code to GitHub/GitLab.
2. Connect the repository to Vercel.
3. Add the `DATABASE_URL` (e.g., from Neon or Supabase).
4. Set up the Inngest integration for production workflow handling.

