import { Controller, Post, Body, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientProxy) {}

  @Post('register')
  async register(@Body() data: any) {
    try {
      return await this.userService.send({ cmd: 'register_user' }, data).toPromise();
    } catch (err) {
      console.error('Register error:', err);
      throw new HttpException(err.message || 'Помилка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() data: any) {
    try {
      return await this.userService.send({ cmd: 'login_user' }, data).toPromise();
    } catch (err) {
      console.error('Login error:', err);
      throw new HttpException(err.message || 'Помилка сервера', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
