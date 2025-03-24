import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const brokerUri = process.env.BROKER_URI;
  if (!brokerUri) {
    throw new Error('BROKER_URI is not defined in the .env file');
  }

  // Налаштовуємо API Gateway як мікросервіс RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [brokerUri],
      queue: process.env.USER_SERVICE_QUEUE,
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`User-Service запущено на порті ${process.env.PORT}`);
}

bootstrap();
