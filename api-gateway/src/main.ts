import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import * as dotenv from "dotenv";

dotenv.config();

async function start() {
    const app = await NestFactory.create(AppModule);

    const rabbitMqUrl = 'amqp://guest:guest@rabbitmq:5672';
    const rabbitMqQueue = 'user-service';
    

    if (!rabbitMqUrl || !rabbitMqQueue) {
        throw new Error("RABBITMQ_URL або RABBITMQ_QUEUE не визначено у змінних середовища");
    }

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@rabbitmq:5672'],
          queue: 'user-service',
          queueOptions: {
            durable: false,
          },
        },
      });

    await app.startAllMicroservices();
    await app.listen(8080); 
      console.log(`Server started on port 8080`);
}

start();
