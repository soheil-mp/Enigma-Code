/*
  Warnings:

  - You are about to drop the column `content` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `personalInfo` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "content",
DROP COLUMN "lastUpdated",
ADD COLUMN     "certifications" JSONB[],
ADD COLUMN     "education" JSONB[],
ADD COLUMN     "experiences" JSONB[],
ADD COLUMN     "languages" JSONB[],
ADD COLUMN     "personalInfo" JSONB NOT NULL,
ADD COLUMN     "projects" JSONB[],
ADD COLUMN     "skills" JSONB[],
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "template" SET DEFAULT 'modern';

-- CreateIndex
CREATE INDEX "Resume_userId_idx" ON "Resume"("userId");
