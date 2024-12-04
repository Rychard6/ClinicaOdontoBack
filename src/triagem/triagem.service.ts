import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTriagemDto } from './dto/create-triagem.dto';
import { Prisma, Prioridade, Triagem } from '@prisma/client';

@Injectable()
export class TriagemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTriagemDto: CreateTriagemDto) {
    try {
      const data: Prisma.TriagemCreateInput = {
        usuario: { connect: { id: createTriagemDto.usuarioId } },
        descricao: createTriagemDto.descricao,
        prioridade: createTriagemDto.prioridade as Prioridade,
        alergias: createTriagemDto.alergias,
        condicoesMedicas: createTriagemDto.condicoesMedicas,
        dor: createTriagemDto.dor,
        frequenciaHigieneBucal: createTriagemDto.frequenciaHigieneBucal,
        fumante: createTriagemDto.fumante,
        genero: createTriagemDto.genero,
        idade: createTriagemDto.idade,
        medicacaoEmUso: createTriagemDto.medicacaoEmUso,
        queixa: createTriagemDto.queixa,
        ultimaVisita: createTriagemDto.ultimaVisita,
      };
  
      return this.prisma.triagem.create({ data });
    } catch (error) {
      console.error('Erro ao criar triagem:', error); // Log completo do erro
      throw error;
    }
  }
  

  async findAll() {
    return this.prisma.triagem.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.triagem.findUnique({
      where: { id },
      include: {
        usuario: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.triagem.delete({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.TriagemUpdateInput): Promise<Triagem> {
    return this.prisma.triagem.update({
      where: { id },
      data,
    });
  }


  async findByUsuarioId(usuarioId: number) {
    return this.prisma.triagem.findMany({
      where: {
        usuarioId: usuarioId, // Ou apenas `usuarioId` para abreviar, já que a chave e o valor têm o mesmo nome
      },
      include: {
        usuario: true,
      },
    });
  }
  
  
}