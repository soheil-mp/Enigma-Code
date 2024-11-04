/*
  Warnings:

  - Changed the type of `education` on the `Resume` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `experiences` on the `Resume` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `skills` on the `Resume` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Resume" ALTER COLUMN "template" DROP DEFAULT,
DROP COLUMN "education",
ADD COLUMN     "education" JSONB NOT NULL,
DROP COLUMN "experiences",
ADD COLUMN     "experiences" JSONB NOT NULL,
DROP COLUMN "skills",
ADD COLUMN     "skills" JSONB NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'My Resume';
