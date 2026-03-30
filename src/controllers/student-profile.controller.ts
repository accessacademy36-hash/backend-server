import { Request, Response } from "express";
import { studentProfileService } from "../services/student-profile.service";

export const studentProfileController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const profiles = await studentProfileService.getAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student profiles" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const profile = await studentProfileService.getById(Number(req.params.id));
      if (!profile) return res.status(404).json({ error: "Student profile not found" });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch student profile" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const profile = await studentProfileService.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to create student profile" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const profile = await studentProfileService.update(Number(req.params.id), req.body);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update student profile" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await studentProfileService.delete(Number(req.params.id));
      res.json({ message: "Student profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete student profile" });
    }
  },
};