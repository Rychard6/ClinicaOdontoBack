import {
    Controller,
    Get,
    Patch,
    Body,
    Param,
    Query,
    BadRequestException,
  } from '@nestjs/common';
  import { ConsultasService } from './consultas.service';
  import { Status } from '@prisma/client';
  
  @Controller('consultas')
  export class ConsultasController {
    constructor(private consultasService: ConsultasService) {}
  
    @Get()
    async findAllByDate(@Query('date') date: string) {
      if (!date) {
        throw new BadRequestException('Data é obrigatória.');
      }
      return await this.consultasService.findAllByDate(date);
    }
  
    @Patch(':id/status')
    async updateStatus(
      @Param('id') id: string,
      @Body() updateData: { status: Status },
    ) {
      return await this.consultasService.updateStatus(+id, updateData.status);
    }
  }