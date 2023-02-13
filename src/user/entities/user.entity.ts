import mongoose from 'mongoose';
import * as argon from 'argon2';
import * as crypto from 'crypto';
import { UserModel } from 'src/common/types';

interface IAddress {
  /** Name associated to the address */
  name: string;
  /** Name of the physical address */
  address: string;
  /** Associated email address */
  email: string;
  /** Associated phone number */
  phone: string;
  /** postal code of the area */
  postalCode: string;
}

/**
 * @interface IUser - represents the structure of a User object
 */
export interface IUser {
  /* User's first name */
  firstName: string;
  /* User's last name */
  lastName: string;
  /* User's primary email address */
  email: string;
  /* User's profile picture */
  picture: string;
  /* User's role within the application */
  role: string;
  /* User's addresses book */
  addressBook: IAddress[];
  /* Indicates if the user is active or not */
  active: boolean;
  /* Indicates if the user is blocked or not */
  blocked: boolean;
  /* User's hashed password */
  password: string;
  /* Confirmation of the user's password */
  passwordConfirm: string;
  /* Timestamp of the last password change */
  passwordChangedAt: number;
  /* Token used for resetting the password */
  passwordResetToken: string;
  /* Expiration date of the password reset token */
  passwordResetTokenExpires: number;
}

/**
 * @interface IUserMethods - represents the methods that can be added to a User model.
 */
export interface IUserMethods {
  /**
   * Find users associated to an email (primary or address book).
   * @param email - The email address of the user to be found.
   * @returns {Promise<IUser | null>} - The user object if found, null otherwise.
   */
  findByEmailAddress(email: string): Promise<IUser | null>;

  /**
   * Verify if the provided password matches the hashed password stored in the database.
   * @param {string} candidatePassword - The plain text password provided by the user.
   * @returns {Promise<boolean>}  True if the passwords match, false otherwise.
   * */
  verifyPassword(candidatePassword: string): Promise<boolean>;

  /**
   * Method to check if the password has been changed after the JWT token was issued.
   * @param {Number} JWTTimestamp - Timestamp of when the JWT token was issued
   * @returns {Boolean} - Returns true if password was changed after the token was issued, false otherwise
   */
  changedPasswordAfter(jwtTimestamp: number): boolean;

  /**
   * Generates a reset password token and saves it to the user's document.
   * @returns {String} - The plaintext reset token
   */
  createResetPasswordToken(): string;
}

export const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: [true, 'Please tell us your first name!'],
  },
  lastName: {
    type: String,
    required: [true, 'Please tell us your last name!'],
  },
  email: {
    type: String,
    unique: true,
  },
  picture: {
    type: String,
    default:
      'http://images.fineartamerica.com/images-medium-large/alien-face-.jpg',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  blocked: {
    type: Boolean,
    default: false,
    select: false,
  },
  addressBook: [
    {
      name: {
        type: String,
        required: [true, 'Please provide a name for this address'],
      },
      address: {
        type: String,
        required: [true, 'Please provide an address'],
      },
      email: {
        type: String,
        required: [true, 'Please provide an email address'],
      },
      phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
      },
      postalCode: {
        type: String,
        required: [true, 'Please provide a postal code'],
      },
    },
  ],
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (pwdConfirm: string) {
        return pwdConfirm === this.password;
      },
    },
  },
  passwordChangedAt: {
    type: Number,
    default: Date.now(),
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpires: {
    type: Number,
  },
});

/**
 * Hashes the password before save()
 */
UserSchema.pre('save', async function (next) {
  // if the password is not new, skip this middleware
  if (!this.isModified('password')) return next();

  this.password = await argon.hash(this.password);
  //   no need to save this
  this.passwordConfirm = undefined;
  next();
});

/**
 * @pre ('save') middleware function that catches the time of when the password was changed
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.passwordChangedAt = Date.now();
  next();
});

UserSchema.pre(/^find/, function (next) {
  this.find({ blocked: { $ne: false } });
  next();
});

// INSTANCE METHODS DEFINITION

UserSchema.method(
  'verifyPassword',
  async function verifyPassword(candiatePassword: string) {
    return argon.verify(this.password, candiatePassword);
  },
);

UserSchema.method(
  'changedPasswordAfter',
  function changedPasswordAfter(JWTTimestamp: number) {
    return JWTTimestamp < Number(this.passwordChangedAt / 1000);
  },
);

UserSchema.method(
  'createResetPasswordToken',
  function createResetPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    this.passwordResetTokenExpires = Date.now() + 60 * 1000 * 10; // date now + 10min

    return resetToken;
  },
);
