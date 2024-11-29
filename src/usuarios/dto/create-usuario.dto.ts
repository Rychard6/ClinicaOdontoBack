import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
