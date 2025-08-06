/*
  Warnings:

  - Made the column `nome` on table `aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."aluno" ALTER COLUMN "nome" SET NOT NULL,
ALTER COLUMN "data_nas" DROP NOT NULL;
