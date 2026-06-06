# NOVA Backend API

This directory contains the Express-based Node.js backend for the NOVA platform. It serves as the primary integration layer connecting the React frontend, Clerk authentication, Supabase Admin interactions, and external services like the Notion API and Cloudinary.

## 🚀 Features

* **Authentication Syncing:** Webhook/API endpoints to sync Clerk users seamlessly into the Supabase PostgreSQL database.
* **Supabase Admin Operations:** Securely executes operations requiring the Supabase service role key (bypassing RLS), such as updating user points, broadcasting announcements, and generating credentials.
* **Notion Integration:** Acts as a bridge to push event registrations and hackathon submissions to Notion databases for organizational tracking.
* **CLI Utilities:** Includes scripts like `generate-credentials-cli.js` for administrative tasks and credential generation.

## 🛠 Tech Stack

* **Runtime:** Node.js (Express 5)
* **Authentication:** Clerk SDK
* **Database Client:** `@supabase/supabase-js` (using Service Role Key)
* **Environment Management:** `dotenv`
* **Additional Integrations:** CORS, Notion API Client, Cloudinary (for media uploads if applicable)

## 📦 Project Structure

```text
backend/
├── src/
│   ├── routes/       # API routes (e.g., auth.js, events.js, users.js)
│   ├── db/           # Supabase admin client initialization (supabase.js)
│   └── middleware/   # Express middleware (Clerk auth validation, error handling)
├── AnnouncementService.js   # Service for managing platform announcements
├── generate-credentials-cli.js # Admin CLI utility for generating credentials
├── server.js         # Main Express application entry point
└── package.json      # Backend dependencies and scripts
```

## 🏁 Getting Started

### Prerequisites

Ensure you have Node.js (>= 18) installed and all root-level `.env` variables configured. The backend relies heavily on the environment variables defined in the project root.

### Environment Variables

The backend requires the following variables in the root `.env` file:

```env
# Supabase Admin access
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk Secret Key for backend operations
CLERK_SECRET_KEY=sk_test_...

# Notion (if used for tracking)
NOTION_API_KEY=secret_...
NOTION_REGISTRATIONS_DB_ID=...
```

### Installation

Navigate to the root directory and install dependencies (the root `package.json` often manages fullstack workspaces, or navigate directly to `backend` if it has separate installation steps):

```bash
cd backend
npm install
```

### Running the Server

To start the backend development server:

```bash
# Run from the project root
npm run server

# Or run directly from the backend directory
node server.js
```

The server will typically start on `http://localhost:3001` (or whichever port is defined in `server.js` or `process.env.PORT`).

## 🔐 Security Considerations

* **Service Role Key:** The `SUPABASE_SERVICE_ROLE_KEY` has supreme privileges and bypasses all Row-Level Security (RLS) rules. **Never** expose this key to the frontend.
* **CORS:** Ensure the `cors` middleware is configured in `server.js` to only accept requests from your authorized frontend domains (e.g., `http://localhost:5173` or your production URL).
* **Route Protection:** Use Clerk middleware to protect sensitive API routes and verify user sessions before executing database operations.
