import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { MovieController } from './movie/movie.controller';
import { MovieModule } from './movie/movie.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';
import { ViewModule } from './view/view.module';
import { TmdbModule } from './tmdb/tmdb.module';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MovieModule,
    CommentModule,
    RatingModule,
    ViewModule,
    TmdbModule,
  ],
  controllers: [MovieController],
})
export class AppModule {}
