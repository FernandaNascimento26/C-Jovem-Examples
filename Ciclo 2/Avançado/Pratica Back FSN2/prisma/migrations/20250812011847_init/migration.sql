-- AlterTable
CREATE SEQUENCE "public".aluno_id_aluno_seq;
ALTER TABLE "public"."aluno" ALTER COLUMN "id_aluno" SET DEFAULT nextval('"public".aluno_id_aluno_seq');
ALTER SEQUENCE "public".aluno_id_aluno_seq OWNED BY "public"."aluno"."id_aluno";
