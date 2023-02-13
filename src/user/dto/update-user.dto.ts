import { PartialType, IntersectionType, OmitType } from '@nestjs/mapped-types';
import { AdditionalUserDto } from './additional-user.dto';
import { CreateUserDto } from './create-user.dto';

/**
 * @class Contains all fields of CreateUserDto and AdditionalUserDto classes. 
 * We use it whenever we want to update any field of a user in the database. All fields in this class are optional.
 @see CreateUserDto
 @see AdditionalUserDto
 */
export class UpdateUserDto extends PartialType(
  IntersectionType(
    OmitType(CreateUserDto, ['password', 'passwordConfirm']),
    AdditionalUserDto,
  ),
) {}
