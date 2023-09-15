import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ViewService } from './view.service';
import { ViewMovieDto } from './dto/viewMovie.dto';
import { AuthGuard } from '../auth/authGuard';

@Controller('view')
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Post()
  @UseGuards(AuthGuard)
  async viewMovie(@Body() viewMovieDto: ViewMovieDto): Promise<void> {
    return this.viewService.viewMovie(viewMovieDto);
  }
}
