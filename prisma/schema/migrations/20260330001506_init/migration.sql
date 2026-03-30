-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('pending', 'approved', 'rejected', 'expired');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('scheduled', 'attended', 'missed', 'delayed');

-- CreateEnum
CREATE TYPE "LectureStatus" AS ENUM ('scheduled', 'completed', 'canceled');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "ReviewTargetType" AS ENUM ('teacher', 'platform');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'completed', 'expired', 'canceled');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'student', 'teacher');

-- CreateTable
CREATE TABLE "booking_requests" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "teaching_assignment_id" INTEGER NOT NULL,
    "subscription_id" INTEGER,
    "requested_start_time" TIMESTAMP(3) NOT NULL,
    "requested_end_time" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_by" INTEGER,
    "reviewed_at" TIMESTAMP(3),

    CONSTRAINT "booking_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "course_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "base_price" DECIMAL(10,2) NOT NULL,
    "number_of_lessons" INTEGER NOT NULL,
    "is_group_session" BOOLEAN NOT NULL DEFAULT false,
    "max_students_default" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grades" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture_attendances" (
    "id" SERIAL NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "subscription_id" INTEGER,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'scheduled',
    "joined_at" TIMESTAMP(3),
    "left_at" TIMESTAMP(3),

    CONSTRAINT "lecture_attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lectures" (
    "id" SERIAL NOT NULL,
    "teaching_assignment_id" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "max_students" INTEGER NOT NULL DEFAULT 1,
    "status" "LectureStatus" NOT NULL DEFAULT 'scheduled',
    "is_demo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "lectures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_requests" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "teaching_assignment_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "screenshot_url" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_by" INTEGER,
    "reviewed_at" TIMESTAMP(3),

    CONSTRAINT "payment_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "reviewer_id" INTEGER NOT NULL,
    "target_type" "ReviewTargetType" NOT NULL,
    "target_id" INTEGER,
    "subscription_id" INTEGER,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "grade_id" INTEGER NOT NULL,
    "course_type_id" INTEGER NOT NULL,

    CONSTRAINT "student_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "teaching_assignment_id" INTEGER NOT NULL,
    "payment_request_id" INTEGER,
    "total_sessions" INTEGER NOT NULL,
    "sessions_used" INTEGER NOT NULL DEFAULT 0,
    "student_delay_count" INTEGER NOT NULL DEFAULT 0,
    "teacher_delay_count" INTEGER NOT NULL DEFAULT 0,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_availabilities" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "start_time_utc" TEXT NOT NULL,
    "end_time_utc" TEXT NOT NULL,
    "is_recurring" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "teacher_availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher_profiles" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "hourly_rate" DECIMAL(10,2) NOT NULL,
    "bio" TEXT,
    "rating_avg" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "total_reviews" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "teacher_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teaching_assignments" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "grade_id" INTEGER NOT NULL,
    "course_type_id" INTEGER NOT NULL,

    CONSTRAINT "teaching_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_types_name_key" ON "course_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "grades_name_key" ON "grades"("name");

-- CreateIndex
CREATE UNIQUE INDEX "lecture_attendances_lecture_id_student_id_key" ON "lecture_attendances"("lecture_id", "student_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_profiles_user_id_key" ON "student_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_payment_request_id_key" ON "subscriptions"("payment_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_profiles_user_id_key" ON "teacher_profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_teaching_assignment_id_fkey" FOREIGN KEY ("teaching_assignment_id") REFERENCES "teaching_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_requests" ADD CONSTRAINT "booking_requests_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_attendances" ADD CONSTRAINT "lecture_attendances_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_attendances" ADD CONSTRAINT "lecture_attendances_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_attendances" ADD CONSTRAINT "lecture_attendances_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lectures" ADD CONSTRAINT "lectures_teaching_assignment_id_fkey" FOREIGN KEY ("teaching_assignment_id") REFERENCES "teaching_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_teaching_assignment_id_fkey" FOREIGN KEY ("teaching_assignment_id") REFERENCES "teaching_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_requests" ADD CONSTRAINT "payment_requests_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_fkey" FOREIGN KEY ("reviewer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_profiles" ADD CONSTRAINT "student_profiles_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "course_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_teaching_assignment_id_fkey" FOREIGN KEY ("teaching_assignment_id") REFERENCES "teaching_assignments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_payment_request_id_fkey" FOREIGN KEY ("payment_request_id") REFERENCES "payment_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_availabilities" ADD CONSTRAINT "teacher_availabilities_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher_profiles" ADD CONSTRAINT "teacher_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teaching_assignments" ADD CONSTRAINT "teaching_assignments_course_type_id_fkey" FOREIGN KEY ("course_type_id") REFERENCES "course_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
