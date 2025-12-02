import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller";
import { authenticate, userAllowed } from "../middleware/auth.middleware";

const router = Router();

// User must be logged in for payment
// router.use(authenticate);
// router.use(userAllowed);

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

export default router;
