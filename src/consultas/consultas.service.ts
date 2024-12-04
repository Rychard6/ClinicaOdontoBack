import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Status } from '@prisma/client';

@Injectable()
export class ConsultasService {
  constructor(private prisma: PrismaService) {}

  async findAllByDate(date: string) {
    const parsedDate = new Date(date);
    return await this.prisma.consulta.findMany({
      where: {
        data: {
          gte: parsedDate,
          lt: new Date(parsedDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        usuario: true, // Inclui os dados do usuário associado
      },
    });
  }

  async updateStatus(id: number, status: Status) {
    const consulta = await this.prisma.consulta.findUnique({ where: { id } });
    if (!consulta) {
      throw new NotFoundException('Consulta não encontrada.');
    }

    return await this.prisma.consulta.update({
      where: { id },
      data: { status },
    });
  }
}