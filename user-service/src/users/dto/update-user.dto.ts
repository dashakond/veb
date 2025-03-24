import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsBoolean()
  readonly banned?: boolean;

  @IsOptional()
  @IsString()
  readonly banReason?: string;
}
