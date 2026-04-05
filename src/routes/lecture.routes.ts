import { Router } from "express";
import { lectureController } from "../controllers/lecture.controller";
import { authenticate, isTeacher } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", lectureController.getAll);
router.get("/:id", lectureController.getById);

// Teacher demo sessions only
router.get("/teacher/demos", authenticate, isTeacher, lectureController.getTeacherDemoSessions);

router.post("/", lectureController.create);
router.put("/:id", lectureController.update);
router.delete("/:id", lectureController.delete);

export default router;