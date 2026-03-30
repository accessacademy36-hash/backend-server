import { Request, Response } from "express";
import { lectureAttendanceService } from "../services/lecture-attendance.service";

export const lectureAttendanceController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await lectureAttendanceService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch lecture attendances" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const attendance = await lectureAttendanceService.getById(Number(req.params.id));
      if (!attendance) return res.status(404).json({ error: "Attendance record not found" });
      res.json(attendance);
    } catch {
      res.status(500).json({ error: "Failed to fetch attendance record" });
    }
  },

  getByLectureId: async (req: Request, res: Response) => {
    try {
      res.json(await lectureAttendanceService.getByLectureId(Number(req.params.lectureId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch attendances for lecture" });
    }
  },

  getByStudentId: async (req: Request, res: Response) => {
    try {
      res.json(await lectureAttendanceService.getByStudentId(Number(req.params.studentId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch attendances for student" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await lectureAttendanceService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create attendance record" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await lectureAttendanceService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update attendance record" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await lectureAttendanceService.delete(Number(req.params.id));
      res.json({ message: "Attendance record deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete attendance record" });
    }
  },
};