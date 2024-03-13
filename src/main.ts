import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './lib/AllExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  //
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Set Global Middlewares
  app.enableCors();
  app.useBodyParser('json', { limit: '50mb' });


  // Set Global Filters
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  
  // Set Global Prefix
  app.setGlobalPrefix('api');

  // Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )


  const options = new DocumentBuilder()
    .setTitle('Warehouse')
    .setDescription('this is v1')
    .setVersion('1.0.0')
    .addTag('Auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, () => {
    console.log(`Swagger: http://localhost:${3000}/docs`);
  });


}
bootstrap();
