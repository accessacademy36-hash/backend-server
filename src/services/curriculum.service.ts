import prisma from "../lib/prisma";

export const curriculumService = {
  getAll: () =>
    prisma.curriculum.findMany({ include: { country: true, grades: true } }),

  getById: (id: number) =>
    prisma.curriculum.findUnique({
      where: { id },
      include: { country: true, grades: true },
    }),

  getByCountryId: (countryId: number) =>
    prisma.curriculum.findMany({
      where: { countryId },
      include: { grades: true },
    }),

  create: (data: { name: string; countryId: number }) =>
    prisma.curriculum.create({ data, include: { country: true } }),

  update: (id: number, data: Partial<{ name: string; countryId: number }>) =>
    prisma.curriculum.update({ where: { id }, data, include: { country: true } }),

  delete: (id: number) =>
    prisma.curriculum.delete({ where: { id } }),
};