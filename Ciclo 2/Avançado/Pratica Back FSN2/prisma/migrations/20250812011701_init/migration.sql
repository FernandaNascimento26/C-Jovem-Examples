-- CreateTable
CREATE TABLE "public"."aluno" (
    "id_aluno" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nas" TIMESTAMP(3),
    "email" TEXT NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "public"."aluno"("email");
