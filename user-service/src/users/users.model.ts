import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";


interface UserCreationAttrs{
    email:string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs>{
 @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
 declare id: number;
 @Column({type: DataType.STRING, unique: true, allowNull: false})
 email: string;
 @Column({type: DataType.STRING,  allowNull: false})
 declare password: string;
 

 @BelongsToMany(() => Role, () => UserRoles)
 declare roles: Role[];
}