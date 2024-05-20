import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

import { CardStatus } from '../enum/card-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDto {
  @IsString()
  @Length(1, 20)
  @ApiProperty()
  name: string;

  @IsString()
  @Length(3, 100)
  @ApiProperty()
  description: string;

  @IsEnum(CardStatus)
  @IsOptional()
  @ApiProperty()
  status: CardStatus;
}
