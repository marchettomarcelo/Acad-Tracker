-- AlterTable
ALTER TABLE "workOutSession" ADD COLUMN     "rest" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skipped" BOOLEAN NOT NULL DEFAULT false;
