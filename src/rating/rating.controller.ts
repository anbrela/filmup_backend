import { Body, Controller, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RateMovieDto } from './dto/rateMovie.dto';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Post()
  async rateMovie(@Body() rateMovieDto: RateMovieDto): Promise<void> {
    return this.ratingService.rateMovie(rateMovieDto);
  }
}
