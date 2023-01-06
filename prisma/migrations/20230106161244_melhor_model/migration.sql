/*
  Warnings:

  - You are about to drop the `workOutSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DaysActivity" AS ENUM ('REST', 'SKIPPED', 'WORKOUT');

-- DropForeignKey
ALTER TABLE "workOutSession" DROP CONSTRAINT "workOutSession_userId_fkey";

-- DropTable
DROP TABLE "workOutSession";

-- CreateTable
CREATE TABLE "dailyActivity" (
    "id" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup"[],
    "cardio" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "daysActivity" "DaysActivity" NOT NULL,

    CONSTRAINT "dailyActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dailyActivity_userId_date_key" ON "dailyActivity"("userId", "date");

-- AddForeignKey
ALTER TABLE "dailyActivity" ADD CONSTRAINT "dailyActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
