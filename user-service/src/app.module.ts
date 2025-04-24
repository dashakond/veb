import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'nesr_db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nest-course',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User, Role, UserRoles]),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
