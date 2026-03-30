import { Request, Response } from "express";
import { teacherAvailabilityService } from "../services/teacher-availability.service";

export const teacherAvailabilityController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await teacherAvailabilityService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch teacher availabilities" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const slot = await teacherAvailabilityService.getById(Number(req.params.id));
      if (!slot) return res.status(404).json({ error: "Availability slot not found" });
      res.json(slot);
    } catch {
      res.status(500).json({ error: "Failed to fetch availability slot" });
    }
  },

  getByTeacherId: async (req: Request, res: Response) => {
    try {
      res.json(await teacherAvailabilityService.getByTeacherId(Number(req.params.teacherId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch teacher availability" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await teacherAvailabilityService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create availability slot" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await teacherAvailabilityService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update availability slot" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await teacherAvailabilityService.delete(Number(req.params.id));
      res.json({ message: "Availability slot deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete availability slot" });
    }
  },
};