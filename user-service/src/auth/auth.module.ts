import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(()=> UsersModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'secret_key_safasf',
      signOptions:{
        expiresIn: '24h'
      }
    })
  ],
  exports:[
    AuthService, 
    JwtModule
  ]
})
export class AuthModule {}
