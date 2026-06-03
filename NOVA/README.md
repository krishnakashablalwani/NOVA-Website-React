<div align="center">
  <h1>NOVA</h1>
  <p>The official platform for <strong>NOVA Club</strong> — hackathons, sprints, and community.</p>
</div>

---

## 🚀 Product Thinking & Core Features

### Global AI Chatbot Widget
The NOVA platform now features a globally accessible AI assistant that floats on the bottom-right of every view. 
**Why extract it to be globally floating?** By placing the chatbot at the root of the application shell instead of burying it inside a specific dashboard, we maximize student utility. Students can now access immediate help, ask about MVSR Engineering College context, or get club information whether they are reading the mission statement, browsing the Event Book, or interacting with the dashboard—all without losing their place or context.

### Gamified Dashboard Layout
The user dashboard abandons traditional, static layouts in favor of a highly gamified, "hacker-themed" dark aesthetic.
**Why this layout?** NOVA is a club centered around hackathons, sprints, and tech community engagement. The gamified layout with real-time stats, interactive cards, and a sleek dark mode natively aligns with our target demographic (CS students and developers). It increases engagement, creates a sense of progression, and strongly reinforces the club's technical identity.

---

## 🏗 Architecture Decisions

### Static RAG (Retrieval-Augmented Generation)
For the AI Assistant, we explicitly implemented a **Static RAG approach** rather than building and managing a heavy vector database.
**Why?** By fetching a pre-compiled `public/mvsr-knowledge.md` markdown file at runtime and injecting it directly into the Gemini API's system instructions, we successfully feed secure, localized context into the LLM. This provides highly accurate, MVSR-specific answers with **zero database spin-up overhead**, minimal latency, and zero maintenance costs for vector embeddings.

### Core Stack
| Layer      | Technology                                                  |
|------------|-------------------------------------------------------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion|
| **Backend**  | Express 5 (Node.js), Clerk SDK, Supabase Admin, Notion API |
| **Database** | Supabase (PostgreSQL) with Row-Level Security              |
| **Auth**     | Clerk (email, Google, GitHub OAuth)                        |
| **AI**       | Google Gemini 2.5 Flash SDK (`@google/genai`)              |

---

## 🤖 Agentic AI Tools & Prompts

During the development of this project, we heavily utilized AI productivity tools and agents to generate boilerplate, solve complex CSS layout issues, and implement LLM streaming features. 

**Highlight Prompts Used:**
- *"Extract the floating chatbot from Dashboard.tsx into a GlobalChatbot.tsx component and mount it in App.tsx so it persists across routes."* (Used to architect the global widget component without prop-drilling).
- *"Implement real-time streaming using `ai.models.generateContentStream` for the Gemini SDK to create an authentic typewriter effect, and limit responses strictly to 200 words."* (Used to eliminate perceived latency and enforce strict UI token constraints).
- *"Swap all `#00C896` and `#1a1a1a` hex codes in the EventBook CSS to match our dark blue Tailwind variables `var(--bg-primary)` using a Python regex script."* (Used for rapid theme normalization across legacy components).
- *"Add a subtle hover animation to the team cards, make the images square, and replace the overlapping text with a glassmorphism panel beneath the photo."* (Used to rapidly iterate and fix complex UI overlaps).

---

## 🛠 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm**
- A **Supabase** project ([create one](https://supabase.com))
- A **Clerk** application ([create one](https://clerk.com))
- A **Google Gemini API Key** ([get one](https://aistudio.google.com/))

### 1. Clone and install

```bash
git clone <repo-url>
cd NOVA
npm install
```

### 2. Set up environment variables

Copy these into a `.env` file at the project root:

```env
# === Supabase (from Supabase Dashboard > Settings > API) ===
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# === Clerk (from Clerk Dashboard > API Keys) ===
VITE_CLERK_PUBLISHABLE_KEY=pk_live_**********
CLERK_SECRET_KEY=sk_live_**********

# === AI Configuration ===
VITE_GEMINI_API_KEY=your-gemini-key
```

> ⚠️ The backend also requires additional env vars (Notion API key, Cloudinary credentials, JWT secret, etc.). Check `backend/server.js` and `backend/src/db/supabase.js` for the full list of expected variables.

### 3. Run the database migration

Open the **Supabase SQL Editor** and run `supabase/migrations/001_schema.sql` to create all tables and RLS policies.

### 4. Start the frontend (dev server)

```bash
npm run dev
# Opens at http://localhost:5173
```

### 5. Start the backend (in a separate terminal)

```bash
npm run server
# Runs at http://localhost:3001
```

---

## 📁 Project Structure

```text
NOVA/
├── src/                  # Frontend (React + Vite)
│   ├── pages/            # Route pages (Home, Dashboard, Events, etc.)
│   ├── components/       # Reusable UI components (GlobalChatbot, EventBook)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Supabase client, utilities
│   └── admin/            # Admin panel
├── backend/              # Backend (Express)
│   └── src/
│       ├── routes/       # API routes (auth, etc.)
│       ├── db/           # Supabase admin client
│       └── middleware/   # Auth middleware
├── supabase/
│   └── migrations/       # Database migration files
└── public/               # Static data files and knowledge bases (mvsr-knowledge.md)
```

---

<div align="center">
  <sub>Built by the NOVA team · <a href="https://thenova.club">thenova.club</a></sub>
</div>

# Submission of Krishna Kashab Lalwani for NOVA-2026 Tech Assignment