import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';

/**
 * A service that provides Mongoose configuration options.
 * @class
 * @classdesc MongooseConfigService is an implementation of the MongooseOptionsFactory interface that sets up Mongoose options for the app.
 */
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  /**
   * Injects ConfigService for access to app configuration.
   */
  @Inject(ConfigService) private readonly configService: ConfigService;

  /**
   * Initializes MongooseConfigService with a log message.
   */
  constructor() {
    Logger.log('MongooseConfigService initialized', 'MongooseConfigService');
  }

  /**
   * Creates Mongoose options with the URI from the app configuration.
   * @returns {MongooseModuleOptions}
   */
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('MONGO_URI'),
    };
  }
}
