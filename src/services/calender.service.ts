import prisma from "../lib/prisma";
import { updateZoomMeeting } from "./zoom.service";

const MAX_DELAYS_PER_USER = 2;

// ─── STUDENT CALENDAR ────────────────────────────────────────────────────────
export const getStudentCalendar = async (studentId: number) => {
  // Get all active subscriptions with their scheduled lectures
  const attendances = await prisma.lectureAttendance.findMany({
    where: {
      studentId,
      lecture: {
        status: "scheduled",
        startTime: { gte: new Date() }, // only future lectures
      },
    },
    include: {
      subscription: true,
      lecture: {
        include: {
          teachingAssignment: {
            include: {
              course: true,
              teacher: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          delays: {
            where: {
              subscription: { studentId },
            },
            select: {
              id: true,
              requestedBy: true,
              createdAt: true,
              penaltyApplied: true,
            },
          },
        },
      },
    },
    orderBy: {
      lecture: { startTime: "asc" },
    },
  });

  return attendances.map((attendance) => {
    const subscription = attendance.subscription;
    const delayCount = subscription?.studentDelayCount ?? 0;
    const canDelay = delayCount < MAX_DELAYS_PER_USER;

    return {
      lectureId: attendance.lecture.id,
      startTime: attendance.lecture.startTime,
      endTime: attendance.lecture.endTime,
      courseName: attendance.lecture.teachingAssignment.course.name,
      teacherName: attendance.lecture.teachingAssignment.teacher.name,
      teacherId: attendance.lecture.teachingAssignment.teacher.id,
      meetingLink: attendance.lecture.meetingLink ?? null,
      attendanceStatus: attendance.status,
      isDemo: attendance.lecture.isDemo,
      delay: {
        canDelay,
        delaysUsed: delayCount,
        delaysRemaining: MAX_DELAYS_PER_USER - delayCount,
        existingDelays: attendance.lecture.delays,
      },
    };
  });
};

// ─── TEACHER CALENDAR ────────────────────────────────────────────────────────
export const getTeacherCalendar = async (teacherId: number) => {
  // Get all scheduled future lectures for this teacher
  const lectures = await prisma.lecture.findMany({
    where: {
      status: "scheduled",
      startTime: { gte: new Date() },
      teachingAssignment: { teacherId },
    },
    include: {
      teachingAssignment: {
        include: {
          course: true,
          grade: true,
        },
      },
      // All students attending this lecture
      attendances: {
        include: {
          student: {
            select: { id: true, name: true },
          },
          subscription: {
            select: {
              id: true,
              teacherDelayCount: true,
            },
          },
        },
      },
      delays: {
        select: {
          id: true,
          requestedBy: true,
          createdAt: true,
          penaltyApplied: true,
        },
      },
    },
    orderBy: { startTime: "asc" },
  });

  // Get teacher's availability slots for demo bookings
  const availabilitySlots = await prisma.teacherAvailability.findMany({
    where: { teacherId },
    orderBy: { dayOfWeek: "asc" },
  });

  // Get already booked demo lectures for this teacher
  const demoLectures = await prisma.lecture.findMany({
    where: {
      isDemo: true,
      status: "scheduled",
      startTime: { gte: new Date() },
      teachingAssignment: { teacherId },
    },
    select: { startTime: true, endTime: true },
  });

  // Determine which availability slots are free (no demo booked)
  const availableForDemo = availabilitySlots.map((slot) => ({
    dayOfWeek: slot.dayOfWeek,
    startTimeUtc: slot.startTimeUtc,
    endTimeUtc: slot.endTimeUtc,
    isRecurring: slot.isRecurring,
  }));

  // Get teacher's delay count across all subscriptions they're involved in
  const teacherDelayInfo = await prisma.subscription.aggregate({
    where: {
      teachingAssignment: { teacherId },
      status: "active",
    },
    _sum: { teacherDelayCount: true },
  });

  const totalTeacherDelays = teacherDelayInfo._sum.teacherDelayCount ?? 0;
  const canDelay = totalTeacherDelays < MAX_DELAYS_PER_USER;

  return {
    lectures: lectures.map((lecture) => ({
      lectureId: lecture.id,
      startTime: lecture.startTime,
      endTime: lecture.endTime,
      courseName: lecture.teachingAssignment.course.name,
      gradeName: lecture.teachingAssignment.grade.name,
      meetingLink: lecture.meetingLink ?? null,
      isDemo: lecture.isDemo,
      students: lecture.attendances.map((a) => ({
        id: a.student.id,
        name: a.student.name,
        attendanceStatus: a.status,
      })),
      delay: {
        canDelay,
        delaysUsed: totalTeacherDelays,
        delaysRemaining: MAX_DELAYS_PER_USER - totalTeacherDelays,
        existingDelays: lecture.delays,
      },
    })),
    availableSlotsForDemo: availableForDemo,
    bookedDemoSlots: demoLectures,
  };
};

// ─── REQUEST DELAY ────────────────────────────────────────────────────────────
// Used by both student and teacher to request a delay on a lecture
export const requestDelay = async (data: {
  lectureId: number;
  subscriptionId: number;
  requestedByUserId: number;
  requestedBy: "student" | "teacher";
  newStartTime: Date;
  newEndTime: Date;
}) => {
  const { lectureId, subscriptionId, requestedBy, newStartTime, newEndTime, requestedByUserId } = data;

  // 1. Get subscription to check delay count
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
  });

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  // 2. Get lecture to make sure it's in the future
  const lecture = await prisma.lecture.findUnique({
    where: { id: lectureId },
  });

  if (!lecture) throw new Error("Lecture not found");
  if (lecture.startTime <= new Date()) throw new Error("Cannot delay a past or ongoing lecture");
  if (lecture.status !== "scheduled") throw new Error("Lecture is not in scheduled status");

  // 3. Check delay limit
  const delayCount =
    requestedBy === "student"
      ? subscription.studentDelayCount
      : subscription.teacherDelayCount;

  if (delayCount >= MAX_DELAYS_PER_USER) {
    throw new Error(`Maximum delay limit of ${MAX_DELAYS_PER_USER} reached`);
  }

  // 4. Update Zoom meeting time if meeting exists
  if (lecture.zoomMeetingId) {
    const durationMinutes = Math.round(
      (newEndTime.getTime() - newStartTime.getTime()) / 60000
    );
    await updateZoomMeeting(lecture.zoomMeetingId, {
      startTime: newStartTime,
      durationMinutes,
    });
  }

  // 5. Run DB updates in a transaction
  const [delay] = await prisma.$transaction([
    // Create delay record
    prisma.lectureDelay.create({
      data: {
        lectureId,
        subscriptionId,
        requestedBy,
        delayCountBefore: delayCount,
        penaltyApplied: false,
      },
    }),
    // Update lecture time
    prisma.lecture.update({
      where: { id: lectureId },
      data: { startTime: newStartTime, endTime: newEndTime },
    }),
    // Increment delay count on subscription
    prisma.subscription.update({
      where: { id: subscriptionId },
      data:
        requestedBy === "student"
          ? { studentDelayCount: { increment: 1 } }
          : { teacherDelayCount: { increment: 1 } },
    }),
  ]);

  return delay;
};

// ─── TEACHER DEMO SESSIONS ────────────────────────────────────────────────────
export const getTeacherDemoSessions = async (teacherId: number) => {
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
};