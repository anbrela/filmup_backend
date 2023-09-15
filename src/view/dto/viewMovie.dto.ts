import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddViewDto } from '../../movie/dto/addView.dto';

export class ViewMovieDto {
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AddViewDto)
  view: AddViewDto;
}
