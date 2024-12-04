// src/consultas/entities/consulta.entity.ts
export class Consulta {
    id: number;
    data: Date;
    status: string;
    usuarioId: number;
    dentistaId: number;
    especialidade: string;
    descricao?: string;
    horario: string;
  }