import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Repository } from 'typeorm';
import { Persona } from './entities/persona.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PersonasService {

  constructor(
    @Inject('KAFKA_SERVICE') 
    private readonly kafkaClient: ClientKafka,

    @InjectRepository(Persona)
    private personaRepository: Repository<Persona>,
  ) {}

  async onModuleInit() {
    this.kafkaClient.subscribeToResponseOf('persona.enviada');
    await this.kafkaClient.connect();
  }

  async create(createPersonaDto: CreatePersonaDto) {
    const ciExiste = await this.personaRepository.findOne({
      where: {
        carnetIdentidad: createPersonaDto.carnetIdentidad,
      },
    });
    if (ciExiste) {
      return {statusCode: 409, message: `El numero de documento ${createPersonaDto.carnetIdentidad} ya existe`, persona: null};
    }
    try {
      const persona = await this.personaRepository.create({
        ...createPersonaDto,
        estado: true,
      });
      const nuevapersona = await this.personaRepository.save(persona);
      // await this.kafkaClient.emit('persona.nueva.registrada', JSON.stringify(nuevapersona));
      return nuevapersona;
    } catch (error) {
      throw new BadRequestException('Error al crear el persona');
    }
  }

  async findAll() {
    try {
      const personas = await this.personaRepository.find({
        order: { id: 'DESC' },
        // where: { estado: true },
      });
      return personas;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      const persona = await this.personaRepository.findOneBy({id: id});
      if (!persona) {
        throw new NotFoundException(`El persona con id ${id} no existe`);
      }
      return persona;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    // Buscar la persona específica por ID
    const persona = await this.personaRepository.findOne({
      where: { id },
    });
    if (!persona) {
      throw new BadRequestException('No existe persona');
    }

    try {
      // Actualizar la persona con el nuevo DTO
      const updatedPersona = Object.assign(persona, updatePersonaDto);
      // updatedPersona.fechaNacimiento = new Date(updatePersonaDto.fechaNacimiento);
      return await this.personaRepository.save(updatedPersona);
    } catch (error) {
      throw new BadRequestException('Error al actualizar la persona');
    }
  }

  async remove(id: number) {
    const persona = await this.personaRepository.findOne({ where: { id } });
    if (!persona) {
      throw new BadRequestException('Persona no existe');
    }
    try {
      await this.personaRepository.update(id, { estado: false });
      return persona;
    } catch (error) {
      throw new BadRequestException('Error al eliminar persona');
    }
  }

  async personaPost(createPersonaDto: CreatePersonaDto): Promise<any> {
    const mensaje = await this.kafkaClient.emit('persona.enviada', createPersonaDto);
    return mensaje;
  }
}
