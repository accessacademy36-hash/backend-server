import { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  getAll: async (_req: Request, res: Response) => {
    try {
      const users = await userService.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const user = await userService.getById(Number(req.params.id));
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const user = await userService.update(Number(req.params.id), req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await userService.delete(Number(req.params.id));
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};