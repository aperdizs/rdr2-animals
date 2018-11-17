import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { PaginationMiddleware } from 'common/middlewares/pagination.middleware';

@Module({
  controllers: [
    AnimalController
  ],
  providers: [
    AnimalService
  ]
})
export class AnimalsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes(
        { path: '/api/v1/animal*', method: RequestMethod.GET }
      );
  }
}
