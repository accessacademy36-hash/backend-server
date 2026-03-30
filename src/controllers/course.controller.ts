import { Request, Response } from "express";
import { courseService } from "../services/course.service";

export const courseController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await courseService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const course = await courseService.getById(Number(req.params.id));
      if (!course) return res.status(404).json({ error: "Course not found" });
      res.json(course);
    } catch {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await courseService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create course" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await courseService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update course" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await courseService.delete(Number(req.params.id));
      res.json({ message: "Course deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete course" });
    }
  },
};