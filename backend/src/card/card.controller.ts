import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './model/card.model';

@Controller('boards/:boardId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardService.create(boardId, createCardDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: Partial<CreateCardDto>,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.cardService.deleteById(id);
  }
}
