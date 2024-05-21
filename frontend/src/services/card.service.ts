import { apiService } from './api.service.ts';
import { urls } from '../constants/urls.ts';
import { ICardModel } from '../models/ICardModel.ts';
import { IRes } from '../types/response.type.ts';

const cardsService = {
  getCardByID: async (boardId: string, id: string): IRes<ICardModel> => {
    return await apiService.get(urls.cards.byId(boardId, id));
  },
  create: async (boardId: string, data: ICardModel): IRes<ICardModel> => {
    return await apiService.post(urls.cards.base(boardId), data);
  },
  updateById: async (
    boardId: string,
    id: string,
    data: ICardModel
  ): IRes<ICardModel> => {
    return await apiService.put(urls.cards.byId(boardId, id), data);
  },
  deleteById: async (boardId: string, id: string): IRes<void> =>
    apiService.delete(urls.cards.byId(boardId, id)),
};

export { cardsService };
