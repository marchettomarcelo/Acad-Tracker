/*
  Warnings:

  - You are about to drop the column `date` on the `workOutSession` table. All the data in the column will be lost.
  - You are about to drop the column `rest` on the `workOutSession` table. All the data in the column will be lost.
  - You are about to drop the column `skipped` on the `workOutSession` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `workOutSession` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dayId]` on the table `workOutSession` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dayId` to the `workOutSession` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DaysWork" AS ENUM ('TRAINED', 'RESTED', 'SKIPPED');

-- DropForeignKey
ALTER TABLE "workOutSession" DROP CONSTRAINT "workOutSession_userId_fkey";

-- DropIndex
DROP INDEX "workOutSession_userId_date_key";

-- AlterTable
ALTER TABLE "workOutSession" DROP COLUMN "date",
DROP COLUMN "rest",
DROP COLUMN "skipped",
DROP COLUMN "userId",
ADD COLUMN     "dayId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "dayWork" "DaysWork" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Day_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workOutSession_dayId_key" ON "workOutSession"("dayId");

-- AddForeignKey
ALTER TABLE "workOutSession" ADD CONSTRAINT "workOutSession_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "Day"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Day" ADD CONSTRAINT "Day_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
