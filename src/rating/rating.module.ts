import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { RatingRepository } from './rating.repository';

@Module({
  controllers: [RatingController],
  providers: [RatingService, RatingRepository],
})
export class RatingModule {}
