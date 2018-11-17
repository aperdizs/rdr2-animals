import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Red Dead Redemption 2 | Animals API')
    .setDescription(`<div style="text-align: center"><img style="height: 150px;" src="https://emtstatic.com/2016/10/img_agarcial_20161018-170927_imagenes_lv_terceros_rdr2-kErB-U411098845687aDD-992x558@LaVanguardia-Web.jpg"> <img style="margin-left: 50px; height: 150px" src="https://pbs.twimg.com/profile_images/1030268899303063552/qrZg5nRM_400x400.jpg"/></div>`)
    .setVersion('1.0')
    .addBearerAuth('Authorization', 'header')
    .setHost('localhost:3000')
    .addTag('Animal')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);


  await app.listen(3000);
}
bootstrap();
