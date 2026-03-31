import { Request, Response } from "express";
import { curriculumService } from "../services/curriculum.service";

export const curriculumController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await curriculumService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch curriculums" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const curriculum = await curriculumService.getById(Number(req.params.id));
      if (!curriculum) return res.status(404).json({ error: "Curriculum not found" });
      res.json(curriculum);
    } catch {
      res.status(500).json({ error: "Failed to fetch curriculum" });
    }
  },

  getByCountryId: async (req: Request, res: Response) => {
    try {
      res.json(await curriculumService.getByCountryId(Number(req.params.countryId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch curriculums for country" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await curriculumService.create(req.body));
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(404).json({ error: "Country not found" });
      }
      res.status(500).json({ error: "Failed to create curriculum" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await curriculumService.update(Number(req.params.id), req.body));
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Curriculum not found" });
      }
      res.status(500).json({ error: "Failed to update curriculum" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await curriculumService.delete(Number(req.params.id));
      res.json({ message: "Curriculum deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Curriculum not found" });
      }
      res.status(500).json({ error: "Failed to delete curriculum" });
    }
  },
};