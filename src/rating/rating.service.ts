import { Injectable } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { RateMovieDto } from './dto/rateMovie.dto';

@Injectable()
export class RatingService {
  constructor(private ratingRepository: RatingRepository) {}

  async rateMovie(rateMovieDto: RateMovieDto) {
    return this.ratingRepository.rateMovie(rateMovieDto);
  }
}
