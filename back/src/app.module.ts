import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user/entities/user.entity";
import {APP_GUARD} from "@nestjs/core";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get<string>('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              database: configService.get<string>('DB_NAME'),
              username: configService.get<string>('DB_USERNAME'),
              password: configService.get<string>('DB_PASSWORD'),
              entities: [__dirname + '/**/*.entity.{js,ts}'],
              synchronize: true,
              }),
          inject: [ConfigService],
      }),
      UserModule,
  ],
  controllers: [AppController],
  providers: [
      AppService,
  ],
})
export class AppModule {}
