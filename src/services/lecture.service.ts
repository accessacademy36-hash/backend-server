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

  getTeacherDemoSessions: async (teacherId: number) => {
    const demos = await prisma.lecture.findMany({
      where: {
        isDemo: true,
        teachingAssignment: { teacherId },
      },
      include: {
        teachingAssignment: {
          include: {
            course: true,
            grade: true,
          },
        },
        // Student who booked the demo
        attendances: {
          include: {
            student: {
              select: { id: true, name: true, phone: true },
            },
          },
        },
      },
      orderBy: { startTime: "asc" },
    });

    return demos.map((lecture) => ({
      lectureId: lecture.id,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      status: lecture.status,
      meetingLink: lecture.meetingLink ?? null,
      courseName: lecture.teachingAssignment.course.name,
      gradeName: lecture.teachingAssignment.grade.name,
      student: lecture.attendances[0]
        ? {
          id: lecture.attendances[0].student.id,
          name: lecture.attendances[0].student.name,
          phone: lecture.attendances[0].student.phone,
          attendanceStatus: lecture.attendances[0].status,
        }
        : null,
    }));
  },

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