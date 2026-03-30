import prisma from "../lib/prisma";

export const studentProfileService = {
  getAll: () =>
    prisma.studentProfile.findMany({ include: { user: true, grade: true, courseType: true } }),

  getById: (id: number) =>
    prisma.studentProfile.findUnique({ where: { id }, include: { user: true, grade: true, courseType: true } }),

  getByUserId: (userId: number) =>
    prisma.studentProfile.findUnique({ where: { userId } }),

  create: (data: { userId: number; gradeId: number; courseTypeId: number }) =>
    prisma.studentProfile.create({ data }),

  update: (id: number, data: Partial<{ gradeId: number; courseTypeId: number }>) =>
    prisma.studentProfile.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.studentProfile.delete({ where: { id } }),
};