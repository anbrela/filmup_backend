import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TmdbService } from '../tmdb/tmdb.service';
import { Movie } from '@prisma/client';
@Injectable()
export class MovieRepository {
  constructor(
    private prismaService: PrismaService,
    private tmbdService: TmdbService,
  ) {}

  async createMovie(movieId: number): Promise<Movie> {
    try {
      const movie: any = await this.tmbdService.getMovie(movieId);

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
    } catch (error) {
      console.log('error', error);
      throw new InternalServerErrorException();
    }
  }

  async getMovieById(movieId: number): Promise<Movie> {
    try {
      let movie: Movie | any = {};
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
      } else {
        movie = exists;
      }

      return movie;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async searchMovies(query: string) {
    return await this.tmbdService.searchMovies(query);
  }

  async getPopularMovies(userId: string, page: number) {
    let movies = {
      page,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
    const getPopularMovies = async () => {
      const popularMovies: any = await this.tmbdService.getPopularMovies(
        movies?.page,
      );

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

      const formattedResults = results.filter(
        (movie) =>
          !viewedMovies.some(
            (viewedMovie) => viewedMovie?.movieId === movie.id,
          ),
      );

      movies.results = [...movies.results, ...formattedResults];
    };

    await getPopularMovies();

    if (movies?.results?.length < 20) {
      movies.page += 1;
      await getPopularMovies();
    }

    return movies;
  }

  async discoverMovies(page: number, providers: string) {
    return await this.tmbdService.getDiscover({ page, providers });
  }

  async getProviders() {
    return await this.tmbdService.getProviders();
  }
}
