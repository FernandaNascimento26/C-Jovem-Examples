-- CreateEnum
CREATE TYPE "Faixa_etaria" AS ENUM ('CRIANÇA', 'ADOLESCENTE', 'JOVEM', 'ADULTO', 'IDOSO');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ADMINISTRADOR', 'PACIENTE', 'PROFISSIONAL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "tipo" "Type" NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula_profissional" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "foto_perfil" TEXT,
    "quant_atend_gratis" INTEGER NOT NULL,
    "faixas_etarias" "Faixa_etaria"[],
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "genero" "Gender" NOT NULL,
    "idade" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "genero" "Gender" NOT NULL,
    "data_nasc" TIMESTAMP(3) NOT NULL,
    "motivo_terapia" TEXT NOT NULL,
    "medicamentos" TEXT NOT NULL,
    "historico_familiar" TEXT NOT NULL,
    "principal_queixa" TEXT NOT NULL,
    "email_contato" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
