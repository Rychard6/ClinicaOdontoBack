import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10); // Criptografa a senha
    return this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senha: hashedPassword,
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}