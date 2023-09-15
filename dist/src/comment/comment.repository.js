"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let CommentRepository = exports.CommentRepository = class CommentRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async commentMovie(commentMovieDto) {
        try {
            await this.prismaService.comment.create({
                data: {
                    comment: commentMovieDto.comment,
                    movieId: commentMovieDto.movieId,
                    userId: commentMovieDto.userId,
                },
            });
        }
        catch (e) {
            console.log('error', e);
            throw new common_1.InternalServerErrorException();
        }
    }
    async likeComment(likeCommentDto) {
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
            }
            else {
                await this.prismaService.commentLike.create({
                    data: {
                        userId: likeCommentDto.userId,
                        commentId: likeCommentDto.commentId,
                    },
                });
            }
        }
        catch (e) {
            console.log('error', e);
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.CommentRepository = CommentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentRepository);
//# sourceMappingURL=comment.repository.js.map