"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const mail_module_1 = require("./mail/mail.module");
const config_1 = require("@nestjs/config");
const movie_controller_1 = require("./movie/movie.controller");
const movie_module_1 = require("./movie/movie.module");
const comment_module_1 = require("./comment/comment.module");
const rating_module_1 = require("./rating/rating.module");
const view_module_1 = require("./view/view.module");
const tmdb_module_1 = require("./tmdb/tmdb.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            mail_module_1.MailModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            movie_module_1.MovieModule,
            comment_module_1.CommentModule,
            rating_module_1.RatingModule,
            view_module_1.ViewModule,
            tmdb_module_1.TmdbModule,
        ],
        controllers: [movie_controller_1.MovieController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map