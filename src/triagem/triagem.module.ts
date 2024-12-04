import { Module } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { TriagemController } from './triagem.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TriagemController],
  providers: [TriagemService, PrismaService],
})
export class TriagemModule {}