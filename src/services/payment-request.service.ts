import { PaymentStatus } from "@prisma/client";
import prisma from "../lib/prisma";

export const paymentRequestService = {
  getAll: () =>
    prisma.paymentRequest.findMany({
      include: { student: true, teachingAssignment: true, reviewer: true },
    }),

  getById: (id: number) =>
    prisma.paymentRequest.findUnique({
      where: { id },
      include: { student: true, teachingAssignment: true, reviewer: true },
    }),

  create: (data: {
    studentId: number;
    teachingAssignmentId: number;
    amount: number;
    currency?: string;
    screenshotUrl?: string;
  }) => prisma.paymentRequest.create({ data }),

  update: (
    id: number,
    data: Partial<{
      status: PaymentStatus;
      screenshotUrl: string;
      reviewedBy: number;
      reviewedAt: Date;
    }>
  ) => prisma.paymentRequest.update({ where: { id }, data }),

  delete: (id: number) => prisma.paymentRequest.delete({ where: { id } }),
};