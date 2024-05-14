import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Card } from '../../card/model/card.model';
import * as mongoose from 'mongoose';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop()
  uniqueId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: Date, required: true })
  time: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Card' })
  cards: Card[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
