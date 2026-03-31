import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export const authController = {
  // POST /api/auth/register
  register: async (req: Request, res: Response) => {
    try {
      const result = await authService.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      if (error.message === "Phone number already in use") {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: "Registration failed" });
    }
  },

  // POST /api/auth/login
  login: async (req: Request, res: Response) => {
    try {
      const result = await authService.login(req.body);
      res.json(result);
    } catch (error: any) {
      if (error.message === "Invalid phone number or password") {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: "Login failed" });
    }
  },
};