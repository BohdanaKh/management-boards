import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';

import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './model/card.model';

@ApiTags('Cards')
@Controller('boards/:boardId/cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a card',
  })
  @ApiBody({
    type: CreateCardDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Create success',
    type: Card,
  })
  async create(
    @Param('boardId') boardId: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<Card> {
    return this.cardService.create(boardId, createCardDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a card',
  })
  @ApiBody({
    type: PartialType(CreateCardDto),
  })
  @ApiResponse({
    status: 200,
    description: 'Update success',
    type: Card,
  })
  async update(
    @Param('id') id: string,
    @Body() updateCardDto: Partial<CreateCardDto>,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Remove a card',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.cardService.deleteById(id);
  }
}
