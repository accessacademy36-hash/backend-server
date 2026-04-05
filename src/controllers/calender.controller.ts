import { Request, Response } from "express";
import {
  getStudentCalendar,
  getTeacherCalendar,
  getTeacherDemoSessions,
  requestDelay,
} from "../services/calender.service";

export const calendarController = {
  // GET /api/calendar/student
  getStudentCalendar: async (req: Request, res: Response) => {
    try {
      const studentId = req.user!.userId;
      const calendar = await getStudentCalendar(studentId);
      res.json(calendar);
    } catch {
      res.status(500).json({ error: "Failed to fetch student calendar" });
    }
  },

  // GET /api/calendar/teacher
  getTeacherCalendar: async (req: Request, res: Response) => {
    try {
      const teacherId = req.user!.userId;
      const calendar = await getTeacherCalendar(teacherId);
      res.json(calendar);
    } catch {
      res.status(500).json({ error: "Failed to fetch teacher calendar" });
    }
  },

  // GET /api/calendar/teacher/demos
  getTeacherDemoSessions: async (req: Request, res: Response) => {
    try {
      const teacherId = req.user!.userId;
      const demos = await getTeacherDemoSessions(teacherId);
      res.json(demos);
    } catch {
      res.status(500).json({ error: "Failed to fetch demo sessions" });
    }
  },

  // POST /api/calendar/delay
  requestDelay: async (req: Request, res: Response) => {
    try {
      const { lectureId, subscriptionId, newStartTime, newEndTime } = req.body;

      if (!lectureId || !subscriptionId || !newStartTime || !newEndTime) {
        return res.status(400).json({
          error: "lectureId, subscriptionId, newStartTime and newEndTime are required",
        });
      }

      const requestedBy = req.user!.role === "teacher" ? "teacher" : "student";

      const delay = await requestDelay({
        lectureId: Number(lectureId),
        subscriptionId: Number(subscriptionId),
        requestedByUserId: req.user!.userId,
        requestedBy,
        newStartTime: new Date(newStartTime),
        newEndTime: new Date(newEndTime),
      });

      res.status(201).json({ message: "Session delayed successfully", delay });
    } catch (error: any) {
      const clientErrors = [
        "Subscription not found",
        "Lecture not found",
        "Cannot delay a past or ongoing lecture",
        "Lecture is not in scheduled status",
        "Maximum delay limit of 2 reached",
      ];

      if (clientErrors.includes(error.message)) {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Failed to request delay" });
    }
  },
};