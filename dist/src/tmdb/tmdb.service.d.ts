export declare class TmdbService {
    getMovie(movieId: number): Promise<any>;
    searchMovies(query: string): Promise<any>;
    getPopularMovies(page?: number): Promise<any>;
    getProviders(): Promise<any>;
    getDiscover: ({ page, providers }: {
        page: any;
        providers: any;
    }) => Promise<any>;
}
