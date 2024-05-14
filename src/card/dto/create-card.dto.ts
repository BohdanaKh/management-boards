import { IsString, Length } from 'class-validator';
export class CreateCardDto {
  @IsString()
  @Length(1, 20)
  name: string;

  @IsString()
  @Length(3, 100)
  description: string;
}
