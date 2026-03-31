import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, isAdmin, userController.getAll);
router.get("/teachers", authenticate, userController.getAllTeachers);
router.get("/:id", authenticate, userController.getById);
router.post("/", authenticate, isAdmin, userController.create);
router.put("/:id", authenticate, userController.update);
router.delete("/:id", authenticate, isAdmin, userController.delete);

export default router;