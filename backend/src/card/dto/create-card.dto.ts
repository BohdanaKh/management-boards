import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

import { CardStatus } from '../enum/card-status.enum';

export class CreateCardDto {
  @IsString()
  @Length(1, 20)
  name: string;

  @IsString()
  @Length(3, 100)
  description: string;

  @IsEnum(CardStatus)
  @IsOptional()
  status: CardStatus;
}
