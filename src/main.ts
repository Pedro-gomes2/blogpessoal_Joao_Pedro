import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//configurar horario
process.env.TZ = '-03:00';
const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("João Pedro Oliveira","https://github.com/Pedro-gomes2","oliveira110965@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
//habilitar biblioteca validação
app.useGlobalPipes(new ValidationPipe());
// abre para recebr requisiçoes de outra origem
app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
