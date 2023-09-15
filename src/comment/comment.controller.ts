import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '../auth/authGuard';
import { commentMovieDto } from './dto/createComment.dto';
import { LikeCommentDto } from './dto/likeComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async commentMovie(@Body() commentMovieDto: commentMovieDto): Promise<void> {
    return this.commentService.commentMovie(commentMovieDto);
  }

  @Post('/like')
  @UseGuards(AuthGuard)
  async likeComment(@Body() likeCommentDto: LikeCommentDto): Promise<void> {
    return this.commentService.likeComment(likeCommentDto);
  }
}
