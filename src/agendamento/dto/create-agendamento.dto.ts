
import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateAgendamentoDto {
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsNotEmpty()
  especialidade: string;

  @IsDateString()
  @IsNotEmpty()
  data: string; // ISO 8601 format

  @IsInt()
  @IsNotEmpty()
  dentistaId: number;

  @IsString()
  descricao: string; // Opcional, se necessário para o agendamento
}
