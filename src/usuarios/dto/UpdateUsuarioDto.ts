// src/usuarios/dto/update-usuario.dto.ts
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nome?: string;

  @IsOptional()
  @IsString()
  telefone?: string;
}
