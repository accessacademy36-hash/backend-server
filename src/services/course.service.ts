import prisma from "../lib/prisma";

export const courseService = {
  getAll: () => prisma.course.findMany(),

  getById: (id: number) => prisma.course.findUnique({ where: { id } }),

  create: (data: {
    name: string;
    basePrice: number;
    numberOfLessons: number;
    isGroupSession?: boolean;
    maxStudentsDefault?: number;
  }) => prisma.course.create({ data }),

  update: (
    id: number,
    data: Partial<{
      name: string;
      basePrice: number;
      numberOfLessons: number;
      isGroupSession: boolean;
      maxStudentsDefault: number;
    }>
  ) => prisma.course.update({ where: { id }, data }),

  delete: (id: number) => prisma.course.delete({ where: { id } }),
};