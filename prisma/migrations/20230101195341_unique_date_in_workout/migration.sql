/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `workOutSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "workOutSession_userId_date_key" ON "workOutSession"("userId", "date");
