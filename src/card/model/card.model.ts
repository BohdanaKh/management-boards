import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Board } from '../../board/model/board.model';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Date, required: true })
  time: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  board: Board;
}

export const CardSchema = SchemaFactory.createForClass(Card);
