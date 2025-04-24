import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  Param,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdminGuard } from './admin.guard'; // ОНОВИ ШЛЯХ при потребі

@Controller('books')
export class BooksController {
  constructor(@Inject('BOOK_SERVICE') private readonly bookService: ClientProxy) {}

  @Post()
  
  async create(@Body() createBookDto: any) {
    return this.bookService
      .send({ cmd: 'create_book' }, createBookDto)
      .toPromise();
  }

  @Get()
  async findAll(
    @Query('genre') genre?: string,
    @Query('author') author?: string,
    @Query('year') year?: string,
  ) {
    const filters: any = {
      ...(genre && { genre }),
      ...(author && { author }),
      ...(year && { year: +year }),
    };

    return this.bookService
      .send({ cmd: 'get_books' }, filters)
      .toPromise();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookService
      .send({ cmd: 'get_book_by_id' }, { id: +id })
      .toPromise();
  }

  @Put(':id')
  @UseGuards(AdminGuard) 
  async update(@Param('id') id: string, @Body() updateBookDto: any) {
    return this.bookService
    .send({ cmd: 'update_book' }, { id: +id, updateBookDto })
      .toPromise();
  }
}
