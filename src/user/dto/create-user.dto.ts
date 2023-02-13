import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * A data transfer object (DTO) used to create a new user.
 * @class
 * @classdesc Contains primary data, those needed when creating an acount, of a user.
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  passwordConfirm: string;
}
