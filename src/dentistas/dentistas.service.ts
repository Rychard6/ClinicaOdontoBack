import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDentistaDto } from './dto/create-dentista.dto';
import { Dentista } from '@prisma/client';

@Injectable()
export class DentistasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDentistaDto: CreateDentistaDto): Promise<Dentista> {
    return this.prisma.dentista.create({
      data: createDentistaDto,
    });
  }

  async findAll(): Promise<Dentista[]> {
    return this.prisma.dentista.findMany({
      include: {
        consultas: true,
      },
    });
  }

  async findOne(id: number): Promise<Dentista> {
    return this.prisma.dentista.findUnique({
      where: { id },
      include: {
        consultas: true,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.dentista.delete({
      where: { id },
    });
  }

  async findAllNames(): Promise<string[]> {
    const dentistas = await this.prisma.dentista.findMany({
      select: { nome: true },
    });
    return dentistas.map(dentista => dentista.nome);
  }
}