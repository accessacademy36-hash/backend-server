import prisma from "../lib/prisma";

export const countryService = {
  getAll: () =>
    prisma.country.findMany({ include: { curriculums: true } }),

  getById: (id: number) =>
    prisma.country.findUnique({
      where: { id },
      include: { curriculums: true },
    }),

  create: (data: { name: string }) =>
    prisma.country.create({ data }),

  update: (id: number, data: { name: string }) =>
    prisma.country.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.country.delete({ where: { id } }),
};