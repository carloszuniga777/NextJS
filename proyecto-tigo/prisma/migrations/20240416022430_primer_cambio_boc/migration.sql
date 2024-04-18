/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tbl_boc_logins" (
    "id" SERIAL NOT NULL,
    "usuario" TEXT NOT NULL,
    "tipo_usuario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "territorio" TEXT NOT NULL,
    "observacion" TEXT NOT NULL,
    "log" TEXT NOT NULL,
    "fecha_log" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbl_boc_logins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_boc_logins_usuario_key" ON "tbl_boc_logins"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_boc_logins_correo_key" ON "tbl_boc_logins"("correo");
