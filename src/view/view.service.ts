import { Injectable } from '@nestjs/common';
import { ViewRepository } from './view.repository';
import { ViewMovieDto } from './dto/viewMovie.dto';

@Injectable()
export class ViewService {
  constructor(private viewRepository: ViewRepository) {}

  async viewMovie(viewMovieDto: ViewMovieDto) {
    return this.viewRepository.viewMovie(viewMovieDto);
  }
}
