import { Module } from '@nestjs/common';
import { DentistasService } from './dentistas.service';
import { DentistasController } from './dentistas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DentistasController],
  providers: [DentistasService, PrismaService],
})
export class DentistasModule {}