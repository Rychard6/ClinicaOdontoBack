import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DentistasService } from './dentistas.service';
import { CreateDentistaDto } from './dto/create-dentista.dto';

@Controller('dentistas')
export class DentistasController {
  constructor(private readonly dentistasService: DentistasService) {}

  @Post()
  create(@Body() createDentistaDto: CreateDentistaDto) {
    return this.dentistasService.create(createDentistaDto);
  }

  @Get()
  findAll() {
    return this.dentistasService.findAll();
  }

  @Get('nomes')
  findAllNames() {
    return this.dentistasService.findAllNames();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dentistasService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dentistasService.remove(+id);
  }
}