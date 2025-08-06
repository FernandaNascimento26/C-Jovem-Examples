/*
  Warnings:

  - You are about to drop the `Aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Aluno";

-- CreateTable
CREATE TABLE "public"."aluno" (
    "id_aluno" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nasc" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "public"."aluno"("email");
