import express from "express";
import { createExam, getExams, lockExam } from "../controllers/exam.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { ROLES } from "../config/constants.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/", roleMiddleware(ROLES.ADMIN), createExam);
router.get("/", getExams);
router.patch("/:id/lock", roleMiddleware(ROLES.ADMIN), lockExam);

export default router;
