import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { Book } from './books/book.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'nesr_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest-course',
      autoLoadModels: true,
      synchronize: true,
      models: [Book],
    }),
    SequelizeModule.forFeature([Book]),
    BooksModule,
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class AppModule {}
