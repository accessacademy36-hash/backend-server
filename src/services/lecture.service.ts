import { LectureStatus } from "@prisma/client";
import prisma from "../lib/prisma";

export const lectureService = {
  getAll: () =>
    prisma.lecture.findMany({ include: { teachingAssignment: true } }),

  getById: (id: number) =>
    prisma.lecture.findUnique({
      where: { id },
      include: { teachingAssignment: true, attendances: true },
    }),

  create: (data: {
    teachingAssignmentId: number;
    startTime: Date;
    endTime: Date;
    maxStudents?: number;
    isDemo?: boolean;
  }) => prisma.lecture.create({ data }),

  update: (
    id: number,
    data: Partial<{
      startTime: Date;
      endTime: Date;
      maxStudents: number;
      status: LectureStatus;
      isDemo: boolean;
    }>
  ) => prisma.lecture.update({ where: { id }, data }),

  delete: (id: number) => prisma.lecture.delete({ where: { id } }),
};