import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService],
  imports: [
    TypeOrmModule.forFeature([Persona]),
  ],
})
export class PersonasModule {}
