/*
  Warnings:

  - The `certifications` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `languages` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `projects` column on the `Resume` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "certifications",
ADD COLUMN     "certifications" JSONB,
DROP COLUMN "languages",
ADD COLUMN     "languages" JSONB,
DROP COLUMN "projects",
ADD COLUMN     "projects" JSONB;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" DROP NOT NULL;
