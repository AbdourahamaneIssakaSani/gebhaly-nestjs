import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './common/db/mongo.service';
import { EmailService } from './providers/email/email.service';
import { EmailModule } from './providers/email/email.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards';

const env = process.env.NODE_ENV || 'development';

const envFilePath: string = path.resolve(
  `${__dirname}/common/envs/.${env}.env`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    AuthModule,
    UserModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
