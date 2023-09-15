import { PrismaService } from '../prisma/prisma.service';
import { commentMovieDto } from './dto/createComment.dto';
import { LikeCommentDto } from './dto/likeComment.dto';
export declare class CommentRepository {
    private prismaService;
    constructor(prismaService: PrismaService);
    commentMovie(commentMovieDto: commentMovieDto): Promise<void>;
    likeComment(likeCommentDto: LikeCommentDto): Promise<void>;
}
