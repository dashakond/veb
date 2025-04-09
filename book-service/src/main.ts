import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Перевірка наявності необхідних змінних середовища
  const rabbitMqUrl = process.env.BROKER_URI;
  const bookQueue = process.env.BOOK_SERVICE_QUEUE;

  if (!rabbitMqUrl || !bookQueue) {
    console.error('BROKER_URI або BOOK_SERVICE_QUEUE не знайдено в змінних середовища');
    process.exit(1); // Завершуємо процес, якщо змінні середовища відсутні
  }

  // Підключення до мікросервісу через RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUrl],
      queue: bookQueue,
      queueOptions: { durable: false },
    },
  });

  // Запуск мікросервісу та основного сервера
  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3001);

  console.log(`Book service running on port ${process.env.PORT || 3001}`);
}

bootstrap();
