import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto';

/**
 * A data transfer object (DTO) used to change password
 * @class
 * @classdesc This class inherits password and passwordConfirm fields from CreateUserDto. A new field currentPassword is added.
 * @see CreateUserDto
 */
export class ChangePasswordDto extends PickType(CreateUserDto, [
  'password',
  'passwordConfirm',
] as const) {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
