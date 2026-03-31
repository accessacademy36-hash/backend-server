import { Request, Response } from "express";
import { gradeService } from "../services/grade.service";

export const gradeController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await gradeService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch grades" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const grade = await gradeService.getById(Number(req.params.id));
      if (!grade) return res.status(404).json({ error: "Grade not found" });
      res.json(grade);
    } catch {
      res.status(500).json({ error: "Failed to fetch grade" });
    }
  },

  getByCurriculumId: async (req: Request, res: Response) => {
    try {
      res.json(await gradeService.getByCurriculumId(Number(req.params.curriculumId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch grades for curriculum" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await gradeService.create(req.body));
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(404).json({ error: "Curriculum not found" });
      }
      res.status(500).json({ error: "Failed to create grade" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await gradeService.update(Number(req.params.id), req.body));
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Grade not found" });
      }
      res.status(500).json({ error: "Failed to update grade" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await gradeService.delete(Number(req.params.id));
      res.json({ message: "Grade deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Grade not found" });
      }
      res.status(500).json({ error: "Failed to delete grade" });
    }
  },
};