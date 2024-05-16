import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardService } from './card.service';
import { CardSchema } from './model/card.model';
import { CardController } from './card.controller';
import { BoardService } from '../board/board.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Card',
        schema: CardSchema,
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService, BoardService],
  exports: [
    MongooseModule.forFeature([
      {
        name: 'Card',
        schema: CardSchema,
      },
    ]),
  ],
})
export class CardModule {}
