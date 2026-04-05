import { Router } from "express";
import { lectureMaterialController } from "../controllers/lecture-material.controller";
import { authenticate, isAdmin, isTeacher } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, isAdmin, lectureMaterialController.getAll);
router.get("/lecture/:lectureId", authenticate, lectureMaterialController.getByLectureId);
router.get("/:id", authenticate, lectureMaterialController.getById);
router.post("/", authenticate, isTeacher, lectureMaterialController.create);
router.put("/:id", authenticate, isTeacher, lectureMaterialController.update);
router.delete("/:id", authenticate, isTeacher, lectureMaterialController.delete);

export default router;