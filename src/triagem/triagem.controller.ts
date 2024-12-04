import { Controller, Get, Post, Body, Param, Delete, Patch, Put } from '@nestjs/common';
import { TriagemService } from './triagem.service';
import { CreateTriagemDto } from './dto/create-triagem.dto';
import { UpdateTriagemDto } from './dto/update-triagem.dto';
import { Triagem as TriagemModel } from '@prisma/client';

@Controller('triagem')
export class TriagemController {
  constructor(private readonly triagemService: TriagemService) {}

  @Post()
  create(@Body() createTriagemDto: CreateTriagemDto) {
    return this.triagemService.create(createTriagemDto);
  }

  @Get('usuario/:usuarioId')
  async findByUsuarioId(@Param('usuarioId') usuarioId: string) {
    return this.triagemService.findByUsuarioId(Number(usuarioId)); // Converte para número
  }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.triagemService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.triagemService.remove(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTriagemDto: UpdateTriagemDto): Promise<TriagemModel> {
    return this.triagemService.update(Number(id), updateTriagemDto);
  }

}