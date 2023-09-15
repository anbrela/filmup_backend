import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { ViewMovieDto } from '../view/dto/viewMovie.dto';
import { Movie } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class MovieService {
  constructor(
    private movieRepository: MovieRepository,
    private authService: AuthService,
  ) {}

  async getMovieById(movieId: number): Promise<Movie> {
    return this.movieRepository.getMovieById(movieId);
  }

  async searchMovies(query: string) {
    return this.movieRepository.searchMovies(query);
  }

  async getProviders() {
    const providers = await this.movieRepository.getProviders();

    const mostPopular = [337, 8, 119, 2, 63, 384, 149];

    return providers?.results?.filter((provider) =>
      mostPopular.includes(provider?.provider_id),
    );
  }

  async discoverMovies(page: number, providers: string) {
    return this.movieRepository.discoverMovies(page, providers);
  }

  async getPopularMovies(token: string, page: number) {
    const user = await this.authService.confirmUser(token);

    return this.movieRepository.getPopularMovies(user?.id, page);
  }
}
