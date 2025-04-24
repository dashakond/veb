import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtMiddleware } from './JwtMiddleware.js'; // Шлях до твого middleware

import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';
import { BooksController } from './book.controller';
import { ReadingGatewayController } from './reading.controller.js';
import { RolesController } from './roles.controller.js';

const rabbitMqUrl = 'amqp://localhost';
const userQueue = 'user-service';
const bookQueue = 'book_queue';


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
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'user-service',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'READING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'reading_progress_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'book_queue',
          queueOptions: { durable: false },
        },
      },
    ])
  ],
  controllers: [UsersController, BooksController, ReadingGatewayController, RolesController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(
        //{ path: 'books', method: RequestMethod.POST }, // ✅ тільки для POST /books
        { path: 'books/:id', method: RequestMethod.PUT }, // ✅ тільки для PUT /books/:id
      );
  }
}

