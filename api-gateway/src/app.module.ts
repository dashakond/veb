import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';

const rabbitMqUrl = process.env.BROKER_URI;
const rabbitMqQueue = process.env.USER_SERVICE_QUEUE;

if (!rabbitMqUrl || !rabbitMqQueue) {
  throw new Error('BROKER_URI або USER_SERVICE_QUEUE не визначено у змінних середовища');
}

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitMqUrl], // Тепер це точно string[]
          queue: rabbitMqQueue,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class AppModule {}
