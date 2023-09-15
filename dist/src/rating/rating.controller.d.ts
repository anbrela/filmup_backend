import { RatingService } from './rating.service';
import { RateMovieDto } from './dto/rateMovie.dto';
export declare class RatingController {
    private ratingService;
    constructor(ratingService: RatingService);
    rateMovie(rateMovieDto: RateMovieDto): Promise<void>;
}
