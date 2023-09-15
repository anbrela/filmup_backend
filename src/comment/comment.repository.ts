import { PrismaService } from '../prisma/prisma.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { commentMovieDto } from './dto/createComment.dto';
import { LikeCommentDto } from './dto/likeComment.dto';

@Injectable()
export class CommentRepository {
  constructor(private prismaService: PrismaService) {}

  async commentMovie(commentMovieDto: commentMovieDto) {
    try {
      await this.prismaService.comment.create({
        data: {
          comment: commentMovieDto.comment,
          movieId: commentMovieDto.movieId,
          userId: commentMovieDto.userId,
        },
      });
    } catch (e) {
      console.log('error', e);
      throw new InternalServerErrorException();
    }
  }

  async likeComment(likeCommentDto: LikeCommentDto) {
    try {
      const liked = await this.prismaService.commentLike.findUnique({
        where: {
          userId: likeCommentDto.userId,
        },
      });

      if (liked) {
        await this.prismaService.commentLike.delete({
          where: {
            userId: likeCommentDto.userId,
          },
        });
      } else {
        await this.prismaService.commentLike.create({
          data: {
            userId: likeCommentDto.userId,
            commentId: likeCommentDto.commentId,
          },
        });
      }
    } catch (e) {
      console.log('error', e);
      throw new InternalServerErrorException();
    }
  }
}
