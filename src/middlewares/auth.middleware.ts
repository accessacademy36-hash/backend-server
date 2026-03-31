import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../services/auth.service";
import { Role } from "@prisma/client";

// ─── Extend Express Request ───────────────────────────────────────────────────
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// ─── authenticate ─────────────────────────────────────────────────────────────
// Verifies the JWT token from the Authorization header.
// Attaches the decoded payload to req.user.
// Usage: router.get("/", authenticate, controller.getAll)

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: no token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: invalid or expired token" });
  }
};

// ─── isAdmin ──────────────────────────────────────────────────────────────────
// Must be used AFTER authenticate.
// Usage: router.delete("/:id", authenticate, isAdmin, controller.delete)

export const isAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: not authenticated" });
  }

  if (req.user.role !== Role.admin) {
    return res.status(403).json({ error: "Forbidden: admin access required" });
  }

  next();
};

// ─── isTeacher ────────────────────────────────────────────────────────────────
export const isTeacher = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: not authenticated" });
  }

  if (req.user.role !== Role.teacher) {
    return res.status(403).json({ error: "Forbidden: teacher access required" });
  }

  next();
};

// ─── isStudent ────────────────────────────────────────────────────────────────
export const isStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized: not authenticated" });
  }

  if (req.user.role !== Role.student) {
    return res.status(403).json({ error: "Forbidden: student access required" });
  }

  next();
};

// ─── hasRole ──────────────────────────────────────────────────────────────────
// Generic role checker for multiple roles.
// Usage: router.get("/", authenticate, hasRole("admin", "teacher"), controller.getAll)

export const hasRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: `Forbidden: requires one of [${roles.join(", ")}]` });
    }

    next();
  };
};