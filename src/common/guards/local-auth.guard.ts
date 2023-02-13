import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * A guard that uses the local strategy for authentication.
 */
export class LocalAuthGuard extends AuthGuard('local') {}
