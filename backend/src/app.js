import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import examRoutes from "./routes/exam.routes.js";
import circularRoutes from "./routes/circular.routes.js";
import principalRoutes from "./routes/principal.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ---------- HEALTH / ROOT ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    service: "Examination Controller API",
    status: "running",
    uptime: process.uptime()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* ---------- API ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/circulars", circularRoutes);
app.use("/api/principals", principalRoutes);

export default app;
