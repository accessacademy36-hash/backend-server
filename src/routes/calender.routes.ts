import { Router } from "express";
import { calendarController } from "../controllers/calender.controller";
import { authenticate, isStudent, isTeacher, hasRole } from "../middlewares/auth.middleware";

const router = Router();

// Student calendar
router.get("/student", authenticate, isStudent, calendarController.getStudentCalendar);

// Teacher full calendar
router.get("/teacher", authenticate, isTeacher, calendarController.getTeacherCalendar);

// Teacher demo sessions only
router.get("/teacher/demos", authenticate, isTeacher, calendarController.getTeacherDemoSessions);

// Delay a session — student or teacher
router.post("/delay", authenticate, hasRole("student", "teacher"), calendarController.requestDelay);

export default router;