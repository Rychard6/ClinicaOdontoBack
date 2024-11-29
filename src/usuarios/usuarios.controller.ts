import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('usuarios') // Define a rota base como /usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // Endpoint para criar um novo usuário
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    try {
      const newUser = await this.usuariosService.create(createUsuarioDto);
      return {
        message: 'Usuário criado com sucesso!',
        data: newUser,
      };
    } catch (error) {
      throw new HttpException(
        'Erro ao criar usuário. Verifique os dados enviados.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Endpoint para listar todos os usuários
  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  // Endpoint para buscar um usuário específico pelo ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usuariosService.findOne(Number(id));
    if (!user) {
      throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
