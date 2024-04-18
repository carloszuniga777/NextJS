/*
  Warnings:

  - Added the required column `pass` to the `tbl_boc_logins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbl_boc_logins" ADD COLUMN     "pass" TEXT NOT NULL;
