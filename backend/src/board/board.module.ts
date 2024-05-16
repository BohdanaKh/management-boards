import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardSchema } from './model/board.model';
import { CardModule } from '../card/card.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Board',
        schema: BoardSchema,
      },
    ]),
    CardModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [
    MongooseModule.forFeature([
      {
        name: 'Board',
        schema: BoardSchema,
      },
    ]),
  ],
})
export class BoardModule {}
