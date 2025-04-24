import { Module } from '@nestjs/common';
import { ReadingProgressController } from './reading-progress/reading-progress.controller';
import { ReadingProgressService } from './reading-progress/reading-progress.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReadingProgress } from './reading-progress/reading-progress.model';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'nesr_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres', // замініть на свої налаштування
      database: 'nest-course', // ваша база даних
      models: [ReadingProgress],
      autoLoadModels: true,
      synchronize: true, // в реальному середовищі бажано вимкнути
    }),
    SequelizeModule.forFeature([ReadingProgress]),
  ],
  controllers: [ReadingProgressController],
  providers: [
    ReadingProgressService,
    {
      provide: 'USER_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@rabbitmq:5672'],
            queue: 'user-service',
            queueOptions: {
              durable: false, // Додано параметр durable для забезпечення стійкості черги
            }, // Черга для перевірки користувачів
          },
        });
      },
    },
    {
      provide: 'BOOK_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@rabbitmq:5672'],
            queue: 'book_queue', // Черга для перевірки книг
          },
        });
      },
    },
  ],
})
export class AppModule {}
