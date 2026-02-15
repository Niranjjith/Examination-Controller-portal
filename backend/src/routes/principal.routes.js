import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import {
  listPrincipals,
  addPrincipal,
  updatePrincipal,
  deletePrincipal,
} from "../controllers/principal.controller.js";

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware("ADMIN"));

router.get("/", listPrincipals);
router.post("/", addPrincipal);
router.put("/:id", updatePrincipal);
router.delete("/:id", deletePrincipal);

export default router;
