import prisma from "../lib/prisma";

export const teacherAvailabilityService = {
  getAll: () =>
    prisma.teacherAvailability.findMany({ include: { teacher: true } }),

  getById: (id: number) =>
    prisma.teacherAvailability.findUnique({ where: { id }, include: { teacher: true } }),

  getByTeacherId: (teacherId: number) =>
    prisma.teacherAvailability.findMany({ where: { teacherId } }),

  create: (data: {
    teacherId: number;
    dayOfWeek: number;
    startTimeUtc: string;
    endTimeUtc: string;
    isRecurring?: boolean;
  }) => prisma.teacherAvailability.create({ data }),

  update: (
    id: number,
    data: Partial<{
      dayOfWeek: number;
      startTimeUtc: string;
      endTimeUtc: string;
      isRecurring: boolean;
    }>
  ) => prisma.teacherAvailability.update({ where: { id }, data }),

  delete: (id: number) => prisma.teacherAvailability.delete({ where: { id } }),
};