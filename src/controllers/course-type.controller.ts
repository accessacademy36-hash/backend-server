import { Request, Response } from "express";
import { courseTypeService } from "../services/course-type.service";

export const courseTypeController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await courseTypeService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch course types" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const courseType = await courseTypeService.getById(Number(req.params.id));
      if (!courseType) return res.status(404).json({ error: "Course type not found" });
      res.json(courseType);
    } catch {
      res.status(500).json({ error: "Failed to fetch course type" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await courseTypeService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create course type" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await courseTypeService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update course type" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await courseTypeService.delete(Number(req.params.id));
      res.json({ message: "Course type deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete course type" });
    }
  },
};