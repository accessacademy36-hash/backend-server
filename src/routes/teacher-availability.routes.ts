import { Router } from "express";
import { teacherAvailabilityController } from "../controllers/teacher-availability.controller";

const router = Router();

router.get("/", teacherAvailabilityController.getAll);
router.get("/teacher/:teacherId", teacherAvailabilityController.getByTeacherId);
router.get("/:id", teacherAvailabilityController.getById);
router.post("/", teacherAvailabilityController.create);
router.put("/:id", teacherAvailabilityController.update);
router.delete("/:id", teacherAvailabilityController.delete);

export default router;