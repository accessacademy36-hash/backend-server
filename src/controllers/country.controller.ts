import { Request, Response } from "express";
import { countryService } from "../services/country.service";

export const countryController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await countryService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch countries" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const country = await countryService.getById(Number(req.params.id));
      if (!country) return res.status(404).json({ error: "Country not found" });
      res.json(country);
    } catch {
      res.status(500).json({ error: "Failed to fetch country" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      res.status(201).json(await countryService.create(req.body));
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "Country already exists" });
      }
      res.status(500).json({ error: "Failed to create country" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      res.json(await countryService.update(Number(req.params.id), req.body));
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Country not found" });
      }
      res.status(500).json({ error: "Failed to update country" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await countryService.delete(Number(req.params.id));
      res.json({ message: "Country deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Country not found" });
      }
      res.status(500).json({ error: "Failed to delete country" });
    }
  },
};