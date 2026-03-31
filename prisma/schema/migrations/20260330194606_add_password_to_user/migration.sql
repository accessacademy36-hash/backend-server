/*
  Warnings:

  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "teacher_unavailables" (
    "id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "start_datetime" TIMESTAMP(3) NOT NULL,
    "end_datetime" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,

    CONSTRAINT "teacher_unavailables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "teacher_unavailables" ADD CONSTRAINT "teacher_unavailables_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
