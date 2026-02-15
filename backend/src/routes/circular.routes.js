import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { uploadCircular } from "../middlewares/upload.middleware.js";
import {
  createCircular,
  listCirculars,
  getCircular,
  approveCircular,
  sendBackCircular,
} from "../controllers/circular.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listCirculars);
router.get("/:id", getCircular);
router.post(
  "/",
  roleMiddleware("ADMIN"),
  (req, res, next) => {
    uploadCircular.single("file")(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message || "File upload failed" });
      next();
    });
  },
  createCircular
);
router.post("/:id/approve", roleMiddleware("PRINCIPAL"), approveCircular);
router.post("/:id/send-back", roleMiddleware("PRINCIPAL"), sendBackCircular);

export default router;
