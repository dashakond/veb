import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Користувач з таким email вже існує', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });
    return this.generateToken(user);
  }

  async login(dto: CreateUserDto) {
    console.log('AuthService.login() DTO:', dto);
  
    const user = await this.validateUser(dto); // можлива причина падіння
    return this.generateToken(user);
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) {
      console.warn('User not found:', dto.email);
      throw new UnauthorizedException('Користувача не знайдено');
    }
  
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (passwordEquals) {
      return user;
    }
  
    console.warn('Invalid password for user:', dto.email);
    throw new UnauthorizedException('Невірний пароль');
  }
  

  private generateToken(user: any) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
