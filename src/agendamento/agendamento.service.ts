import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AgendamentoService {
  constructor(private prisma: PrismaService) {}

  async criarAgendamento(dadosAgendamento: {
    usuarioId: number;
    especialidade: string;
    data: string;
    dentistaId: number;
    descricao: string;
    status: "PENDENTE" | "CONCLUIDA" | "CANCELADA";
    horario: string;
  }) {
    // Validar se já existe um agendamento no mesmo dia, horário e dentista
    const consultaExistente = await this.prisma.consulta.findFirst({
      where: {
        data: new Date(dadosAgendamento.data),
        dentistaId: dadosAgendamento.dentistaId,
        horario: dadosAgendamento.horario,
      },
    });

    if (consultaExistente) {
      throw new BadRequestException(
        "Já existe uma consulta para este dentista na data e horário especificados."
      );
    }

    // Criar agendamento no banco
    return await this.prisma.consulta.create({
      data: {
        usuarioId: dadosAgendamento.usuarioId,
        especialidade: dadosAgendamento.especialidade,
        data: new Date(dadosAgendamento.data),
        dentistaId: dadosAgendamento.dentistaId,
        descricao: dadosAgendamento.descricao,
        status: dadosAgendamento.status,
        horario: dadosAgendamento.horario,
      },
    });
  }

  async obterHorariosIndisponiveis(data: string, dentistaId: number) {
    const agendamentos = await this.prisma.consulta.findMany({
      where: {
        data: new Date(data),
        dentistaId,
      },
      select: {
        horario: true,
      },
    });

    return agendamentos.map((agendamento) => agendamento.horario);
  }

  async listarTodasConsultas() {
    return await this.prisma.consulta.findMany();
  }
}
