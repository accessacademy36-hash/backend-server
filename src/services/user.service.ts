import { Role } from "@prisma/client";
import prisma from "../lib/prisma";

export const userService = {
  getAll: () =>
    prisma.user.findMany(),

  getById: (id: number) =>
    prisma.user.findUnique({ where: { id } }),

  create: (data: {
    name: string;
    phone: string;
    country: string;
    timezone: string;
    role: Role;
  }) => prisma.user.create({ data }),

  update: (
    id: number,
    data: Partial<{
      name: string;
      phone: string;
      country: string;
      timezone: string;
      role: Role;
    }>
  ) => prisma.user.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.user.delete({ where: { id } }),
};