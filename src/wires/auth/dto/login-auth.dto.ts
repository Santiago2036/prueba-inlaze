import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  username: string;
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
