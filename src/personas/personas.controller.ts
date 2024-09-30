import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto) {
    return await this.personasService.create(createPersonaDto);
  }

  @Get()
  async findAll() {
    return await this.personasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.personasService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto) {
    return await this.personasService.update(+id, updatePersonaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.personasService.remove(+id);
  }

  @Post('enviar-persona')
  async personaPost(@Body() createPersonaDto: CreatePersonaDto): Promise<any> {
    const result = await this.personasService.personaPost(createPersonaDto);
    return result;
  }
}
