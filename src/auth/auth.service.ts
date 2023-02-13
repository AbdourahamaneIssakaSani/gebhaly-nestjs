import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto';
import { IUser } from 'src/user/entities/user.entity';

import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from './dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/providers/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Sign up a user
   * @param dto - user data
   * @returns {Promise<IUser>} the created user
   */
  async signup(dto: CreateUserDto): Promise<IUser> {
    return await this.userService.create(dto);
  }

  /**
   * Log in a user
   * @param dto - login data
   * @returns {Promise<{ access_token: string }>} JWT access token
   */
  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = dto;

    const user = await this.userService.findByEmail(email, { password: 1 });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await user.verifyPassword(password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Validate a user
   * @param email - email address
   * @param password - password
   * @returns {Promise<any>}
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email, { password: 1 });
    if (user && (await user.verifyPassword(password))) {
      return user;
    }
    return null;
  }

  /**
   * Sends reset password token to user email
   * @param dto - forgot password data
   * @returns {Promise<{ message: string }>}
   */
  async forgotPassword(dto: ForgotPasswordDto): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetPasswordToken = user.createResetPasswordToken();
    // console.log(resetPasswordToken);

    this.emailService.sendEmail(
      dto.email,
      'Reset Password',
      `Hello, here is your resetPasswordToken: ${resetPasswordToken}`,
    );

    await user.save({ validateBeforeSave: false });

    return { message: 'Token sent to email!' };
  }

  async resetPassword(token: string, dto: ResetPasswordDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new UnauthorizedException('Passwords do not match');
    }
    const user = await this.userService.findByResetToken(token);

    if (!user) {
      throw new NotFoundException('User not found/Token expired');
    }

    user.password = dto.password;
    user.passwordConfirm = dto.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    await user.save();

    return { message: 'Password reset successfull!' };
  }

  /**
   * Changes password of a user
   * @param id - user ID
   * @param dto - change password data
   * @returns {Promise<void>}
   */
  async changePassword(id: string, dto: ChangePasswordDto): Promise<void> {
    if (dto.password !== dto.passwordConfirm) {
      throw new UnauthorizedException('Passwords do not match');
    }
    const user = await this.userService.findById(id, { password: 1 });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.verifyPassword(dto.currentPassword)) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    user.password = dto.password;
    user.passwordConfirm = dto.passwordConfirm;

    await user.save();
  }
}
