import { Prioridade, Prisma } from '@prisma/client';

export class UpdateTriagemDto implements Prisma.TriagemUpdateInput {
  descricao?: string;
  prioridade?: Prioridade;
  alergias?: string;
  condicoesMedicas?: string;
  dor?: number;
  frequenciaHigieneBucal?: string;
  fumante?: boolean;
  genero?: string;
  idade?: number;
  medicacaoEmUso?: string;
  queixa?: string;
  ultimaVisita?: string;
}