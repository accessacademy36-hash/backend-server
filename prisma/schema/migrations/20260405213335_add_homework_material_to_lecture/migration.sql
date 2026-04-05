-- CreateEnum
CREATE TYPE "DelayRequestedBy" AS ENUM ('student', 'teacher');

-- AlterTable
ALTER TABLE "lectures" ADD COLUMN     "homework_url" TEXT,
ADD COLUMN     "material_url" TEXT;

-- CreateTable
CREATE TABLE "lecture_delays" (
    "id" SERIAL NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "subscription_id" INTEGER NOT NULL,
    "requested_by" "DelayRequestedBy" NOT NULL,
    "approved_by" INTEGER,
    "delay_count_before" INTEGER NOT NULL,
    "penalty_applied" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lecture_delays_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lecture_delays" ADD CONSTRAINT "lecture_delays_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_delays" ADD CONSTRAINT "lecture_delays_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_delays" ADD CONSTRAINT "lecture_delays_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
