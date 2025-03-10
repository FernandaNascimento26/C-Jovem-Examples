-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "concluida" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
