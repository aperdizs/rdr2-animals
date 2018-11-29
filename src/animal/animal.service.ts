import { UpdateAnimalDto } from './dto/update-animal.dto';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { AnimalDto } from './dto/animal.dto';
import { NotFoundException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAnimal } from './animal.interface';

import { animals } from 'data/animals';


const logger = require('logger');


@Injectable()
export class AnimalService implements OnModuleInit {

  constructor(@InjectModel('Animal') private readonly animalModel: Model<IAnimal>) {}

  onModuleInit() {
    animals.forEach(async (animal) => {
      delete animal.id;
      const createdAnimal = new this.animalModel(animal);
      const exist = await this.animalModel.findOne({name: createdAnimal.name})
      if (!exist) {
        createdAnimal.save();
        console.log(`>>> ${createdAnimal.name} created`);
      }
    });
  }

  async create(createAnimalDto: CreateAnimalDto): Promise<AnimalDto> {
    const createdAnimal = new this.animalModel(createAnimalDto);
    return await createdAnimal.save();
  }

  async findAll(): Promise<[AnimalDto[], number]> {
    logger.info('Finding all animal');
    return await this.animalModel.find().exec();
  }

  async findById(id: number): Promise<AnimalDto> {
    logger.info('Finding animal with id ', id);
    return await this.animalModel.findOne({ _id: id }).exec();
  }

  async update(id: number, body: UpdateAnimalDto): Promise<AnimalDto> {
    logger.info('Updating animal with id', id);
    const animal = this.animalModel.findOne({ _id: id });
    if (!animal) {
      throw new NotFoundException(`Animal not found with id ${id}`);
    }
    return await this.animalModel.findOneAndUpdate({ _id: id }, {$set: body});
  }

  async remove(id: string): Promise<boolean> {
    logger.info('Removing animal with id', id);
    await this.animalModel.remove({_id: id});
    return true;
  }
}
