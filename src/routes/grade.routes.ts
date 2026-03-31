import { Router } from "express";
import { gradeController } from "../controllers/grade.controller";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", gradeController.getAll);
router.get("/curriculum/:curriculumId", gradeController.getByCurriculumId);
router.get("/:id", gradeController.getById);
router.post("/", authenticate, isAdmin, gradeController.create);
router.put("/:id", authenticate, isAdmin, gradeController.update);
router.delete("/:id", authenticate, isAdmin, gradeController.delete);

export default router;