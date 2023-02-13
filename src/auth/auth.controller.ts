import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  Version,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards';
import { CreateUserDto } from 'src/user/dto';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  ChangePasswordDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createAuthDto: CreateUserDto) {
    return await this.authService.signup(createAuthDto);
  }

  @Version('1')
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('forgot-pwd')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(dto);
  }

  @Patch('reset-pwd/:token')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Param('token') token: string,
    @Body() dto: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(token, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-pwd/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @Param('id') id: string,
    @Body() dto: ChangePasswordDto,
  ) {
    await this.authService.changePassword(id, dto);
  }
}
