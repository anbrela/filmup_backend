import { IsNotEmpty, IsString } from 'class-validator';

export class LikeCommentDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  commentId: string;
}
