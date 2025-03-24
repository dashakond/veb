import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from 'src/roles/dto/add-role.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UsersService {

constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService){

}

async createUser(dto:CreateUserDto ){
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue("USER")
    if (!role) {
        throw new Error("Роль 'USER' не знайдена");
    }
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user;

}
async getAllUsers(){
    const users = await this.userRepository.findAll({include:{all:true}});
    return users;
}
async getUserByEmail(email: string){
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
   return user;
}

async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('Користувач не знайдений', HttpStatus.NOT_FOUND);
    }
    await user.update(dto);
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('Користувач не знайдений', HttpStatus.NOT_FOUND);
    }
    await user.destroy();
    return { message: 'Користувач успішно видалений' };
  }

async addRole(dto: AddRoleDto){
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user){
        await user.$add('role', role.id);
        return dto;
    }
    throw new HttpException('Користувач або роль не знайдена', HttpStatus.NOT_FOUND);
    
}

}
