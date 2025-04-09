import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Book extends Model<Book> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  author: string;

  @Column({ type: DataType.STRING, allowNull: false })
  genre: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  year: number;

  @Column({ type: DataType.TEXT, allowNull: true }) 
  description?: string;

  @Column({ type: DataType.STRING, allowNull: true }) 
  file_url?: string;
}
