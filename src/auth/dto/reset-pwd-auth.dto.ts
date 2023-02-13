import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto';

/**
 * A data transfer object (DTO) used to perform reset password action
 * @class
 * @classdesc This class inherits password and passwordConfirm fields from CreateUserDto.
 * @see CreateUserDto
 */
export class ResetPasswordDto extends PickType(CreateUserDto, [
  'password',
  'passwordConfirm',
] as const) {}
