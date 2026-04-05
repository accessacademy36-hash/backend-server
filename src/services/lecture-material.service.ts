import prisma from "../lib/prisma";

export const lectureMaterialService = {
  getAll: () =>
    prisma.lectureMaterial.findMany({ include: { lecture: true } }),

  getById: (id: number) =>
    prisma.lectureMaterial.findUnique({ where: { id }, include: { lecture: true } }),

  getByLectureId: (lectureId: number) =>
    prisma.lectureMaterial.findMany({ where: { lectureId } }),

  create: (data: { lectureId: number; title: string; fileUrl: string }) =>
    prisma.lectureMaterial.create({ data }),

  update: (id: number, data: Partial<{ title: string; fileUrl: string }>) =>
    prisma.lectureMaterial.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.lectureMaterial.delete({ where: { id } }),
};