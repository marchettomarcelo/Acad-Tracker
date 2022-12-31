/*
  Warnings:

  - You are about to drop the column `dateId` on the `workOutSession` table. All the data in the column will be lost.
  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `workOutSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "workOutSession" DROP CONSTRAINT "workOutSession_dateId_fkey";

-- AlterTable
ALTER TABLE "workOutSession" DROP COLUMN "dateId",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Date";

-- DropEnum
DROP TYPE "DayOfWeek";

-- DropEnum
DROP TYPE "Month";
