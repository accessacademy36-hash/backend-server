import { BookingStatus } from "@prisma/client";
import prisma from "../lib/prisma";

export const bookingRequestService = {
  getAll: () =>
    prisma.bookingRequest.findMany({
      include: { student: true, teachingAssignment: true, subscription: true },
    }),

  getById: (id: number) =>
    prisma.bookingRequest.findUnique({
      where: { id },
      include: { student: true, teachingAssignment: true, subscription: true },
    }),

  create: (data: {
    studentId: number;
    teachingAssignmentId: number;
    subscriptionId?: number;
    requestedStartTime: Date;
    requestedEndTime: Date;
  }) => prisma.bookingRequest.create({ data }),

  update: (
    id: number,
    data: Partial<{
      status: BookingStatus;
      reviewedBy: number;
      reviewedAt: Date;
    }>
  ) => prisma.bookingRequest.update({ where: { id }, data }),

  delete: (id: number) => prisma.bookingRequest.delete({ where: { id } }),
};