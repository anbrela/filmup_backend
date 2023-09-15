import { MovieService } from './movie.service';
import { Movie } from '@prisma/client';
export declare class MovieController {
    private movieService;
    constructor(movieService: MovieService);
    searchMovies(query: string): Promise<any>;
    getPopularMovies(page: number, token: any): Promise<{
        page: number;
        results: any[];
        total_pages: number;
        total_results: number;
    }>;
    getProviders(): Promise<any>;
    discoverMovies(page: number, providers: string): Promise<any>;
    getMovieById(movieId: string): Promise<Movie>;
}
