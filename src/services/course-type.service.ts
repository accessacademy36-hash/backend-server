import prisma from "../lib/prisma";

export const courseTypeService = {
  getAll: () => prisma.courseType.findMany(),

  getById: (id: number) => prisma.courseType.findUnique({ where: { id } }),

  create: (data: { name: string }) => prisma.courseType.create({ data }),

  update: (id: number, data: { name: string }) =>
    prisma.courseType.update({ where: { id }, data }),

  delete: (id: number) => prisma.courseType.delete({ where: { id } }),
};