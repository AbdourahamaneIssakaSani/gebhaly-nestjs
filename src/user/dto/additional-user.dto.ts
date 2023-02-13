import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @class Contains all optionnal data of a user, which are not required when creating an account.
 */
export class AdditionalUserDto {
  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsNumber()
  passwordChangedAt: number;

  @IsOptional()
  @IsString()
  passwordResetToken: string;

  @IsOptional()
  @IsNumber()
  passwordResetTokenExpires: number;
}
