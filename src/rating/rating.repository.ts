import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RateMovieDto } from './dto/rateMovie.dto';

@Injectable()
export class RatingRepository {
  constructor(private prismaService: PrismaService) {}

  async rateMovie(rateMovieDto: RateMovieDto) {
    try {
      const { movieId, userId, rating } = rateMovieDto;
      await this.prismaService.rating.upsert({
        where: {
          userId,
        },
        update: {
          rating,
        },
        create: {
          rating,
          movieId,
          userId,
        },
      });
    } catch (e) {}
  }
}
