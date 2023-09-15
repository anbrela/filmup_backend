import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { commentMovieDto } from './dto/createComment.dto';
import { LikeCommentDto } from './dto/likeComment.dto';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async commentMovie(commentMovieDto: commentMovieDto): Promise<void> {
    return this.commentRepository.commentMovie(commentMovieDto);
  }

  async likeComment(likeCommentDto: LikeCommentDto): Promise<void> {
    return this.commentRepository.likeComment(likeCommentDto);
  }
}
