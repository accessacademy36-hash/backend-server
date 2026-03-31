import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "7d";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface JwtPayload {
  userId: number;
  role: Role;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

// ─── Register ─────────────────────────────────────────────────────────────────
export const register = async (data: {
  name: string;
  phone: string;
  country: string;
  timezone: string;
  role: Role;
  password: string;
}) => {
  const existing = await prisma.user.findUnique({ where: { phone: data.phone } });
  if (existing) {
    throw new Error("Phone number already in use");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      phone: data.phone,
      country: data.country,
      timezone: data.timezone,
      role: data.role,
      password: hashedPassword,
    },
    select: { id: true, name: true, phone: true, role: true, country: true, timezone: true, createdAt: true },
  });

  const token = generateToken({ userId: user.id, role: user.role });

  return { user, token };
};

// ─── Login ────────────────────────────────────────────────────────────────────
export const login = async (data: { phone: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { phone: data.phone } });
  if (!user) {
    throw new Error("Invalid phone number or password");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid phone number or password");
  }

  const token = generateToken({ userId: user.id, role: user.role });

  const { password: _password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

// ─── Verify Token ─────────────────────────────────────────────────────────────
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};