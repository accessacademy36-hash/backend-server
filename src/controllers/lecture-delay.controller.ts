import { Request, Response } from "express";
import { lectureDelayService } from "../services/lecture-delay.service";

export const lectureDelayController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await lectureDelayService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch lecture delays" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const delay = await lectureDelayService.getById(Number(req.params.id));
      if (!delay) return res.status(404).json({ error: "Lecture delay not found" });
      res.json(delay);
    } catch {
      res.status(500).json({ error: "Failed to fetch lecture delay" });
    }
  },

  getByLectureId: async (req: Request, res: Response) => {
    try {
      res.json(await lectureDelayService.getByLectureId(Number(req.params.lectureId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch delays for lecture" });
    }
  },

  getBySubscriptionId: async (req: Request, res: Response) => {
    try {
      res.json(await lectureDelayService.getBySubscriptionId(Number(req.params.subscriptionId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch delays for subscription" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await lectureDelayService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create lecture delay" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await lectureDelayService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update lecture delay" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await lectureDelayService.delete(Number(req.params.id));
      res.json({ message: "Lecture delay deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete lecture delay" });
    }
  },
};