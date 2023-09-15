import { MovieRepository } from './movie.repository';
import { Movie } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
export declare class MovieService {
    private movieRepository;
    private authService;
    constructor(movieRepository: MovieRepository, authService: AuthService);
    getMovieById(movieId: number): Promise<Movie>;
    searchMovies(query: string): Promise<any>;
    getProviders(): Promise<any>;
    discoverMovies(page: number, providers: string): Promise<any>;
    getPopularMovies(token: string, page: number): Promise<{
        page: number;
        results: any[];
        total_pages: number;
        total_results: number;
    }>;
}
