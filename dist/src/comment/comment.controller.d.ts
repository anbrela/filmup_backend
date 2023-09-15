import { CommentService } from './comment.service';
import { commentMovieDto } from './dto/createComment.dto';
import { LikeCommentDto } from './dto/likeComment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    commentMovie(commentMovieDto: commentMovieDto): Promise<void>;
    likeComment(likeCommentDto: LikeCommentDto): Promise<void>;
}
