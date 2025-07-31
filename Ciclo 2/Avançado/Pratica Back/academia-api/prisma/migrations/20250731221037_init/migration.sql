-- CreateTable
CREATE TABLE "public"."Aluno" (
    "id_aluno" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "public"."Aluno"("email");
