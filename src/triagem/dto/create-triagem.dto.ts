// src/triagem/dto/create-triagem.dto.ts
import { Prioridade } from '@prisma/client';

export class CreateTriagemDto {
  readonly usuarioId: number;
  readonly descricao: string;
  readonly prioridade: Prioridade;
  readonly alergias: string;
  readonly condicoesMedicas: string;
  readonly dor: number;
  readonly frequenciaHigieneBucal: string;
  readonly fumante: boolean;
  readonly genero: string;
  readonly idade: number;
  readonly medicacaoEmUso: string;
  readonly queixa: string;
  readonly ultimaVisita?: Date;
}
