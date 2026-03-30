import { Router } from "express";
import { lectureAttendanceController } from "../controllers/lecture-attendance.controller";

const router = Router();

router.get("/", lectureAttendanceController.getAll);
router.get("/lecture/:lectureId", lectureAttendanceController.getByLectureId);
router.get("/student/:studentId", lectureAttendanceController.getByStudentId);
router.get("/:id", lectureAttendanceController.getById);
router.post("/", lectureAttendanceController.create);
router.put("/:id", lectureAttendanceController.update);
router.delete("/:id", lectureAttendanceController.delete);

export default router;