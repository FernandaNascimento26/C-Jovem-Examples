-- AlterTable
ALTER TABLE "Paciente" ALTER COLUMN "genero" DROP NOT NULL,
ALTER COLUMN "data_nasc" DROP NOT NULL,
ALTER COLUMN "motivo_terapia" DROP NOT NULL,
ALTER COLUMN "medicamentos" DROP NOT NULL,
ALTER COLUMN "historico_familiar" DROP NOT NULL,
ALTER COLUMN "principal_queixa" DROP NOT NULL,
ALTER COLUMN "email_contato" DROP NOT NULL;
