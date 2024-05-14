import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './model/card.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Card',
        schema: CardSchema,
      },
    ]),
  ],
  providers: [CardService],
})
export class CardModule {}
