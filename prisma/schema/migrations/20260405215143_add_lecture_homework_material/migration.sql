/*
  Warnings:

  - You are about to drop the column `homework_url` on the `lectures` table. All the data in the column will be lost.
  - You are about to drop the column `material_url` on the `lectures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "lectures" DROP COLUMN "homework_url",
DROP COLUMN "material_url";

-- CreateTable
CREATE TABLE "lecture_homeworks" (
    "id" SERIAL NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lecture_homeworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lecture_materials" (
    "id" SERIAL NOT NULL,
    "lecture_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lecture_materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lecture_homeworks" ADD CONSTRAINT "lecture_homeworks_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecture_materials" ADD CONSTRAINT "lecture_materials_lecture_id_fkey" FOREIGN KEY ("lecture_id") REFERENCES "lectures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
