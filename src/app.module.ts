import { AuthModule } from './auth/auth.module';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from 'animals/animal.module';
import {join} from "path";
import * as passport from 'passport';



@Module({
  imports: [
    AnimalsModule,
    AuthModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
