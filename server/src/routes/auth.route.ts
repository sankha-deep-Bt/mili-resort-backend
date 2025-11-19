import { Router } from "express";
import {
  login,
  logout,
  refreshHandler,
  register,
} from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";
import { loginSchema, registerSchema } from "../validation/auth.schema";
import { validate } from "../middleware/validate.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

router.get("/refresh", authenticate, refreshHandler);
export default router;
