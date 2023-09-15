import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { ViewRepository } from './view.repository';
import { MovieRepository } from '../movie/movie.repository';

@Module({
  controllers: [ViewController],
  providers: [ViewService, ViewRepository, MovieRepository],
})
export class ViewModule {}
