import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Card } from './model/card.model';
import { CreateCardDto } from './dto/create-card.dto';
import { BoardService } from '../board/board.service';
import { CardStatus } from './enum/card-status.enum';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private cardModel: Model<Card>,
    private readonly boardService: BoardService,
  ) {}

  async create(boardId: string, createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = new this.cardModel({
      ...createCardDto,
      board: boardId,
      status: CardStatus.ToDo,
    });
    await createdCard.save();
    await this.boardService.addCard(createdCard._id, boardId);
    return createdCard;
  }

  async findAll(boardId: string): Promise<Card[]> {
    return this.cardModel.find({ board: boardId }).exec();
  }

  async update(
    cardId: string,
    updateCardDto: Partial<CreateCardDto>,
  ): Promise<Card> {
    await this.findCard(cardId);

    return this.cardModel.findOneAndUpdate(
      { _id: cardId },
      { ...updateCardDto },
      { returnDocument: 'after' },
    );
  }

  async deleteById(cardId: string): Promise<void> {
    const card = await this.findCard(cardId);
    await this.cardModel.deleteOne({ _id: cardId });
    await this.boardService.removeCard(cardId, card.board);
  }

  private async findCard(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();

    if (!card) {
      throw new NotFoundException(`Could not find card with id:${id} .`);
    }
    return card;
  }
}
