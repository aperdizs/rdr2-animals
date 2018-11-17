import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { PaginationDto } from 'common/dto/pagination.dto';
import { Controller, Req, Get, ParseIntPipe, Param, Post, Body, Put, Delete, Query } from "@nestjs/common";
import { ApiUseTags, ApiResponse, ApiBearerAuth, ApiImplicitQuery, ApiOperation, ApiImplicitParam, ApiImplicitBody } from '@nestjs/swagger';
import { Pagination } from "common/decorators/pagination.decorator";
import { AnimalService } from './animal.service';
import { AnimalResponseDto } from './dto/animal-response.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

const logger = require('logger');

@ApiUseTags('Animal')
@Controller('api/v1/animal')
export class AnimalController {

  constructor(private readonly animalService: AnimalService) {}

  @Get()
  @ApiOperation({
    title: 'Get all animals', description: `
    Get all animals
  `, operationId: 'GetAll'
  })
  @ApiResponse({ status: 200, description: 'Animals have been successfully returned', isArray: false, type: AnimalResponseDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  @ApiImplicitQuery({ name: 'page[size]', description: 'Page size. Default 10', type: String, required: false })
  @ApiImplicitQuery({ name: 'page[number]', description: 'Page number', type: String, required: false })
  @ApiImplicitQuery({ name: 'type', description: 'Filter by type', type: String, required: false })
  async findAll(@Pagination() pagination: PaginationDto, @Query('type') type: string) {

    logger.info('Getting all animals');
    const data = await this.animalService.findAll(pagination, { type });
    
    return new AnimalResponseDto(data[0], data[1], pagination);
  }

  @Get('/:id')
  @ApiOperation({
    title: 'Get animal by id', description: `
    Get animal by id
  `, operationId: 'GetById'
  })
  @ApiImplicitParam({ name: 'id', description: 'Id of the animal', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Animals have been successfully returned', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {

    logger.info('Getting animal by id', id);
    const data = await this.animalService.findById(id);
    
    return data;
  }


  @Post()
  @ApiOperation({
    title: 'Create Animal', description: `
    Create Animal
  `, operationId: 'Create'
  })
  
  @ApiResponse({ status: 200, description: 'Animal have been successfully created', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async create(@Body() createAnimalDto: CreateAnimalDto) {

    logger.info('Creating animal');
    const data = await this.animalService.create(createAnimalDto)
    
    return data;
  }

  @Put('/:id')
  @ApiOperation({
    title: 'Update Animal', description: `
    Update Animal
  `, operationId: 'Update'
  })  
  @ApiImplicitParam({ name: 'id', description: 'Id of the animal', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Animal have been successfully update', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateAnimalDto: UpdateAnimalDto) {

    logger.info('Updating animal with id', id);
    const data = await this.animalService.update(id, updateAnimalDto)
    
    return data;
  }

  @Delete('/:id')
  @ApiOperation({
    title: 'Remove Animal', description: `
    Remove Animal
  `, operationId: 'Remove'
  })  
  @ApiImplicitParam({ name: 'id', description: 'Id of the animal', type: Number, required: true })
  @ApiResponse({ status: 200, description: 'Animal have been successfully deleted', isArray: false, type: AnimalDto })
  @ApiResponse({ status: 403, description: 'Not authorized.' })
  @ApiResponse({ status: 404, description: 'Animal not found' })
  @ApiResponse({ status: 401, description: 'Not authenticated.' })
  async delete(@Param('id', new ParseIntPipe()) id: number) {

    logger.info('Deleting animal with id', id);
    const data = await this.animalService.remove(id);
    
    return data;
  }

}
