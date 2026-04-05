import { Request, Response } from "express";
import { lectureMaterialService } from "../services/lecture-material.service";

export const lectureMaterialController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await lectureMaterialService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch material files" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const material = await lectureMaterialService.getById(Number(req.params.id));
      if (!material) return res.status(404).json({ error: "Material file not found" });
      res.json(material);
    } catch {
      res.status(500).json({ error: "Failed to fetch material file" });
    }
  },

  getByLectureId: async (req: Request, res: Response) => {
    try {
      res.json(await lectureMaterialService.getByLectureId(Number(req.params.lectureId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch material files for lecture" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { lectureId, title, fileUrl } = req.body;
      if (!lectureId || !title || !fileUrl) {
        return res.status(400).json({ error: "lectureId, title and fileUrl are required" });
      }
      res.status(201).json(await lectureMaterialService.create(req.body));
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(404).json({ error: "Lecture not found" });
      }
      res.status(500).json({ error: "Failed to create material file" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await lectureMaterialService.update(Number(req.params.id), req.body));
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Material file not found" });
      }
      res.status(500).json({ error: "Failed to update material file" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await lectureMaterialService.delete(Number(req.params.id));
      res.json({ message: "Material file deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Material file not found" });
      }
      res.status(500).json({ error: "Failed to delete material file" });
    }
  },
};