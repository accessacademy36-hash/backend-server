import { Request, Response } from "express";
import { subscriptionService } from "../services/subscription.service";

export const subscriptionController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await subscriptionService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const subscription = await subscriptionService.getById(Number(req.params.id));
      if (!subscription) return res.status(404).json({ error: "Subscription not found" });
      res.json(subscription);
    } catch {
      res.status(500).json({ error: "Failed to fetch subscription" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await subscriptionService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create subscription" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await subscriptionService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update subscription" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await subscriptionService.delete(Number(req.params.id));
      res.json({ message: "Subscription deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete subscription" });
    }
  },
};