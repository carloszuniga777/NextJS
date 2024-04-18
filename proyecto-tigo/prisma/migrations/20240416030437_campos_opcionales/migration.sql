-- AlterTable
ALTER TABLE "tbl_boc_logins" ALTER COLUMN "tipo_usuario" DROP NOT NULL,
ALTER COLUMN "territorio" DROP NOT NULL,
ALTER COLUMN "observacion" DROP NOT NULL,
ALTER COLUMN "log" DROP NOT NULL;
