import { PrismaService } from '../prisma/prisma.service';
import { TmdbService } from '../tmdb/tmdb.service';
import { Movie } from '@prisma/client';
export declare class MovieRepository {
    private prismaService;
    private tmbdService;
    constructor(prismaService: PrismaService, tmbdService: TmdbService);
    createMovie(movieId: number): Promise<Movie>;
    getMovieById(movieId: number): Promise<Movie>;
    searchMovies(query: string): Promise<any>;
    getPopularMovies(userId: string, page: number): Promise<{
        page: number;
        results: any[];
        total_pages: number;
        total_results: number;
    }>;
    discoverMovies(page: number, providers: string): Promise<any>;
    getProviders(): Promise<any>;
}
