import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '../enums/gender.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
