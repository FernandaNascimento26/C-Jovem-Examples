/*
  Warnings:

  - You are about to drop the column `data_nascimento` on the `aluno` table. All the data in the column will be lost.
  - Added the required column `data_nas` to the `aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."aluno" DROP COLUMN "data_nascimento",
ADD COLUMN     "data_nas" TIMESTAMP(3) NOT NULL;
