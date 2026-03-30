import { AttendanceStatus } from "@prisma/client";
import prisma from "../lib/prisma";

export const lectureAttendanceService = {
  getAll: () =>
    prisma.lectureAttendance.findMany({
      include: { lecture: true, student: true, subscription: true },
    }),

  getById: (id: number) =>
    prisma.lectureAttendance.findUnique({
      where: { id },
      include: { lecture: true, student: true, subscription: true },
    }),

  getByLectureId: (lectureId: number) =>
    prisma.lectureAttendance.findMany({
      where: { lectureId },
      include: { student: true },
    }),

  getByStudentId: (studentId: number) =>
    prisma.lectureAttendance.findMany({
      where: { studentId },
      include: { lecture: true },
    }),

  create: (data: {
    lectureId: number;
    studentId: number;
    subscriptionId?: number;
    status?: AttendanceStatus;
  }) => prisma.lectureAttendance.create({ data }),

  update: (
    id: number,
    data: Partial<{
      status: AttendanceStatus;
      joinedAt: Date;
      leftAt: Date;
    }>
  ) => prisma.lectureAttendance.update({ where: { id }, data }),

  delete: (id: number) => prisma.lectureAttendance.delete({ where: { id } }),
};