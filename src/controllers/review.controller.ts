import { Request, Response } from "express";
import { reviewService } from "../services/review.service";

export const reviewController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await reviewService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const review = await reviewService.getById(Number(req.params.id));
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.json(review);
    } catch {
      res.status(500).json({ error: "Failed to fetch review" });
    }
  },

  getByReviewerId: async (req: Request, res: Response) => {
    try {
      res.json(await reviewService.getByReviewerId(Number(req.params.reviewerId)));
    } catch {
      res.status(500).json({ error: "Failed to fetch reviews by reviewer" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await reviewService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create review" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await reviewService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update review" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await reviewService.delete(Number(req.params.id));
      res.json({ message: "Review deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete review" });
    }
  },
};