import { PrismaService } from '../prisma/prisma.service';
import { RateMovieDto } from './dto/rateMovie.dto';
export declare class RatingRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    rateMovie(rateMovieDto: RateMovieDto): Promise<void>;
}
