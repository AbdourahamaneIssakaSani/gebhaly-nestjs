import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, IUserMethods } from './entities/user.entity';
import * as crypto from 'crypto';
import { UserModel } from 'src/common/types';

@Injectable()
export class UserService {
  constructor(@InjectModel('Users') private userModel: UserModel) {}

  /**
   * Creates a new user.
   * @param {CreateUserDto} dto - The user data.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>>} A promise that resolves with the created user.
   */
  async create(
    dto: CreateUserDto,
  ): Promise<HydratedDocument<IUser, IUserMethods>> {
    return await new this.userModel(dto).save();
  }

  /**
   * Finds all users.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>[]>} A promise that resolves with all users, excluding the password.
   */
  async findAll(): Promise<HydratedDocument<IUser, IUserMethods>[]> {
    return await this.userModel.find().select('-password');
  }

  /**
   * Finds all users who used the given email address.
   * @param {string} email - The email address to match.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>[]>} A promise that resolves with all matching users, excluding the password.
   */
  async findAllByEmailAddress(
    email: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>[]> {
    return await this.userModel.find({
      $or: [{ email }, { 'addressBook.email': email }],
    });
  }

  /**
   * Finds the user with the given ID.
   * @param {string} id - The ID of the user to find.
   * @param {Object} [projection={ password: 0 }] - The fields to include or exclude from the query. Excludes the password by default.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>>} A promise that resolves with the user, excluding the password by default.
   */
  async findById(
    id: string,
    projection = { password: 0 },
  ): Promise<HydratedDocument<IUser, IUserMethods>> {
    return await this.userModel.findOne({ _id: id }, projection);
  }

  /**
   * Finds the user with the given password reset token.
   * @param {string} token - The password reset token.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>>} A promise that resolves with the user.
   */
  async findByResetToken(
    token: string,
  ): Promise<HydratedDocument<IUser, IUserMethods>> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    return await this.userModel.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
  }

  /**
   * Finds the user with the given email address.
   * @param {string} email - The email address of the user to find.
   * @param {Object} projection - The fields to include or exclude from the query. Excludes the password by default.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>>} A promise that resolves with the user, excluding the password by default.
   */
  async findByEmail(
    email: string,
    projection = { password: 0 },
  ): Promise<HydratedDocument<IUser, IUserMethods>> {
    return await this.userModel.findOne({ email }, projection);
  }

  /**
   * Updates the user with the given ID.
   * @param {string} id - The ID of the user to update.
   * @param {UpdateUserDto} dto - The updated user data.
   * @returns {Promise<HydratedDocument<IUser, IUserMethods>>} A promise that resolves with the updated user.
   */
  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<HydratedDocument<IUser, IUserMethods>> {
    return await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Removes the user with the given ID.
   * @param {string} id - The ID of the user to remove.
   * @returns {Promise<void>} A promise that resolves when the user is removed.
   */
  async remove(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  /**
   * Removes the user with the given ID.
   * @param {string} id - The ID of the user to remove.
   * @returns {Promise<void>} A promise that resolves when the user is removed.
   */
  async block(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { blocked: true });
  }
}
