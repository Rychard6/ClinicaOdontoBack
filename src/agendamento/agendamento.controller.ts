import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';

@Controller('agendamento')
export class AgendamentoController {
    constructor(private readonly agendamentoService: AgendamentoService) {}

    @Post()
    async criarAgendamento(@Body() dadosAgendamento: {
      usuarioId: number;
      especialidade: string;
      data: string;
      dentistaId: number;
      descricao: string;
      status: "PENDENTE" | "CONCLUIDA" | "CANCELADA";
      horario: string;
    }) {
      return await this.agendamentoService.criarAgendamento(dadosAgendamento);
    }

    @Get('horarios-indisponiveis')
    async obterHorariosIndisponiveis(
      @Query('date') data: string,
      @Query('dentistaId') dentistaId: number,
    ) {
      if (!data || !dentistaId) {
        throw new BadRequestException('Data e ID do dentista são obrigatórios.');
      }
      return await this.agendamentoService.obterHorariosIndisponiveis(data, +dentistaId);
    }

    @Get('consultas')
    async listarTodasConsultas() {
    return await this.agendamentoService.listarTodasConsultas();
    }

}
