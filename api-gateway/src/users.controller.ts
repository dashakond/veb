import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientProxy) {}

  @Post('register')
  async register(@Body() data: any) {
    return this.userService.send({ cmd: 'register_user' }, data).toPromise();
  }

  @Post('login')
  async login(@Body() data: any) {
    return this.userService.send({ cmd: 'login_user' }, data).toPromise();
  }
}
