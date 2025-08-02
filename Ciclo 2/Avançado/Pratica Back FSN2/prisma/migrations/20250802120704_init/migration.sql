-- CreateTable
CREATE TABLE "public"."aluno" (
    "id_aluno" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "public"."aluno"("email");
