# TaskFlow

A small full-stack task manager used to bootstrap and demonstrate the
development environment for this repository.

- **Frontend:** Vite + React + TypeScript (`src/`)
- **Backend:** Express REST API (`server/`)
- **Dev flow:** the Vite dev server proxies `/api/*` to the Express backend, so
  the whole app works end-to-end from a single origin.

## Requirements

- Node.js >= 20 (repo is developed on Node 22)
- npm (bundled with Node)

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start API (:3001) and web (:5173) together
```

Then open http://localhost:5173.

## Scripts

| Script              | Description                                        |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Run the API and web dev servers concurrently       |
| `npm run dev:server`| Run only the Express API (port 3001)               |
| `npm run dev:web`   | Run only the Vite dev server (port 5173)           |
| `npm run build`     | Type-check and build the production frontend bundle |
| `npm run start`     | Run the API server without watch mode              |
| `npm run typecheck` | Type-check all TypeScript projects                 |
| `npm run lint`      | Run ESLint                                          |

## API

The backend exposes a small REST API (in-memory store):

| Method   | Path              | Description          |
| -------- | ----------------- | -------------------- |
| `GET`    | `/api/health`     | Health check         |
| `GET`    | `/api/tasks`      | List tasks           |
| `POST`   | `/api/tasks`      | Create a task        |
| `PATCH`  | `/api/tasks/:id`  | Update / toggle task |
| `DELETE` | `/api/tasks/:id`  | Delete a task        |
