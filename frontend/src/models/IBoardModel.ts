import { ICardModel } from './ICardModel.ts';

export interface IBoardModel {
  _id: string;
  title: string;
  cards: ICardModel[];
}
