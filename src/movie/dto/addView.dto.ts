import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddViewDto {
  @IsNotEmpty()
  @IsISO8601()
  viewedAt: Date;
}
