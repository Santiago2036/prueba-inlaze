import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: any;
  fullname: string;
}
