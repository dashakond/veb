import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class ReadingProgress extends Model<ReadingProgress> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true,  primaryKey: true })
  declare id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  book_id: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  current_page: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  percentage_read: number;

 
}
