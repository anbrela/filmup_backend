import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieRepository } from './movie.repository';
import { TmdbService } from '../tmdb/tmdb.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieRepository],
  exports: [MovieService],
})
export class MovieModule {}
