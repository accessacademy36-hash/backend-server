import { Router } from "express";
import { subscriptionController } from "../controllers/subscription.controller";
import { authenticate, isAdmin, isStudent } from "../middlewares/auth.middleware";

const router = Router();

// Student: get their own active subscriptions with full details
router.get("/my-active", authenticate, isStudent, subscriptionController.getMyActive);

// Admin: get active subscriptions for any student
router.get("/student/:studentId", authenticate, isAdmin, subscriptionController.getActiveByStudentId);

// Standard CRUD
router.get("/", authenticate, isAdmin, subscriptionController.getAll);
router.get("/:id", authenticate, subscriptionController.getById);
router.post("/", authenticate, isAdmin, subscriptionController.create);
router.put("/:id", authenticate, isAdmin, subscriptionController.update);
router.delete("/:id", authenticate, isAdmin, subscriptionController.delete);

export default router;