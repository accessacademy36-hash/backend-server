import { Request, Response } from "express";
import { teacherUnavailableService } from "../services/teacher-unavailable.service";

export const teacherUnavailableController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await teacherUnavailableService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch unavailable periods" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const period = await teacherUnavailableService.getById(Number(req.params.id));
      if (!period) return res.status(404).json({ error: "Unavailable period not found" });
      res.json(period);
    } catch {
      res.status(500).json({ error: "Failed to fetch unavailable period" });
    }
  },

  getByTeacherId: async (req: Request, res: Response) => {
    try {
      res.json(await teacherUnavailableService.getByTeacherId(Number(req.params.teacherId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch teacher unavailable periods" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await teacherUnavailableService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create unavailable period" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await teacherUnavailableService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update unavailable period" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await teacherUnavailableService.delete(Number(req.params.id));
      res.json({ message: "Unavailable period deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete unavailable period" });
    }
  },
};