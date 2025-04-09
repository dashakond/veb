import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './book.model';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book) private bookModel: typeof Book) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return this.bookModel.create(createBookDto); 
  }

  async findAll(filter?: { genre?: string; author?: string; year?: number }): Promise<Book[]> {
    const whereClause: any = {};
    if (filter?.genre) whereClause.genre = filter.genre;
    if (filter?.author) whereClause.author = filter.author;
    if (filter?.year) whereClause.year = filter.year;

    return this.bookModel.findAll({ where: whereClause });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new NotFoundException('Книга не знайдена');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const [affectedCount, updatedBooks] = await this.bookModel.update(updateBookDto, {
      where: { id }, // фільтруємо по ID
      returning: true, // щоб отримати оновлені дані після оновлення
    });
    
    if (affectedCount === 0) {
      throw new NotFoundException('Книга не знайдена');
    }
  
    return updatedBooks[0]; // Повертаємо перший оновлений запис
  }
  
}
