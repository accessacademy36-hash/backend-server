import { Request, Response } from "express";
import { teachingAssignmentService } from "../services/teaching-assignment.service";

export const teachingAssignmentController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await teachingAssignmentService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch teaching assignments" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const assignment = await teachingAssignmentService.getById(Number(req.params.id));
      if (!assignment) return res.status(404).json({ error: "Teaching assignment not found" });
      res.json(assignment);
    } catch {
      res.status(500).json({ error: "Failed to fetch teaching assignment" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await teachingAssignmentService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create teaching assignment" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await teachingAssignmentService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update teaching assignment" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await teachingAssignmentService.delete(Number(req.params.id));
      res.json({ message: "Teaching assignment deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete teaching assignment" });
    }
  },
};