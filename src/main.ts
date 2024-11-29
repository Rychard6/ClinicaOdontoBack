import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita o CORS para permitir requisições do frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Permite requisições do frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Se for necessário enviar cookies ou credenciais
  });

  await app.listen(3001);
}
bootstrap();
