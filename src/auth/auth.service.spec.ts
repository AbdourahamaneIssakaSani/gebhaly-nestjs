import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/providers/email/email.service';
import { UserService } from 'src/user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, JwtService, EmailService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    emailService = module.get<EmailService>(EmailService);
  });

  describe('Auth Service, User Service, JWT Service, and Email Service', () => {
    it('should be defined', () => {
      expect(authService).toBeDefined();
      expect(userService).toBeDefined();
      expect(jwtService).toBeDefined();
      expect(emailService).toBeDefined();
    });
  });
});
