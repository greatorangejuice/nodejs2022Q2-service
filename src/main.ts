import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';

async function bootstrap() {
  const port = process.env.PORT || 4001;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // const swagger_doc = await readFile(
  //   join(dirname(__dirname), 'doc', 'api.yaml'),
  //   'utf-8',
  // );
  // const document = parse(swagger_doc);
  //
  // SwaggerModule.setup('doc', app, document);
  ////////////////////////////////////////////////////
  // const config = new DocumentBuilder()
  //   .setTitle('Basic service')
  //   .setDescription('The basic API description')
  //   .setVersion('1.0')
  //   .addTag('basic')
  //   .setBasePath('doc/api.yaml')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('doc', app, document);
  ///////////////////////////////////////////////////
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
