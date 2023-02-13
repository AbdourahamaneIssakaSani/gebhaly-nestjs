import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/common/types';
import { UserService } from 'src/user/user.service';

@Injectable()
/**
 * A passport strategy that uses a JSON Web Token (JWT) for authentication.
 * The JWT is passed in the Authorization header as a Bearer token.
 */
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    @Inject(UserService) private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  /**
   * Validate a JWT payload and extract the user ID and email.
   * @param payload - the payload from the JWT
   * @returns An object with the user ID and email.
   */
  async validate(payload: JwtPayload) {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    // Check if the password has been changed after the token was issued
    if (user.passwordChangedAt && user.passwordChangedAt > payload.iat * 1000) {
      throw new UnauthorizedException('Please log in again');
    }
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
