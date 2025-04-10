import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

   constructor(private userService: UsersService,
               private jwtService: JwtService    ){

   }
    async login(userDto: CreateUserDto){
     const user = await this.validateUser(userDto)
     return this.generateToken(user)

        
    }
 

   async registration(userDto: CreateUserDto){
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if(candidate){
        throw new HttpException('Користувач з таким email вже існує ', HttpStatus.BAD_REQUEST)
    }
    const hashPassword = await bcrypt.hash(userDto.password,5);
    const user = await this.userService.createUser({...userDto, password: hashPassword})
    return this.generateToken(user)

   }
 
     private async generateToken(user: User){
   
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return{
        token: this.jwtService.sign(payload)
    }
  }
  private async validateUser(userDto: CreateUserDto) {
    if (!userDto.password) {
        throw new UnauthorizedException({ message: "Пароль не передано" });
    }

    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
        throw new UnauthorizedException({ message: "Користувач не існує" });
    }

    if (!user.password) {
        throw new UnauthorizedException({ message: "Пароль користувача не знайдено" });
    }

    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (passwordEquals) {
        return user;
    }

    throw new UnauthorizedException({ message: "Неправильний email або пароль" });
}

  
}
  




