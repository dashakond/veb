import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdminGuard } from './admin.guard'; // ОНОВИ ШЛЯХ при потребі

@Controller('books')
export class BooksController {
  constructor(@Inject('BOOK_SERVICE') private readonly bookService: ClientProxy) {}

  @Post()
  @UseGuards(AdminGuard)
  async create(@Body() createBookDto: any) {
    return this.bookService
      .send({ cmd: 'create_book' }, createBookDto)
      .toPromise();
  }

  @Get()
  async findAll() {
    return this.bookService.send({ cmd: 'get_books' }, {}).toPromise();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService
      .send({ cmd: 'get_book_by_id' }, { id: +id })
      .toPromise();
  }

  @Put(':id')
  @UseGuards(AdminGuard) // Можна також захистити оновлення
  async update(@Param('id') id: string, @Body() updateBookDto: any) {
    return this.bookService
      .send({ cmd: 'update_book' }, { id: +id, ...updateBookDto })
      .toPromise();
  }
}
