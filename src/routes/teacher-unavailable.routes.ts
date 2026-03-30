import { Router } from "express";
import { teacherUnavailableController } from "../controllers/teacher-unavailable.controller";

const router = Router();

router.get("/", teacherUnavailableController.getAll);
router.get("/teacher/:teacherId", teacherUnavailableController.getByTeacherId);
router.get("/:id", teacherUnavailableController.getById);
router.post("/", teacherUnavailableController.create);
router.put("/:id", teacherUnavailableController.update);
router.delete("/:id", teacherUnavailableController.delete);

export default router;