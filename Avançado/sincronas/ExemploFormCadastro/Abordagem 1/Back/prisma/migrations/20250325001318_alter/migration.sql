-- AlterTable
ALTER TABLE "Profissional" ALTER COLUMN "matricula_profissional" DROP NOT NULL,
ALTER COLUMN "especialidade" DROP NOT NULL,
ALTER COLUMN "quant_atend_gratis" DROP NOT NULL,
ALTER COLUMN "cidade" DROP NOT NULL,
ALTER COLUMN "estado" DROP NOT NULL,
ALTER COLUMN "genero" DROP NOT NULL,
ALTER COLUMN "idade" DROP NOT NULL,
ALTER COLUMN "valor" DROP NOT NULL;
