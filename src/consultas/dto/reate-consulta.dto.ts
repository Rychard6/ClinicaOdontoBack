// src/consultas/dto/create-consulta.dto.ts
export class CreateConsultaDto {
    readonly data: string;
    readonly status: string;
    readonly usuarioId: number;
    readonly dentistaId: number;
    readonly especialidade: string;
    readonly descricao?: string;
    readonly horario: string;
  }