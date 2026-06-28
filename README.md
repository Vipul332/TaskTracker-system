# Ledger — MERN Task Tracker

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). Built as a professional internship-style project demonstrating clean architecture, RESTful API design, reusable component patterns, and production-ready deployment configuration.

**Live demo:** _add your deployed Vercel URL here after deployment_
**API:** _add your deployed Render URL here after deployment_

---

## Features

- **Full CRUD** — create, read, update, and delete tasks with instant UI updates (no page reloads)
- **Filtering** — filter tasks by status (pending, in-progress, completed)
- **Search** — live search by task title
- **Sorting** — sort by newest, oldest, priority, or alphabetically
- **Form validation** — client- and server-side validation with inline error messages
- **Toast notifications** — feedback on every create, update, and delete action
- **Confirmation dialogs** — confirm before destructive actions (delete)
- **Loading states** — skeleton loaders and spinners while data is in flight
- **Dark mode** — persisted theme toggle
- **Responsive design** — works on desktop, tablet, and mobile
- **404 page** — graceful handling of unknown routes
- **Centralized error handling** — consistent, structured API error responses

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, react-hot-toast |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

---

## Folder Structure

```
task-tracker/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── taskController.js     # Business logic for each route
│   ├── middleware/
│   │   ├── errorMiddleware.js    # Centralized error handling
│   │   └── validateTask.js       # Request validation
│   ├── models/
│   │   └── Task.js               # Mongoose schema
│   ├── routes/
│   │   └── taskRoutes.js         # REST endpoint definitions
│   ├── utils/
│   │   ├── ApiError.js
│   │   └── sendResponse.js
│   ├── .env.example
│   └── server.js                 # App entry point
│
└── frontend/
    ├── src/
    │   ├── components/           # Reusable UI building blocks
    │   ├── pages/                # Route-level views
    │   ├── hooks/                # Custom hooks (useTasks, useTheme)
    │   ├── services/             # Axios API layer
    │   ├── styles/                # Design tokens
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── vercel.json
```

---

## Installation

### Prerequisites
- Node.js 18+
- A MongoDB Atlas account (free tier works) or local MongoDB instance

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-tracker
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

The API will run on `http://localhost:5000`.

### 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs on a different URL
npm run dev
```

The app will run on `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/task-tracker` |
| `CLIENT_URL` | Frontend URL, used for CORS | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

---

## API Endpoints

Base URL: `/api/tasks`

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `POST` | `/api/tasks` | Create a new task | `{ title, description, status?, priority?, dueDate? }` |
| `GET` | `/api/tasks` | Get all tasks (supports query params) | — |
| `GET` | `/api/tasks/:id` | Get a single task by ID | — |
| `PUT` | `/api/tasks/:id` | Update a task by ID | Any subset of task fields |
| `DELETE` | `/api/tasks/:id` | Delete a task by ID | — |

**Query parameters for `GET /api/tasks`:**
- `status` — `pending` \| `in-progress` \| `completed`
- `search` — case-insensitive partial match on title
- `sortBy` — `createdAt` \| `priority` \| `title`
- `order` — `asc` \| `desc`
- `page`, `limit` — pagination (optional)

**Response shape:**

```json
{
  "success": true,
  "message": "Task created successfully",
  "data": { "_id": "...", "title": "...", "...": "..." }
}
```

**Error response shape:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Title is required", "Description must be at least 5 characters long"]
}
```

---

## Deployment

### Backend → Render
1. Push your code to GitHub.
2. Create a new **Web Service** on [Render](https://render.com), connecting your repo's `backend/` directory.
3. Set the build command to `npm install` and the start command to `npm start`.
4. Add environment variables (`MONGODB_URI`, `CLIENT_URL`, `PORT`) in the Render dashboard.
5. Deploy. Render will give you a URL like `https://your-app.onrender.com`.

### Frontend → Vercel
1. Import your repo into [Vercel](https://vercel.com), setting the root directory to `frontend/`.
2. Set the environment variable `VITE_API_URL` to your deployed Render API URL (e.g. `https://your-app.onrender.com/api`).
3. Deploy. Vercel will give you a URL like `https://your-app.vercel.app`.
4. Update `CLIENT_URL` in your Render backend environment variables to match your Vercel URL, then redeploy the backend so CORS allows requests from production.

### Database → MongoDB Atlas
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow network access (or restrict to Render's IPs for production).
3. Copy the connection string into `MONGODB_URI`.

---

## Screenshots

> _Add screenshots here once deployed — e.g. task list view, dark mode, mobile view, create task modal._

---

## Future Improvements

- User authentication (JWT) so each user has their own private task list
- Drag-and-drop task reordering
- Subtasks / checklists within a task
- Recurring tasks
- Email or push reminders for due dates
- Automated test suite (Jest + React Testing Library, Supertest for the API)
- Optimistic UI updates with rollback on failure

---

## Author

Built as a MERN stack internship assessment project.
