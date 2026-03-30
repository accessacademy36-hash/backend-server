import { Request, Response } from "express";
import { bookingRequestService } from "../services/booking-request.service";

export const bookingRequestController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await bookingRequestService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch booking requests" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const booking = await bookingRequestService.getById(Number(req.params.id));
      if (!booking) return res.status(404).json({ error: "Booking request not found" });
      res.json(booking);
    } catch {
      res.status(500).json({ error: "Failed to fetch booking request" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await bookingRequestService.create(req.body));
    } catch {
      res.status(500).json({ error: "Failed to create booking request" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await bookingRequestService.update(Number(req.params.id), req.body));
    } catch {
      res.status(500).json({ error: "Failed to update booking request" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await bookingRequestService.delete(Number(req.params.id));
      res.json({ message: "Booking request deleted successfully" });
    } catch {
      res.status(500).json({ error: "Failed to delete booking request" });
    }
  },
};