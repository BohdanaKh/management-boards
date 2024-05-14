import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardSchema } from './model/board.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Board',
        schema: BoardSchema,
      },
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
