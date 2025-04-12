import { Injectable } from '@nestjs/common';
import { CreateReadingProgressDto, UpdateReadingProgressDto } from './reading-progress.dto';
import { ReadingProgress } from './reading-progress.model'; // Sequelize модель прогресу читання

@Injectable()
export class ReadingProgressService {
  // Створення нового запису прогресу читання
  async createProgress(createReadingProgressDto: CreateReadingProgressDto) {
    const { user_id, book_id, current_page, percentage_read } = createReadingProgressDto;

    // Створюємо новий запис прогресу без перевірок
    const readingProgress = await ReadingProgress.create({
      user_id,
      book_id,
      current_page,
      percentage_read,
    } as ReadingProgress);  // Типізуємо явно як ReadingProgress

    return readingProgress;
  }

  // Отримання прогресу читання для конкретного користувача
  async getReadingProgressForUser(userId: string) {
    const progress = await ReadingProgress.findAll({ where: { user_id: userId } });
    return progress;
  }

  // Оновлення прогресу читання
  async updateReadingProgress(id: string, updateReadingProgressDto: UpdateReadingProgressDto) {
    const { current_page, percentage_read } = updateReadingProgressDto;
    const progress = await ReadingProgress.findByPk(id);

    if (!progress) {
      throw new Error('Reading progress not found');
    }

    progress.current_page = current_page;
    progress.percentage_read = percentage_read;
    await progress.save();

    return progress;
  }
}
