import { Request, Response } from "express";
import { teacherProfileService } from "../services/teacher-profile.service";

export const teacherProfileController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const profiles = await teacherProfileService.getAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch teacher profiles" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const profile = await teacherProfileService.getById(Number(req.params.id));
      if (!profile) return res.status(404).json({ error: "Teacher profile not found" });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch teacher profile" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const profile = await teacherProfileService.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to create teacher profile" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const profile = await teacherProfileService.update(Number(req.params.id), req.body);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update teacher profile" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await teacherProfileService.delete(Number(req.params.id));
      res.json({ message: "Teacher profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete teacher profile" });
    }
  },
};