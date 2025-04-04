import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from './JwtMiddleware.js'; // Шлях до твого middleware

import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { BooksController } from './book.controller';

const rabbitMqUrl = process.env.BROKER_URI;
const userQueue = process.env.USER_SERVICE_QUEUE;
const bookQueue = process.env.BOOK_SERVICE_QUEUE;  // Нова черга

if (!rabbitMqUrl || !userQueue || !bookQueue) {
  throw new Error('BROKER_URI, USER_SERVICE_QUEUE або BOOK_SERVICE_QUEUE не визначено у змінних середовища');
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqUrl],
          queue: userQueue,
          queueOptions: { durable: false },
        },
      },
      {
        name: 'BOOK_SERVICE',  // Додаємо book-service
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqUrl],
          queue: bookQueue,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [UsersController, BooksController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        { path: 'books', method: RequestMethod.POST }, // ✅ тільки для POST /books
        { path: 'books/:id', method: RequestMethod.PUT }, // ✅ тільки для PUT /books/:id
      );
  }
}

