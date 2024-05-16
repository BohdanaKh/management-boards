import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './model/board.model';
import { Card } from '../card/model/card.model';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel('Board') private boardModel: Model<Board>,
    @InjectModel('Card') private cardModel: Model<Card>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = new this.boardModel({
      ...createBoardDto,
    });
    return createdBoard.save();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardModel
      .findOne({ _id: id })
      .populate('cards')
      .exec();

    if (!board) {
      throw new NotFoundException(`Could not find board with id:${id} .`);
    }
    return board;
  }

  async update(
    boardId: string,
    updateBoardDto: Partial<CreateBoardDto>,
  ): Promise<Board> {
    await this.findOneById(boardId);

    return this.boardModel.findOneAndUpdate(
      { _id: boardId },
      { ...updateBoardDto },
      { returnDocument: 'after' },
    );
  }

  async deleteById(boardId: string): Promise<void> {
    await this.findOneById(boardId);
    await this.boardModel.deleteOne({ _id: boardId });
    await this.boardModel.findOneAndDelete({ _id: boardId });
    await this.cardModel.deleteMany({ board: boardId });
  }

  async findOneById(boardId: string): Promise<Board> {
    const board = await this.boardModel.findById(boardId).exec();

    if (!board) {
      throw new NotFoundException(`Could not find board with id:${boardId} .`);
    }
    return board;
  }

  addCard(cardId: Types.ObjectId, boardId: string) {
    return this.boardModel.findByIdAndUpdate(
      boardId,
      { $push: { cards: cardId } },
      { new: true },
    );
  }

  removeCard(cardId: string, boardId: mongoose.Schema.Types.ObjectId) {
    return this.boardModel.findByIdAndUpdate(
      { _id: boardId },
      { $pull: { cards: cardId } },
      { new: true },
    );
  }
}
