import { Router } from "express";
import { lectureHomeworkController } from "../controllers/lecture-homework.controller";
import { authenticate, isAdmin, isTeacher } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, isAdmin, lectureHomeworkController.getAll);
router.get("/lecture/:lectureId", authenticate, lectureHomeworkController.getByLectureId);
router.get("/:id", authenticate, lectureHomeworkController.getById);
router.post("/", authenticate, isTeacher, lectureHomeworkController.create);
router.put("/:id", authenticate, isTeacher, lectureHomeworkController.update);
router.delete("/:id", authenticate, isTeacher, lectureHomeworkController.delete);

export default router;