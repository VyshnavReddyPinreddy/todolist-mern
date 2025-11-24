# Copilot / AI Agent Instructions — todolist-mern

This file gives concise, actionable guidance so an AI coding agent can be productive in this repository immediately.

Overview

- **Stack**: Full‑stack MERN-style app (Express + Mongoose backend, React + Vite frontend).
- **Dev servers**: Backend is a Node/Express app in `backend/` (scripts: `npm run dev` uses `nodemon`). Frontend is a Vite React app in `frontend/` (scripts: `npm run dev`).

Quick start (developer commands)

- Backend (from `backend/`):
  - `npm install` then `npm run dev` (uses `nodemon server.js`).
  - Required env vars: `MONGO_URI`, `SESSION_SECRET`, `SENDER_EMAIL`, `SMTP_USER`, `SMTP_PASSWORD`.
- Frontend (from `frontend/`):
  - `npm install` then `npm run dev` (Vite on `localhost:5173` by default).
  - Required env var: `VITE_BACKEND_URL` (should include the `/api` prefix or point to the backend root; e.g. `http://localhost:5000/api`).

Big picture / architecture

- The backend exposes REST routes under `/api/*` and uses session-based authentication (`express-session` + `connect-mongo`). Key route prefixes:
  - `/api/auth` → `backend/src/routes/authRoutes.js` (register/login/logout/verify/reset flows)
  - `/api/user` → `backend/src/routes/userRoutes.js` (profile/username endpoint)
  - `/api/task` → `backend/src/routes/taskRoutes.js` (CRUD for tasks)
- Controllers live in `backend/src/controllers/` and follow a pattern: validate input → check `req.session.userId` → perform DB ops with Mongoose models from `backend/src/models/` → return JSON with `msg` plus contextual keys (e.g. `verify`, `loggedIn`, `tasks`).
- Sessions: `backend/src/middleware/session.js` configures session store in MongoDB (`connect-mongo`), cookie settings, and reads `SESSION_SECRET` + `MONGO_URI` from env.
- Email: `backend/src/config/nodeMailer.js` sets up a transporter (Brevo SMTP). Templates in `backend/src/config/emailTemplates.js` are simple HTML strings with `{{email}}`, `{{otp}}`, `{{expiresIn}}` placeholders.

API & data flow notes (important patterns)

- Authentication is session-based (not JWT). After successful login/register the server sets `req.session.userId`. Many endpoints require `req.session.userId`.
- OTP flows: registration and password reset use short-lived OTPs stored on the user document (`verifyEmailOtp`, `resetPasswordOtp`) and expire timestamps. There is a resend cooldown implemented in `authController.resendOtp` (resend allowed only after ~1s cooldown logic in controller).
- Task listing (`viewAllTasks`) supports query params: `sort`, `order`, `completed`, `priority` (comma-separated allowed), `search` (multi-word AND search on title/description), and `from`/`to` for deadline ranges. See `backend/src/controllers/taskController.js` for exact parsing and validation.
- Responses commonly include `{ msg: string, ... }`. Pay attention to special flags like `verify`, `sessionExpired`, and `loggedIn` used by the frontend.

Frontend integration patterns

- Axios configuration: `frontend/src/services/axiosInstance.js` sets `baseURL` to `import.meta.env.VITE_BACKEND_URL` and `withCredentials: true`. For local dev set `VITE_BACKEND_URL=http://localhost:5000/api` (or `http://localhost:5000` and the frontend calls use `/api/...`).
- API wrappers: `frontend/src/services/api.js` contains thin helpers that call endpoints using paths like `/auth/login`, `/task/`. These expect the base URL and cookie credentials to be handled by the axios instance.
- CORS: The backend explicitly allows origin `http://localhost:5173` in `server.js`. If you change the frontend port or deploy, update CORS or make it dynamic.

Key files to inspect for behavior and examples

- `backend/server.js` — app setup, CORS origin, route mounting.
- `backend/src/middleware/session.js` — session store & cookie options.
- `backend/src/controllers/authController.js` — register/login/verify/resend/reset flows and session usage.
- `backend/src/controllers/taskController.js` — task querying, filters, sorting, and validation examples.
- `backend/src/config/nodeMailer.js` & `backend/src/config/emailTemplates.js` — SMTP config and HTML templates.
- `frontend/src/services/axiosInstance.js` & `frontend/src/services/api.js` — how frontend talks to backend and expected paths.

Project-specific conventions

- Session keys: controllers store session identifiers explicitly as `req.session.userId` (login/register) and `req.session.resetUserId` (reset flow). Use those keys when writing or modifying endpoints.
- Error handling: controllers prefer JSON payloads and status codes (400/401/409/429/500). When integrating, examine returned JSON keys (`msg`, `verify`, `sessionExpired`) — frontend logic depends on them.
- Route prefixes: server mounts routers under `/api/<resource>`. Frontend API helpers omit the `/api` prefix (rely on `VITE_BACKEND_URL`) — be careful when changing baseURL.

Useful examples

- Create task (frontend): `createTask({ title, description, deadline, priority })` → backend POST `/api/task/` → returns `{ msg: "Task created" }`.
- View tasks with filters: `GET /api/task?completed=true&priority=high,medium&search=buy+milk&from=2025-01-01&to=2025-12-31&sort=deadline,priority&order=asc,desc` — see `taskController.viewAllTasks` for exact parsing.
- Check auth: `GET /api/auth/check-auth` returns `401` and `{ loggedIn:false }` when not authenticated; returns `200` and `{ loggedIn:true }` when session exists.

Known issues / TODOs for AI agents

- `frontend/src/services/api.js` — `deleteTask` helper is incomplete (returns `axiosInstance.delete()` with no path). Fix pattern: `export function deleteTask(id){ return axiosInstance.delete(`/task/${id}`); }`.
- Verify `VITE_BACKEND_URL` in `.env` during testing to ensure it points to the same root that the backend expects (including `/api` if frontend helpers assume it).

When changing behavior

- If you modify session keys, update all controllers and frontend checks that rely on `req.session.userId` or `req.session.resetUserId`.
- If you change CORS origins or ports, update `server.js` and the developer docs here.

If uncertain, where to look first

- Start at `backend/server.js`, then read the controller corresponding to the endpoint you need to change (`backend/src/controllers/*.js`), then the matching router in `backend/src/routes/`. For front-end changes, inspect `frontend/src/services/axiosInstance.js` and `frontend/src/services/api.js` first.

Questions for the maintainer

- Preferred `VITE_BACKEND_URL` value for examples (root vs `/api` prefix).
- Any CI, deployment, or environment-specific steps (none discovered in repo files).

If you'd like, I can:

- Open a PR fixing the `deleteTask` helper in `frontend/src/services/api.js`.
- Add example `.env.local` templates for `backend/` and `frontend/`.

---

Edit and iterate if you'd like more detail in any section.
