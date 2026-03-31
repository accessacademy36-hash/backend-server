import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      res.json(await userService.getAll());
    } catch {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const user = await userService.getById(Number(req.params.id));
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  getAllTeachers: async (_req: Request, res: Response) => {
    try {
      res.json(await userService.getAllTeachers());
    } catch {
      res.status(500).json({ error: "Failed to fetch teachers" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { name, phone, password, countryId, timezone, role } = req.body;
      if (!name || !phone || !password || !countryId || !timezone || !role) {
        return res.status(400).json({ error: "All fields are required: name, phone, password, countryId, timezone, role" });
      }
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(409).json({ error: "Phone number already in use" });
      }
      if (error.code === "P2003") {
        return res.status(404).json({ error: "Country not found" });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const user = await userService.update(Number(req.params.id), req.body);
      res.json(user);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await userService.delete(Number(req.params.id));
      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};