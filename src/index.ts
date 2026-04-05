import { Express } from "express";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import teacherProfileRoutes from "./routes/teacher-profile.routes";
import studentProfileRoutes from "./routes/student-profile.routes";
import countryRoutes from "./routes/country.routes";
import curriculumRoutes from "./routes/curriculum.routes";
import gradeRoutes from "./routes/grade.routes";
import courseTypeRoutes from "./routes/course-type.routes";
import courseRoutes from "./routes/course.routes";
import teachingAssignmentRoutes from "./routes/teaching-assignment.routes";
import paymentRequestRoutes from "./routes/payment-request.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import teacherAvailabilityRoutes from "./routes/teacher-availability.routes";
import teacherUnavailableRoutes from "./routes/teacher-unavailable.routes";
import bookingRequestRoutes from "./routes/booking-request.routes";
import lectureRoutes from "./routes/lecture.routes";
import lectureAttendanceRoutes from "./routes/lecture-attendance.routes";
import lectureDelayRoutes from "./routes/lecture-delay.routes";
import lectureHomeworkRoutes from "./routes/lecture-homework.routes";
import lectureMaterialRoutes from "./routes/lecture-material.routes";
import calendarRoutes from "./routes/calender.routes";
import reviewRoutes from "./routes/review.routes";

export function registerRoutes(app: Express) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/teacher-profiles", teacherProfileRoutes);
  app.use("/api/student-profiles", studentProfileRoutes);
  app.use("/api/countries", countryRoutes);
  app.use("/api/curriculums", curriculumRoutes);
  app.use("/api/grades", gradeRoutes);
  app.use("/api/course-types", courseTypeRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/teaching-assignments", teachingAssignmentRoutes);
  app.use("/api/payment-requests", paymentRequestRoutes);
  app.use("/api/subscriptions", subscriptionRoutes);
  app.use("/api/teacher-availabilities", teacherAvailabilityRoutes);
  app.use("/api/teacher-unavailables", teacherUnavailableRoutes);
  app.use("/api/booking-requests", bookingRequestRoutes);
  app.use("/api/lectures", lectureRoutes);
  app.use("/api/lecture-attendances", lectureAttendanceRoutes);
  app.use("/api/lecture-delays", lectureDelayRoutes);
  app.use("/api/lecture-homeworks", lectureHomeworkRoutes);
  app.use("/api/lecture-materials", lectureMaterialRoutes);
  app.use("/api/calendar", calendarRoutes);
  app.use("/api/reviews", reviewRoutes);
}