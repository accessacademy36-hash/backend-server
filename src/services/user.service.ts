import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import prisma from "../lib/prisma";

// Password is excluded from all responses
const safeUserSelect = {
  id: true,
  name: true,
  phone: true,
  country: true,
  timezone: true,
  role: true,
  createdAt: true,
};

export const userService = {
  getAll: () =>
    prisma.user.findMany({
      select: safeUserSelect,
      include: { country: true },
    }),

  getById: (id: number) =>
    prisma.user.findUnique({
      where: { id },
      select: { ...safeUserSelect, country: true },
    }),

  getAllTeachers: () =>
    prisma.user.findMany({
      where: { role: Role.teacher },
      select: {
        ...safeUserSelect,
        country: true,
        teacherProfile: true,
      },
    }),

  create: async (data: {
    name: string;
    phone: string;
    password: string;
    countryId: number;
    timezone: string;
    role: Role;
  }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { ...safeUserSelect, country: true },
    });
  },

  update: async (
    id: number,
    data: Partial<{
      name: string;
      phone: string;
      password: string;
      countryId: number;
      timezone: string;
      role: Role;
    }>
  ) => {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.update({
      where: { id },
      data,
      select: { ...safeUserSelect, country: true },
    });
  },

  delete: (id: number) =>
    prisma.user.delete({ where: { id } }),
};