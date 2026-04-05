import { DelayRequestedBy } from "@prisma/client";
import prisma from "../lib/prisma";

export const lectureDelayService = {
  getAll: () =>
    prisma.lectureDelay.findMany({
      include: { lecture: true, subscription: true, approver: true },
    }),

  getById: (id: number) =>
    prisma.lectureDelay.findUnique({
      where: { id },
      include: { lecture: true, subscription: true, approver: true },
    }),

  getByLectureId: (lectureId: number) =>
    prisma.lectureDelay.findMany({ where: { lectureId } }),

  getBySubscriptionId: (subscriptionId: number) =>
    prisma.lectureDelay.findMany({ where: { subscriptionId } }),

  create: (data: {
    lectureId: number;
    subscriptionId: number;
    requestedBy: DelayRequestedBy;
    delayCountBefore: number;
    approvedBy?: number;
    penaltyApplied?: boolean;
  }) => prisma.lectureDelay.create({ data }),

  update: (
    id: number,
    data: Partial<{
      approvedBy: number;
      penaltyApplied: boolean;
    }>
  ) => prisma.lectureDelay.update({ where: { id }, data }),

  delete: (id: number) => prisma.lectureDelay.delete({ where: { id } }),
};