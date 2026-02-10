## Backend - Examination Center API

This directory contains the Node.js/Express backend for the **Controller of Examinations** portal.
It exposes REST APIs for authentication and examination management, and connects to MongoDB.

### Tech stack

- **Runtime**: Node.js
- **Framework**: Express
- **Database**: MongoDB (via Mongoose)
- **Auth**: JWT (JSON Web Tokens) with role-based access
- **Security**: bcrypt password hashing, basic rate limiting (middleware)

### Project structure

- `src/server.js` – bootstrap file, connects to MongoDB, seeds default admin, starts HTTP server.
- `src/app.js` – Express app setup (CORS, JSON, logging, route mounting).
- `src/config/db.js` – MongoDB connection helper.
- `src/config/bootstrap.js` – ensures the default admin account exists.
- `src/models/User.model.js` – User schema (name, email, password, role, centerId).
- `src/controllers/auth.controller.js` – login/register logic.
- `src/routes/auth.routes.js` – `/api/auth` routes (login, register).
- `src/utils/password.js` – bcrypt hashing and comparison helpers.
- `src/utils/jwt.js` – JWT token generation.
- Other controllers/services/routes – exams, attendance, centers, reports, etc.

### Environment variables

Create a `.env` file in `backend` with at least:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/exam-portal
JWT_SECRET=super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Optional: override default admin credentials
DEFAULT_ADMIN_EMAIL=examcontroller@gmail.com
DEFAULT_ADMIN_PASSWORD=123456
```

### Default admin login

On server startup we automatically ensure a default admin user exists:

- **Email**: `examcontroller@gmail.com`
- **Password**: `123456`
- **Role**: `ADMIN`

Implementation: `src/config/bootstrap.js` is called from `src/server.js` after the DB connection.

### Auth endpoints

- `POST /api/auth/register`
  - Body: `{ "name", "email", "password", "role" }`
  - Creates a new user (password is hashed automatically).

- `POST /api/auth/login`
  - Body: `{ "email", "password" }`
  - On success returns:

    ```json
    { "token": "<jwt-token>" }
    ```

  - The token payload contains `id` and `role`, which the frontend decodes to route
    admins to `/admin`, centers to `/center`, and others to `/`.

### Running the backend

From the `backend` directory:

```bash
npm install
npm run dev      # start with nodemon on PORT in .env
```

The API will be available at `http://localhost:5000/api` (used by the frontend axios instance).

