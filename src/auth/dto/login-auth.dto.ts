import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/user/dto';

/**
 * A data transfer object (DTO) used for logging in a user
 * @class
 * @classdesc This class inherits fields from CreateUserDto, specifically email and password used for login.
 * @see CreateUserDto
 */
export class LoginDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
