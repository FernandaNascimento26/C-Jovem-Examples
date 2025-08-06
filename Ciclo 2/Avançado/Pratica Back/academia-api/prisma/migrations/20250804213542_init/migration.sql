/*
  Warnings:

  - You are about to drop the column `data_nasc` on the `aluno` table. All the data in the column will be lost.
  - Added the required column `data_nascimento` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."aluno" DROP COLUMN "data_nasc",
ADD COLUMN     "data_nascimento" TIMESTAMP(3) NOT NULL;
