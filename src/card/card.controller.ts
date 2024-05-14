import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Card } from './model/card.model';

@Controller('boards:id')
export class BoardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body() createCardDto: CreateCardDto,
  ) {
    return this.cardService.create(boardId, createCardDto);
  }

  // @Get()
  // findAll() {
  //   return this.cardService.findAll();
  // }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCardDto: Partial<CreateCardDto>,
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.deleteById(id);
  }
}
