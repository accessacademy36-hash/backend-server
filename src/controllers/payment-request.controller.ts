import { Request, Response } from "express";
import { paymentRequestService } from "../services/payment-request.service";

export const paymentRequestController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await paymentRequestService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch payment requests" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const request = await paymentRequestService.getById(Number(req.params.id));
      if (!request) return res.status(404).json({ error: "Payment request not found" });
      res.json(request);
    } catch {
      res.status(500).json({ error: "Failed to fetch payment request" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await paymentRequestService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create payment request" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await paymentRequestService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update payment request" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await paymentRequestService.delete(Number(req.params.id));
      res.json({ message: "Payment request deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete payment request" });
    }
  },
};