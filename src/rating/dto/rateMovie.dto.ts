import { movieIdentity } from '../../comment/dto/createComment.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RateMovieDto extends movieIdentity {
  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
