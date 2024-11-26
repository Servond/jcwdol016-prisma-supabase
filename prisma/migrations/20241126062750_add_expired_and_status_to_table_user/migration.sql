/*
  Warnings:

  - Added the required column `expired_date` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "expired_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
