export class Agendamento {
    id: number;
    usuarioId: number;
    especialidade: string;
    data: Date; // Contém a data e horário da consulta
    status: string; // Pode ser "ativo", "cancelado", etc.
  }
  