import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { CardStatus } from '../enum/card-status.enum';
import { Board } from '../../board/model/board.model';

export type CardDocument = HydratedDocument<Card>;

@Schema({ timestamps: true })
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: CardStatus })
  status: CardStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  board: Board;
}

export const CardSchema = SchemaFactory.createForClass(Card);
