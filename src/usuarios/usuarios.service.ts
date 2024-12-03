import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // Adicionado
  ) {}

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('ID inválido.');
    }
  
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        consultas: {
          include: {
            dentista: true,
          },
        },
      },
    });
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  
    return {
      id: user.id,
      name: user.nome,
      email: user.email,
      phone: user.telefone || null,
      registrationDate: user.criadoEm.toISOString(),
      upcomingAppointments: user.consultas?.filter(consulta => consulta.status === 'PENDENTE').map(consulta => ({
        date: consulta.data,
        time: consulta.data ? new Date(consulta.data).toLocaleTimeString() : null,
        specialty: consulta.descricao,
        notes: consulta.status,
      })) || [],
      pastAppointments: user.consultas?.filter(consulta => consulta.status === 'CONCLUIDA').map(consulta => ({
        date: consulta.data,
        specialty: consulta.descricao,
      })) || [],
    };
  }
  
  
  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    return this.prisma.usuario.create({
      data: {
        nome: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senha: hashedPassword,
      },
    });
  }

  async validateUser(email: string, senha: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha incorretos.');
    }

    // Gera um token JWT para o usuário autenticado
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}