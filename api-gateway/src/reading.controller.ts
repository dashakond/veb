import { Controller, Post, Body, HttpException, HttpStatus, Inject, Put, Param, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('reading-progress')
export class ReadingGatewayController {
  constructor(@Inject('READING_SERVICE') private readonly readingClient: ClientProxy) {}

  // Створення нового прогресу читання
  @Post()
  async create(@Body() data: any) {
    try {
      return await this.readingClient
        .send({ cmd: 'create_progress' }, data)
        .toPromise();
    } catch (err) {
      console.error('Create progress error:', err);
      throw new HttpException(err.message || 'Помилка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Отримання прогресу читання для користувача
  @Get(':userId')
  async getReadingProgress(@Param('userId') userId: string) {
    try {
      return await this.readingClient
        .send({ cmd: 'get_user_progress' }, userId)
        .toPromise();
    } catch (err) {
      console.error('Get reading progress error:', err);
      throw new HttpException(err.message || 'Помилка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Оновлення прогресу читання
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.readingClient
        .send({ cmd: 'update_progress' }, { id, update: data })
        .toPromise();
    } catch (err) {
      console.error('Update progress error:', err);
      throw new HttpException(err.message || 'Помилка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
