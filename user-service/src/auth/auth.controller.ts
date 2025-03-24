import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register_user' })
  async register(data: CreateUserDto) {
    return this.authService.registration(data);
  }

  @MessagePattern({ cmd: 'login_user' })
  async login(data: CreateUserDto) {
    return this.authService.login(data);
  }
}
