"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const tmdb_service_1 = require("../tmdb/tmdb.service");
let MovieRepository = exports.MovieRepository = class MovieRepository {
    constructor(prismaService, tmbdService) {
        this.prismaService = prismaService;
        this.tmbdService = tmbdService;
    }
    async createMovie(movieId) {
        try {
            const movie = await this.tmbdService.getMovie(movieId);
            if (!movie) {
                throw Error('Movie not found');
            }
            return await this.prismaService.movie.create({
                data: {
                    title: movie?.title,
                    movieId,
                    posterPath: movie?.poster_path,
                    year: movie?.release_date?.split('-')[0],
                    imdbRating: movie?.vote_average,
                },
            });
        }
        catch (error) {
            console.log('error', error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getMovieById(movieId) {
        try {
            let movie = {};
            const exists = await this.prismaService.movie.findUnique({
                where: {
                    movieId,
                },
                include: {
                    views: true,
                    rates: true,
                    comments: {
                        select: {
                            user: {
                                select: {
                                    username: true,
                                    id: true,
                                },
                            },
                            comment: true,
                        },
                    },
                },
            });
            if (!exists) {
                movie = await this.createMovie(movieId);
            }
            else {
                movie = exists;
            }
            return movie;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async searchMovies(query) {
        return await this.tmbdService.searchMovies(query);
    }
    async getPopularMovies(userId, page) {
        let movies = {
            page,
            results: [],
            total_pages: 0,
            total_results: 0,
        };
        const getPopularMovies = async () => {
            const popularMovies = await this.tmbdService.getPopularMovies(movies?.page);
            const viewedMovies = await this.prismaService.view.findMany({
                where: {
                    userId,
                },
                select: {
                    movieId: true,
                },
            });
            movies = {
                ...movies,
                page: popularMovies?.page,
                total_pages: popularMovies?.total_pages,
                total_results: popularMovies?.total_results,
            };
            const { results } = popularMovies;
            const formattedResults = results.filter((movie) => !viewedMovies.some((viewedMovie) => viewedMovie?.movieId === movie.id));
            movies.results = [...movies.results, ...formattedResults];
        };
        await getPopularMovies();
        if (movies?.results?.length < 20) {
            movies.page += 1;
            await getPopularMovies();
        }
        return movies;
    }
    async discoverMovies(page, providers) {
        return await this.tmbdService.getDiscover({ page, providers });
    }
    async getProviders() {
        return await this.tmbdService.getProviders();
    }
};
exports.MovieRepository = MovieRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tmdb_service_1.TmdbService])
], MovieRepository);
//# sourceMappingURL=movie.repository.js.map