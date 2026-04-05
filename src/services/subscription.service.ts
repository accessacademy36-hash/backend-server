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

  // ─── Student Active Subscriptions ─────────────────────────────────────────
  getActiveByStudentId: async (studentId: number) => {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        studentId,
        status: SubscriptionStatus.active,
      },
      include: {
        teachingAssignment: {
          include: {
            course: true,
            grade: {
              include: { curriculum: true },
            },
            courseType: true,
            teacher: {
              select: {
                id: true,
                name: true,
                phone: true,
                timezone: true,
                teacherProfile: {
                  select: {
                    bio: true,
                    ratingAvg: true,
                    totalReviews: true,
                    hourlyRate: true,
                  },
                },
              },
            },
          },
        },
        lectureAttendances: {
          include: {
            lecture: {
              include: {
                // Multiple homework files
                homeworks: {
                  select: {
                    id: true,
                    title: true,
                    fileUrl: true,
                    uploadedAt: true,
                  },
                },
                // Multiple material files
                materials: {
                  select: {
                    id: true,
                    title: true,
                    fileUrl: true,
                    uploadedAt: true,
                  },
                },
                // Delays for this lecture
                delays: {
                  select: {
                    id: true,
                    requestedBy: true,
                    delayCountBefore: true,
                    penaltyApplied: true,
                    createdAt: true,
                    approver: {
                      select: { id: true, name: true },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            lecture: { startTime: "desc" },
          },
        },
      },
    });

    return subscriptions.map((sub) => ({
      id: sub.id,
      status: sub.status,
      totalSessions: sub.totalSessions,
      sessionsUsed: sub.sessionsUsed,
      sessionsRemaining: sub.totalSessions - sub.sessionsUsed,
      startDate: sub.startDate,
      endDate: sub.endDate,
      studentDelayCount: sub.studentDelayCount,
      teacherDelayCount: sub.teacherDelayCount,

      course: {
        id: sub.teachingAssignment.course.id,
        name: sub.teachingAssignment.course.name,
        basePrice: sub.teachingAssignment.course.basePrice,
        numberOfLessons: sub.teachingAssignment.course.numberOfLessons,
        isGroupSession: sub.teachingAssignment.course.isGroupSession,
      },

      grade: {
        id: sub.teachingAssignment.grade.id,
        name: sub.teachingAssignment.grade.name,
        curriculum: sub.teachingAssignment.grade.curriculum,
      },

      courseType: sub.teachingAssignment.courseType,

      teacher: {
        id: sub.teachingAssignment.teacher.id,
        name: sub.teachingAssignment.teacher.name,
        phone: sub.teachingAssignment.teacher.phone,
        timezone: sub.teachingAssignment.teacher.timezone,
        ...sub.teachingAssignment.teacher.teacherProfile,
      },

      lectures: sub.lectureAttendances.map((attendance) => ({
        lectureId: attendance.lecture.id,
        startTime: attendance.lecture.startTime,
        endTime: attendance.lecture.endTime,
        status: attendance.lecture.status,
        isDemo: attendance.lecture.isDemo,
        attendanceStatus: attendance.status,
        joinedAt: attendance.joinedAt,
        leftAt: attendance.leftAt,
        homeworks: attendance.lecture.homeworks,      // array of files
        materials: attendance.lecture.materials,      // array of files
        delays: attendance.lecture.delays.length > 0
          ? attendance.lecture.delays
          : null,
      })),
    }));
  },

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