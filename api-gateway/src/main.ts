import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Transport, MicroserviceOptions } from "@nestjs/microservices";
import * as dotenv from "dotenv";

dotenv.config();

async function start() {
    const app = await NestFactory.create(AppModule);

    const rabbitMqUrl = process.env.RABBITMQ_URL; 
    const rabbitMqQueue = process.env.RABBITMQ_QUEUE;

    if (!rabbitMqUrl || !rabbitMqQueue) {
        throw new Error("RABBITMQ_URL або RABBITMQ_QUEUE не визначено у змінних середовища");
    }

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [rabbitMqUrl], // Масив містить тільки string
            queue: rabbitMqQueue,
            queueOptions: {
                durable: false,
            },
        },
    });

    await app.startAllMicroservices();
    await app.listen(process.env.PORT || 5000);
    console.log(`Server started on port ${process.env.PORT || 5000}`);
}

start();
