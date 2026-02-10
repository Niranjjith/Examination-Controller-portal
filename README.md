## Examination Center Portal

Full-stack web application for the **Controller of Examinations** to manage
examination services and provide a modern student-facing portal.

- **Frontend**: React + Vite (student UI, admin UI)
- **Backend**: Node.js + Express + MongoDB (REST API, auth)

---

### Features

- Public landing page with:
  - Hero section for the Controller of Examinations
  - Student Quick Access (Exam Timetable, Hall Ticket, Results, Revaluation)
  - Services, commitment sections, and footer
- About page describing the role of the CoE, reforms timeline, vision & mission.
- Student Services page with a structured list of key examination services and instructions.
- Authenticated areas:
  - **Admin dashboard** (role: `ADMIN`) – controls exam-related content and admin account settings.
  - **Center dashboard** (role: `CENTER`) – for examination centers (implementation in `center/Dashboard.jsx`).
- JWT-based authentication with role-based routing.

---

### Project structure

```text
.
├── backend/           # Express + MongoDB API
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── frontend/          # React + Vite SPA
    ├── src/
    │   ├── api/
    │   ├── auth/
    │   ├── components/
    │   ├── context/
    │   └── pages/
    └── package.json
```

---

### Backend setup

1. Go to the backend folder:

```bash
cd backend
npm install
```

2. Create a `.env` file:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/exam-portal
JWT_SECRET=super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Optional overrides
DEFAULT_ADMIN_EMAIL=examcontroller@gmail.com
DEFAULT_ADMIN_PASSWORD=123456
```

3. Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000/api`.

---

### Frontend setup

1. Go to the frontend folder:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The SPA will be available at the URL printed by Vite (typically `http://localhost:5173`).
The frontend is configured to call the backend at `http://localhost:5000/api` via `src/api/axios.js`.

---

### Authentication flow

- **Login endpoint**: `POST /api/auth/login`
  - Frontend uses `api.post("/auth/login", { email, password })`.
  - Backend returns `{ token }` (JWT).
  - The token payload includes `id` and `role`.
  - The token is stored in `localStorage` and attached to future API calls via an `Authorization: Bearer` header.

- **Role-based routing** after login:
  - `ADMIN` → `/admin`
  - `CENTER` → `/center`
  - Others → `/`

See:

- Backend: `backend/src/controllers/auth.controller.js`
- Frontend: `frontend/src/pages/auth/Login.jsx`, `frontend/src/auth/ProtectedRoute.jsx`, `frontend/src/auth/RoleGuard.jsx`.

---

### Default admin account

On backend startup, a default admin account is created if it does not already exist:

- **Email**: `examcontroller@gmail.com`
- **Password**: `123456`
- **Role**: `ADMIN`

You can change these defaults via `.env` (see `DEFAULT_ADMIN_EMAIL` and `DEFAULT_ADMIN_PASSWORD`).

Use this account to:

- Log in at `/login`
- Access the admin dashboard at `/admin`
- Update admin username/password via the **Account Settings** section in the dashboard.

---

### Admin dashboard

The admin dashboard (`/admin`) currently provides:

- Summary cards for:
  - Examination Timetable
  - Hall Ticket
  - Results
  - Revaluation
- Forms to configure display titles for:
  - Examination Timetable
  - Examination Results
  - Revaluation Status
- Account Settings section to update the admin email and password (ready to be wired to backend APIs).

> Note: The content-management forms (`Save timetable`, `Save results`, etc.) are wired to local state and console logging.
> To fully persist these settings, add corresponding endpoints on the backend and call them from the form submit handlers.

---

### Further improvements (ideas)

- Persist home/Student Services configuration to MongoDB and expose it via a `/api/settings` endpoint.
- Add upload endpoints for:
  - Exam timetable PDFs
  - Result CSV/PDF files
  - Revaluation status exports
- Implement center-specific dashboards and permissions.
- Add more validation and error handling for authentication and admin actions.

