import { Model } from 'mongoose';
import { IUser, IUserMethods } from 'src/user/entities/user.entity';

/**
 * @type UserModel - represents the Mongoose Model of a User, with the interface IUser as the schema and the IUserMethods as the additional instance methods.
 */
export type UserModel = Model<IUser, object, IUserMethods>;
