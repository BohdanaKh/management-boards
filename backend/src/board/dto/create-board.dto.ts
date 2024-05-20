import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @IsString()
  @Length(1, 20)
  @ApiProperty()
  title: string;
}
