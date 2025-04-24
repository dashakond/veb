import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const brokerUri = 'amqp://guest:guest@rabbitmq:5672';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [brokerUri],
      queue: 'user-service',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(5000);
  console.log(`User-Service запущено на порті 5000`);
}

bootstrap();
