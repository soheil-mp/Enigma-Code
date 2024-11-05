/*
  Warnings:

  - You are about to drop the column `certifications` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `experiences` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `personalInfo` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `projects` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `content` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "certifications",
DROP COLUMN "education",
DROP COLUMN "experiences",
DROP COLUMN "languages",
DROP COLUMN "personalInfo",
DROP COLUMN "projects",
DROP COLUMN "skills",
ADD COLUMN     "content" JSONB NOT NULL,
ALTER COLUMN "template" SET DEFAULT 'modern';
