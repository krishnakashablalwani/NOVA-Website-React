# Contributing to NOVA

First off, thank you for considering contributing to the NOVA platform! It's people like you that make NOVA such a great community for developers and students. 

## 1. Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check if there's already an issue for it. If not, open a new issue describing the problem or the new feature.

## 2. Setting up your local environment

1. **Fork** the repository on GitHub.
2. **Clone** the project to your own machine:
   ```bash
   git clone https://github.com/your-username/NOVA-Website-React.git
   cd NOVA-Website-React/NOVA
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Environment Variables:**
   Copy the provided `.env.example` to a `.env` file and ask a maintainer or club lead for the development API keys (Clerk, Supabase, Gemini).

## 3. Making Changes

- Create a new branch for your feature or bugfix:
  ```bash
  git checkout -b feature/my-awesome-feature
  ```
- Make your changes in the codebase.
- **Frontend Guidelines:** We use React 19, Vite, and Tailwind CSS v4. Ensure your components are functional and use React Hooks. If you're building a new UI component, follow the existing dark, gamified theme using Tailwind variables (e.g., `bg-primary`, `text-secondary`).
- **Backend Guidelines:** The backend is built on Express 5. Place your new routes in `backend/src/routes/` and ensure they are properly hooked up in `backend/server.js`.
- **Database Changes:** If your feature requires new tables or schema updates, review `SCHEMA.md` first and communicate with the core maintainers. Do not bypass Row Level Security (RLS) policies unless strictly necessary (via the service role key on the backend).

## 4. Testing & Linting

Before pushing your code, please make sure it builds and passes our linting rules:

```bash
npm run lint
npm run build
```

Verify that both the frontend (`npm run dev`) and backend (`npm run server`) start without errors and communicate successfully.

## 5. Submitting a Pull Request

- Commit your changes with a clear and descriptive commit message.
  ```bash
  git commit -m "feat: added new profile achievements module"
  ```
- Push to your fork:
  ```bash
  git push origin feature/my-awesome-feature
  ```
- Open a Pull Request from your fork to the `main` branch of the upstream repository.
- Provide a clear description of the changes you made. Include screenshots or videos if you've made visual UI modifications.

## 6. Code of Conduct

By participating in this project, you agree to abide by the NOVA Club's code of conduct. We expect all contributors to interact respectfully and constructively.

Welcome to the team! 🚀
