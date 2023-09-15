import { PrismaService } from '../prisma/prisma.service';
import { ViewMovieDto } from './dto/viewMovie.dto';
import { MovieRepository } from '../movie/movie.repository';
export declare class ViewRepository {
    private prismaService;
    private movieRepository;
    constructor(prismaService: PrismaService, movieRepository: MovieRepository);
    removeView(movieId: any, userId: any): Promise<void>;
    viewMovie(viewMovieDto: ViewMovieDto): Promise<void>;
}
