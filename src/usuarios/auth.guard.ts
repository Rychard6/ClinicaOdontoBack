import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);



    if (!token) {
      throw new UnauthorizedException('Token não encontrado.');
    }

    try {
      const payload = this.jwtService.verify(token, { secret: 'MINHA_SECRET_KEY' });
      console.log('Token recebido:', token);
      console.log('Payload do token:', payload);
      request.user = payload; // Anexa os dados do token à requisição
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}