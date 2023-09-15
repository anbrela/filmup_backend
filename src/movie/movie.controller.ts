import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthGuard } from '../auth/authGuard';
import { Movie } from '@prisma/client';
import { GetToken } from '../auth/get-token.decorator';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('/search')
  @UseGuards(AuthGuard)
  async searchMovies(@Query('query') query: string) {
    return this.movieService.searchMovies(query);
  }

  @Get('/popular')
  @UseGuards(AuthGuard)
  async getPopularMovies(@Query('page') page: number, @GetToken() token: any) {
    return this.movieService.getPopularMovies(token?.refreshToken, page);
  }

  @Get('/providers')
  @UseGuards(AuthGuard)
  async getProviders() {
    return this.movieService.getProviders();
  }

  @Get('/discover')
  @UseGuards(AuthGuard)
  async discoverMovies(
    @Query('page') page: number,
    @Query('providers') providers: string,
  ) {
    return this.movieService.discoverMovies(page, providers);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getMovieById(@Param('id') movieId: string): Promise<Movie> {
    const id = parseInt(movieId);
    return this.movieService.getMovieById(id);
  }
}
