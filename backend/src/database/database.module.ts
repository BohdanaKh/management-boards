import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     uri: configService.get('DATABASE_URI'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(
      'mongodb://User2024K:Gru545!fl1L51@db:27017/management-boards?authSource=admin',
    ),
  ],
})
export class DatabaseModule {}
