-- CreateEnum
CREATE TYPE "public"."Regra" AS ENUM ('ALUNO', 'INSTRUTOR', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."aluno" (
    "id_aluno" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nas" DATE NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateTable
CREATE TABLE "public"."user" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "regra" "public"."Regra" NOT NULL DEFAULT 'ALUNO',
    "aluno_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."treino" (
    "id_treino" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_inicio" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_aluno" INTEGER NOT NULL,

    CONSTRAINT "treino_pkey" PRIMARY KEY ("id_treino")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_aluno_id_key" ON "public"."user"("aluno_id");

-- CreateIndex
CREATE INDEX "user_regra_idx" ON "public"."user"("regra");

-- CreateIndex
CREATE INDEX "treino_id_aluno_idx" ON "public"."treino"("id_aluno");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "public"."aluno"("id_aluno") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."treino" ADD CONSTRAINT "treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "public"."aluno"("id_aluno") ON DELETE CASCADE ON UPDATE CASCADE;
