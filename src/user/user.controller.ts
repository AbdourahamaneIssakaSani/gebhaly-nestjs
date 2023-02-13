import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/common/guards';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    return await this.userService.findById(req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.update(id, dto);
  }

  @UseGuards(RolesGuard)
  @Roles('user')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('block/:id')
  async block(@Param('id') id: string) {
    await this.userService.block(id);
  }
}
