import { Request, Response } from "express";
import { lectureHomeworkService } from "../services/lecture-homework.service";

export const lectureHomeworkController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await lectureHomeworkService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch homework files" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const homework = await lectureHomeworkService.getById(Number(req.params.id));
      if (!homework) return res.status(404).json({ error: "Homework file not found" });
      res.json(homework);
    } catch {
      res.status(500).json({ error: "Failed to fetch homework file" });
    }
  },

  getByLectureId: async (req: Request, res: Response) => {
    try {
      res.json(await lectureHomeworkService.getByLectureId(Number(req.params.lectureId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch homework files for lecture" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { lectureId, title, fileUrl } = req.body;
      if (!lectureId || !title || !fileUrl) {
        return res.status(400).json({ error: "lectureId, title and fileUrl are required" });
      }
      res.status(201).json(await lectureHomeworkService.create(req.body));
    } catch (error: any) {
      if (error.code === "P2003") {
        return res.status(404).json({ error: "Lecture not found" });
      }
      res.status(500).json({ error: "Failed to create homework file" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await lectureHomeworkService.update(Number(req.params.id), req.body));
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Homework file not found" });
      }
      res.status(500).json({ error: "Failed to update homework file" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await lectureHomeworkService.delete(Number(req.params.id));
      res.json({ message: "Homework file deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Homework file not found" });
      }
      res.status(500).json({ error: "Failed to delete homework file" });
    }
  },
};