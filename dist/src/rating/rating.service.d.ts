import { RatingRepository } from './rating.repository';
import { RateMovieDto } from './dto/rateMovie.dto';
export declare class RatingService {
    private ratingRepository;
    constructor(ratingRepository: RatingRepository);
    rateMovie(rateMovieDto: RateMovieDto): Promise<void>;
}
