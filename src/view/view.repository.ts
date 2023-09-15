import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ViewMovieDto } from './dto/viewMovie.dto';
import { MovieRepository } from '../movie/movie.repository';

@Injectable()
export class ViewRepository {
  constructor(
    private prismaService: PrismaService,
    private movieRepository: MovieRepository,
  ) {}

  async removeView(movieId, userId) {
    await this.prismaService.view.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
  }

  async viewMovie(viewMovieDto: ViewMovieDto) {
    await this.movieRepository.getMovieById(viewMovieDto.movieId);

    const isAlreadyViewed = await this.prismaService.view.findUnique({
      where: {
        userId_movieId: {
          userId: viewMovieDto.userId,
          movieId: viewMovieDto.movieId,
        },
      },
    });

    if (isAlreadyViewed) {
      await this.removeView(viewMovieDto.movieId, viewMovieDto.userId);
      return;
    }

    try {
      await this.prismaService.view.create({
        data: {
          movieId: viewMovieDto.movieId,
          userId: viewMovieDto.userId,
          viewedAt: viewMovieDto?.view?.viewedAt,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new InternalServerErrorException('Movie already viewed');
      }
      throw new InternalServerErrorException();
    }
  }
}
