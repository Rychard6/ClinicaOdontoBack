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
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';


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
}