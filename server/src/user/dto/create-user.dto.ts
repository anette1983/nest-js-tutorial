import { IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail() //декоратор для валідації
  email: string;
  @MinLength(6, { message: 'Password must include min 6 symbols' })
  password: string;
}
