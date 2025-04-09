import { Body, Controller, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern({ cmd: 'create_book' })
  async create(@Body() createBookDto: CreateBookDto) {
   return this.booksService.create(createBookDto);
     }

     @MessagePattern({ cmd: 'get_books' })
     async findAllBooks(@Payload() filters: { genre?: string; author?: string; year?: number }) {
       return this.booksService.findAll(filters);
     }


@MessagePattern({ cmd: 'get_book_by_id' })
async findOneBook(@Payload() payload: { id: number }) {
  return this.booksService.findOne(payload.id);
}


  @MessagePattern({ cmd: 'update_book' })
  async updateBook(@Payload() { id, updateBookDto }: { id: number, updateBookDto: UpdateBookDto }) {
    const updatedBook = await this.booksService.update(id, updateBookDto);
  
    if (!updatedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  
    return { message: 'Book updated successfully' };
  }
  
}
