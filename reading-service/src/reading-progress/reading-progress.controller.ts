import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReadingProgressService } from './reading-progress.service';
import { CreateReadingProgressDto, UpdateReadingProgressDto } from './reading-progress.dto';

@Controller()
export class ReadingProgressController {
  constructor(private readonly readingProgressService: ReadingProgressService) {}

  // Створення нового прогресу читання
  @MessagePattern({ cmd: 'create_progress' })
  async create(@Payload() createReadingProgressDto: CreateReadingProgressDto) {
    return this.readingProgressService.createProgress(createReadingProgressDto);
  }

  // Отримання прогресу читання для користувача
  @MessagePattern({ cmd: 'get_user_progress' })
  async getReadingProgress(@Payload() userId: string) {
    return this.readingProgressService.getReadingProgressForUser(userId);
  }

  // Оновлення прогресу читання
  @MessagePattern({ cmd: 'update_progress' })
  async update(@Payload() payload: { id: string; update: UpdateReadingProgressDto }) {
    const { id, update } = payload;
    return this.readingProgressService.updateReadingProgress(id, update);
  }
}
