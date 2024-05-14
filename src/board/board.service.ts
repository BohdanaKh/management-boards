import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
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
      uniqueId: uuidv4(),
      title: createBoardDto.title,
    });
    return createdBoard.save();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardModel
      .findOne({ uniqueId: id })
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
    await this.findOne(boardId);

    return this.boardModel.findOneAndUpdate(
      { uniqueId: boardId },
      { ...updateBoardDto },
      { returnDocument: 'after' },
    );
  }

  async deleteById(boardId: string): Promise<void> {
    await this.findOne(boardId);

    await this.boardModel.deleteOne({ uniqueId: boardId });
    await this.cardModel.deleteMany({ board: boardId });
  }
}
