import { Book } from '../book.model';


export declare type CreateBookDto = Omit<
  Book,
  'id' | 'createdAt' | 'updatedAt'
>;

// DTO для оновлення книги
export class UpdateBookDto {
  title?: string;
  author?: string;
  genre?: string;
  year?: number;
  description?: string;  
  file_url?: string;    
}
