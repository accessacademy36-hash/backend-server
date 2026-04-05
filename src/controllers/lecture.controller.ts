import { Request, Response } from "express";
import { lectureService } from "../services/lecture.service";

export const lectureController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await lectureService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch lectures" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const lecture = await lectureService.getById(Number(req.params.id));
      if (!lecture) return res.status(404).json({ error: "Lecture not found" });
      res.json(lecture);
    } catch {
      res.status(500).json({ error: "Failed to fetch lecture" });
    }
  },

  // GET /api/calendar/teacher/demos
    getTeacherDemoSessions: async (req: Request, res: Response) => {
      try {
        const teacherId = req.user!.userId;
        const demos = await lectureService.getTeacherDemoSessions(teacherId);
        res.json(demos);
      } catch {
        res.status(500).json({ error: "Failed to fetch demo sessions" });
      }
    },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await lectureService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create lecture" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await lectureService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update lecture" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await lectureService.delete(Number(req.params.id));
      res.json({ message: "Lecture deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete lecture" });
    }
  },
};