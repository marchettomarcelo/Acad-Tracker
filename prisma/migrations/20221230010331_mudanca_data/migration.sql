/*
  Warnings:

  - Changed the type of `month` on the `Date` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Month" AS ENUM ('JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

-- AlterTable
ALTER TABLE "Date" DROP COLUMN "month",
ADD COLUMN     "month" "Month" NOT NULL;
