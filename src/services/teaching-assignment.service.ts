import prisma from "../lib/prisma";

export const teachingAssignmentService = {
  getAll: () =>
    prisma.teachingAssignment.findMany({
      include: { teacher: true, course: true, grade: true, courseType: true },
    }),

  getById: (id: number) =>
    prisma.teachingAssignment.findUnique({
      where: { id },
      include: { teacher: true, course: true, grade: true, courseType: true },
    }),

  create: (data: {
    teacherId: number;
    courseId: number;
    gradeId: number;
    courseTypeId: number;
  }) => prisma.teachingAssignment.create({ data }),

  update: (
    id: number,
    data: Partial<{ teacherId: number; courseId: number; gradeId: number; courseTypeId: number }>
  ) => prisma.teachingAssignment.update({ where: { id }, data }),

  delete: (id: number) => prisma.teachingAssignment.delete({ where: { id } }),
};