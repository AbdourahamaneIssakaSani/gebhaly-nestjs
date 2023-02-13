import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto';

/**
 * A data transfer object (DTO) used to perform forgot password action.
 * @class
 * @classdesc This class inherits email field from CreateUserDto.
 * @see CreateUserDto
 */
export class ForgotPasswordDto extends PickType(CreateUserDto, [
  'email',
] as const) {}
