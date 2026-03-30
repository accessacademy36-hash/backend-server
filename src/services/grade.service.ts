import prisma from "../lib/prisma";

export const gradeService = {
  getAll: () => prisma.grade.findMany(),

  getById: (id: number) => prisma.grade.findUnique({ where: { id } }),

  create: (data: { name: string }) => prisma.grade.create({ data }),

  update: (id: number, data: { name: string }) =>
    prisma.grade.update({ where: { id }, data }),

  delete: (id: number) => prisma.grade.delete({ where: { id } }),
};