import { ReviewTargetType } from "@prisma/client";
import prisma from "../lib/prisma";

export const reviewService = {
  getAll: () =>
    prisma.review.findMany({
      include: { reviewer: true, subscription: true },
    }),

  getById: (id: number) =>
    prisma.review.findUnique({
      where: { id },
      include: { reviewer: true, subscription: true },
    }),

  getByReviewerId: (reviewerId: number) =>
    prisma.review.findMany({ where: { reviewerId } }),

  getByTargetType: (targetType: ReviewTargetType) =>
    prisma.review.findMany({ where: { targetType } }),

  create: (data: {
    reviewerId: number;
    targetType: ReviewTargetType;
    targetId?: number;
    subscriptionId?: number;
    rating: number;
    comment?: string;
  }) => prisma.review.create({ data }),

  update: (
    id: number,
    data: Partial<{ rating: number; comment: string }>
  ) => prisma.review.update({ where: { id }, data }),

  delete: (id: number) => prisma.review.delete({ where: { id } }),
};