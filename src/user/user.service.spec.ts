import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserModel } from 'src/common/types';

describe('UserService', () => {
  let userService: UserService;
  let userModel: UserModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('Users'),
          useValue: {},
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userModel = moduleRef.get<UserModel>(getModelToken('Users'));
  });

  describe('User Service and Model', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
      expect(userModel).toBeDefined();
    });
  });
});
