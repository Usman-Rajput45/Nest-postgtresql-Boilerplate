import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { REGEX } from '../../constants/regex.constant';

function trimString(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value;
}

export class RegisterDto {
  @Transform(({ value }) => trimString(value))
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(REGEX.PASSWORD_MIN_LENGTH)
  password!: string;
}

export class LoginDto {
  @Transform(({ value }) => trimString(value))
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(REGEX.PASSWORD_MIN_LENGTH)
  password!: string;
}
