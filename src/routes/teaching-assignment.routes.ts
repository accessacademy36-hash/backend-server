import { Router } from "express";
import { teachingAssignmentController } from "../controllers/teaching-assignment.controller";

const router = Router();

router.get("/", teachingAssignmentController.getAll);
router.get("/:id", teachingAssignmentController.getById);
router.post("/", teachingAssignmentController.create);
router.put("/:id", teachingAssignmentController.update);
router.delete("/:id", teachingAssignmentController.delete);

export default router;