import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module'; // Importa o módulo de usuários
import { PrismaService } from './prisma.service'; // Importa o serviço do Prisma para injetá-lo nos módulos
import { AgendamentoModule } from './agendamento/agendamento.module';
import { DentistasModule } from './dentistas/dentistas.module';
import { ConsultasModule } from './consultas/consultas.module';
import { TriagemModule } from './triagem/triagem.module';

@Module({
  imports: [UsuariosModule, AgendamentoModule, DentistasModule, ConsultasModule, TriagemModule], // Adicione todos os módulos da aplicação
  controllers: [AppController], // Controladores globais (se necessário)
  providers: [AppService, PrismaService], // Adicione PrismaService aqui para que seja acessível a todos os módulos
})
export class AppModule {}
