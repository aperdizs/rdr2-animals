import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { AnimalService } from './animal.service';
import { AnimalResponseDto } from './dto/animal-response.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

const logger = require('logger');

@ApiUseTags('Animal')
@Controller('api/v1/animals')
export class AnimalController {

  constructor(private readonly animalService: AnimalService) {}

  @Post()
  @ApiOperation({
    title: 'Create Animal', description: `
    Create Animal
  `, operationId: 'Create',
  })
  @ApiResponse({ status: 200, description: 'Animal have been successfully created', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async create(@Body() createAnimalDto: CreateAnimalDto) {
    logger.info('Creating animal');
    return await this.animalService.create(createAnimalDto);
  }

  @Get()
  @ApiOperation({
    title: 'Get all animal', description: `
    Get all animals
  `, operationId: 'GetAll',
  })
  @ApiResponse({ status: 200, description: 'Animals have been successfully returned', isArray: false, type: AnimalResponseDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async findAll() {
    logger.info('Getting all animal');
    const data = await this.animalService.findAll();
    return { data };
  }

  @Get('/:id')
  @ApiOperation({
    title: 'Get animal by id', description: `
    Get animal by id
  `, operationId: 'GetById',
  })
  @ApiImplicitParam({ name: 'id', description: 'Id of the animal', type: String, required: true })
  @ApiResponse({ status: 200, description: 'Animals have been successfully returned', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async findOne(@Param('id') id: number) {

    logger.info('Getting animal by id', id);
    const data = await this.animalService.findById(id);

    return data;
  }

  @Put('/:id')
  @ApiOperation({
    title: 'Update Animal', description: `
    Update Animal
  `, operationId: 'Update',
  })
  @ApiImplicitParam({ name: 'id', description: 'Id of the animal', type: String, required: true })
  @ApiResponse({ status: 200, description: 'Animal have been successfully update', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async update(@Param('id') id: number, @Body() updateAnimalDto: UpdateAnimalDto) {

    logger.info('Updating animal with id', id);
    const data = await this.animalService.update(id, updateAnimalDto)

    return data;
  }

  @Delete('/:id')
  @ApiOperation({
    title: 'Remove Animal', description: `
    Remove Animal
  `, operationId: 'Remove',
  })
  @ApiImplicitParam({ name: 'id', description: 'Id of the animal', type: String, required: true })
  @ApiResponse({ status: 204, description: 'No content' })
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    logger.info('Deleting animal with id', id);
    return await this.animalService.remove(id);
  }

}
