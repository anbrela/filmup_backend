import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class movieIdentity {
  @IsNumber()
  @IsNotEmpty()
  movieId: number;

  @IsNotEmpty()
  @IsString()
  userId: string;
}

export class commentMovieDto extends movieIdentity {
  @IsNotEmpty()
  @IsString()
  comment: string;
}
