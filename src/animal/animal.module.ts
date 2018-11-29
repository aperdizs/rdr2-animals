import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalSchema } from './animal.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Animal', schema: AnimalSchema }, ])],
  controllers: [
    AnimalController,
  ],
  providers: [
    AnimalService,
  ],
})
export class AnimalsModule {
  public configure(consumer: MiddlewareConsumer) {}
}
