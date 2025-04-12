export class CreateReadingProgressDto {
    user_id: string;
    book_id: string;
    current_page: number;
    percentage_read: number;
  }
  
  export class UpdateReadingProgressDto {
    current_page: number;
    percentage_read: number;
  }
  