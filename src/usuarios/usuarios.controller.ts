import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Papel } from '@prisma/client';


@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

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

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    try {
      const { access_token, user } = await this.usuariosService.validateUser(
        body.email,
        body.senha,
      );
      return {
        message: 'Login realizado com sucesso.',
        token: access_token, // Retorna o token JWT
        user, // Informações básicas do usuário
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  async findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
async findOne(@Param('id') id: string) {
  try {
    const user = await this.usuariosService.findOne(Number(id));
    return user;
  } catch (error) {
    throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);
  }
}

//update
@Patch(':id')
async update(
  @Param('id') id: string,
  @Body() updateUsuarioDto: UpdateUsuarioDto,
) {
  try {
    const updatedUser = await this.usuariosService.update(Number(id), updateUsuarioDto);
    return {
      message: 'Usuário atualizado com sucesso!',
      data: updatedUser,
    };
  } catch (error) {
    throw new HttpException(
      error.message || 'Erro ao atualizar usuário.',
      error.status || HttpStatus.BAD_REQUEST,
    );
  }
}

//papelatt
@Patch(':id/papel')
  updatePapel(@Param('id') id: string, @Body('papel') papel: Papel) {
    return this.usuariosService.updateRole(+id, papel);
  }
}