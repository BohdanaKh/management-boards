import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

import { CardStatus } from '../enum/card-status.enum';

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
  board: mongoose.Schema.Types.ObjectId;
}

export const CardSchema = SchemaFactory.createForClass(Card);
