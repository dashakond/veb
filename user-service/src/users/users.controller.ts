import { Body, Controller, Post, Get, Param, UseGuards, Delete, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from 'src/roles/dto/add-role.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
