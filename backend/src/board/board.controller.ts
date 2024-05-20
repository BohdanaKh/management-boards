import {
  Controller,
  Get,
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

import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './model/board.model';

@ApiTags('Boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all boards',
  })
  @ApiResponse({
    status: 200,
    description: 'Get success',
  })
  async getList(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a board',
  })
  @ApiBody({
    type: CreateBoardDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Create success',
    type: Board,
  })
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a board by id',
  })
  @ApiResponse({
    status: 200,
    description: 'Get success',
    type: Board,
  })
  async getOneById(@Param('id') id: string): Promise<Board> {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update a board',
  })
  @ApiBody({
    type: PartialType(CreateBoardDto),
  })
  @ApiResponse({
    status: 200,
    description: 'Update success',
    type: Board,
  })
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: Partial<CreateBoardDto>,
  ): Promise<Board> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Remove a board',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.boardService.deleteById(id);
  }
}
