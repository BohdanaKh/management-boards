import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get<string>('DATABASE_URI'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(
      'mongodb://User2024K:Gru545!fl1L51@db:27017/management-boards?authSource=admin',
    ),
  ],
})
export class DatabaseModule {}
