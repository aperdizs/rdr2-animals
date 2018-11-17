import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PaginationDto } from "common/dto/pagination.dto";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { AnimalDto } from './dto/animal.dto';
import { NotFoundException, BadRequestException, Injectable } from '@nestjs/common';

import { animals } from 'data/animals';

const logger = require('logger');



const nextId = function*() {
  let i = animals.length;
  for(;;) {
    yield ++i;
  }
}();

@Injectable()
export class AnimalService {

  animals: AnimalDto[];

  constructor() {
    this.animals = animals;
  }

  async findAll(pagination: PaginationDto, filters: any): Promise<[AnimalDto[], number]> {
    logger.info('Finding all animals');
    let animals = this.animals;
    if (filters && filters.type) {
      animals = animals.filter(a => a.type.toLowerCase() === filters.type.toLowerCase());
    }
    const page = animals.slice((pagination.pageNumber - 1) * pagination.pageSize, pagination.pageNumber * pagination.pageSize)
    return [page, animals.length];
  }

  async findById(id: number): Promise<AnimalDto> {
    logger.info('Finding animal with id ', id);
    const data = this.animals.find((animal) => animal.id === id);
    if (!data) {
      throw new NotFoundException(`Animal not found with id ${id}`);
    }
    return data;
  }

  async create(body: CreateAnimalDto): Promise<AnimalDto> {
    logger.info('Creating new animal');
    const exist = this.animals.some((animal) => animal.name.toLocaleLowerCase() === body.name.toLocaleLowerCase());
    if (exist) {
      throw new BadRequestException(`Name duplicated`);
    }
    const animal = new AnimalDto(nextId.next().value, body);
    this.animals.push(animal);
    return animal;
  }

  async update(id: number, body: UpdateAnimalDto): Promise<AnimalDto> {
    logger.info('Updating animal with id', id);

    const exist = this.animals.find((animal) => animal.id === id);
    if (!exist) {
      throw new NotFoundException(`Animal not found with id ${id}`);
    }

    const {name, size, img, type, description} = body; 
    Object.assign(exist, {name, size, img, type, description});
    

    return exist;

  }

  async remove(id: number): Promise<AnimalDto> {
    logger.info('Removing animal with id', id);

    const index = this.animals.findIndex((animal) => animal.id === id);
    if (index === -1) {
      throw new NotFoundException(`Animal not found with id ${id}`);
    }

    return this.animals.splice(index, 1)[0];
  }
}
