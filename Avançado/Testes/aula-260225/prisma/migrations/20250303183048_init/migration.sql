-- CreateTable
CREATE TABLE "Treino" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "dias_semana" TEXT,

    CONSTRAINT "Treino_pkey" PRIMARY KEY ("id")
);
