import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';

async function bootstrap() {
  const port = process.env.PORT || 4001;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const options = new DocumentBuilder()
    .setTitle('Basic service')
    .setDescription('Basic api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  await writeFile('./doc/api.yaml', JSON.stringify(document));
  SwaggerModule.setup('/doc', app, document);

  await app.listen(port);
  console.log('Server listen port: ', port);
}

bootstrap();
