import prisma from "../lib/prisma";

export const teacherProfileService = {
  getAll: () =>
    prisma.teacherProfile.findMany({ include: { user: true } }),

  getById: (id: number) =>
    prisma.teacherProfile.findUnique({ where: { id }, include: { user: true } }),

  getByUserId: (userId: number) =>
    prisma.teacherProfile.findUnique({ where: { userId } }),

  create: (data: {
    userId: number;
    hourlyRate: number;
    bio?: string;
  }) => prisma.teacherProfile.create({ data }),

  update: (
    id: number,
    data: Partial<{ hourlyRate: number; bio: string; ratingAvg: number; totalReviews: number }>
  ) => prisma.teacherProfile.update({ where: { id }, data }),

  delete: (id: number) =>
    prisma.teacherProfile.delete({ where: { id } }),
};