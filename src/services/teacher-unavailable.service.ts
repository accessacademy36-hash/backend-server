import prisma from "../lib/prisma";

export const teacherUnavailableService = {
  getAll: () =>
    prisma.teacherUnavailable.findMany({ include: { teacher: true } }),

  getById: (id: number) =>
    prisma.teacherUnavailable.findUnique({ where: { id }, include: { teacher: true } }),

  getByTeacherId: (teacherId: number) =>
    prisma.teacherUnavailable.findMany({ where: { teacherId } }),

  create: (data: {
    teacherId: number;
    startDatetime: Date;
    endDatetime: Date;
    reason?: string;
  }) => prisma.teacherUnavailable.create({ data }),

  update: (
    id: number,
    data: Partial<{ startDatetime: Date; endDatetime: Date; reason: string }>
  ) => prisma.teacherUnavailable.update({ where: { id }, data }),

  delete: (id: number) => prisma.teacherUnavailable.delete({ where: { id } }),
};