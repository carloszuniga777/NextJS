/*
  Warnings:

  - Made the column `fecha_log` on table `tbl_boc_logins` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tbl_boc_logins" ALTER COLUMN "fecha_log" SET NOT NULL;
