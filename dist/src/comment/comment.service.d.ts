import { CommentRepository } from './comment.repository';
import { commentMovieDto } from './dto/createComment.dto';
import { LikeCommentDto } from './dto/likeComment.dto';
export declare class CommentService {
    private commentRepository;
    constructor(commentRepository: CommentRepository);
    commentMovie(commentMovieDto: commentMovieDto): Promise<void>;
    likeComment(likeCommentDto: LikeCommentDto): Promise<void>;
}
