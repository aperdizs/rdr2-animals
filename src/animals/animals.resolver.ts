import { AnimalService } from './animal.service';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { PaginationDto } from '../common/dto/pagination.dto';
import { AnimalFiltersDto } from './dto/animal-filters.dto';
import {AnimalResponseDto} from './dto/animal-response.dto';
import {CreateAnimalDto} from './dto/create-animal.dto';
import {AnimalDto} from './dto/animal.dto';
import {UpdateAnimalDto} from './dto/update-animal.dto';
import {ParseIntPipe, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuardGrapqhl } from 'common/graphql/auth-graphql.guard';

const logger = require('logger');

@Resolver('Animal')
@UseGuards(new AuthGuardGrapqhl())
export class AnimalsResolver {

  constructor(private readonly animalService: AnimalService){}

  @Query()
  async findAllAnimals(@Args('pagination') pagination: PaginationDto, @Args('filters') filters: AnimalFiltersDto): Promise<AnimalResponseDto> {

    logger.info('Getting all animals');

    const data = await this.animalService.findAll(pagination, filters);

    return new AnimalResponseDto(data[0], data[1], pagination);
  }

  @Query()
  async findOneAnimal(@Args('id', new ParseIntPipe()) id: number) {

    logger.info('Getting animal by id', id);

    return await this.animalService.findById(id);

  }

  @Mutation()
  async createAnimal(@Args('body') createAnimalDto: CreateAnimalDto): Promise<AnimalDto> {

    logger.info('Creating animal');

    return await this.animalService.create(createAnimalDto)

  }

  @Mutation()
  async updateAnimal(@Args('id', new ParseIntPipe()) id: number, @Args('body') updateAnimalDto: UpdateAnimalDto): Promise<AnimalDto> {

    logger.info('Updating animal with id', id);

    return await this.animalService.update(id, updateAnimalDto)

  }

  @Mutation()
  async deleteAnimal(@Args('id', new ParseIntPipe()) id: number): Promise<AnimalDto> {

    logger.info('Deleting animal with id', id);

    return await this.animalService.remove(id);

  }



}
