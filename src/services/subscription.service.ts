import { SubscriptionStatus } from "@prisma/client";
import prisma from "../lib/prisma";

export const subscriptionService = {
  getAll: () =>
    prisma.subscription.findMany({
      include: { student: true, teachingAssignment: true, paymentRequest: true },
    }),

  getById: (id: number) =>
    prisma.subscription.findUnique({
      where: { id },
      include: { student: true, teachingAssignment: true, paymentRequest: true },
    }),

  create: (data: {
    studentId: number;
    teachingAssignmentId: number;
    paymentRequestId?: number;
    totalSessions: number;
    startDate?: Date;
    endDate?: Date;
  }) => prisma.subscription.create({ data }),

  update: (
    id: number,
    data: Partial<{
      sessionsUsed: number;
      studentDelayCount: number;
      teacherDelayCount: number;
      startDate: Date;
      endDate: Date;
      status: SubscriptionStatus;
    }>
  ) => prisma.subscription.update({ where: { id }, data }),

  delete: (id: number) => prisma.subscription.delete({ where: { id } }),
};