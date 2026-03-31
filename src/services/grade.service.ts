import prisma from "../lib/prisma";

export const gradeService = {
  getAll: () =>
    prisma.grade.findMany({ include: { curriculum: true } }),

  getById: (id: number) =>
    prisma.grade.findUnique({ where: { id }, include: { curriculum: true } }),

  getByCurriculumId: (curriculumId: number) =>
    prisma.grade.findMany({ where: { curriculumId }, include: { curriculum: true } }),

  create: (data: { name: string; curriculumId: number }) =>
    prisma.grade.create({ data, include: { curriculum: true } }),

  update: (id: number, data: Partial<{ name: string; curriculumId: number }>) =>
    prisma.grade.update({ where: { id }, data, include: { curriculum: true } }),

  delete: (id: number) =>
    prisma.grade.delete({ where: { id } }),
};