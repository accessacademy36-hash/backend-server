import prisma from "../lib/prisma";

export const lectureHomeworkService = {
  getAll: () =>
    prisma.lectureHomework.findMany({ include: { lecture: true } }),

  getById: (id: number) =>
    prisma.lectureHomework.findUnique({ where: { id }, include: { lecture: true } }),

  getByLectureId: (lectureId: number) =>
    prisma.lectureHomework.findMany({ where: { lectureId } }),

  create: (data: { lectureId: number; title: string; fileUrl: string }) =>
    prisma.lectureHomework.create({ data }),

  update: (id: number, data: Partial<{ title: string; fileUrl: string }>) =>
    prisma.lectureHomework.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.lectureHomework.delete({ where: { id } }),
};