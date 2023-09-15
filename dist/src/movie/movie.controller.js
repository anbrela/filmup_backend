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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const movie_service_1 = require("./movie.service");
const authGuard_1 = require("../auth/authGuard");
const get_token_decorator_1 = require("../auth/get-token.decorator");
let MovieController = exports.MovieController = class MovieController {
    constructor(movieService) {
        this.movieService = movieService;
    }
    async searchMovies(query) {
        return this.movieService.searchMovies(query);
    }
    async getPopularMovies(page, token) {
        return this.movieService.getPopularMovies(token?.refreshToken, page);
    }
    async getProviders() {
        return this.movieService.getProviders();
    }
    async discoverMovies(page, providers) {
        return this.movieService.discoverMovies(page, providers);
    }
    async getMovieById(movieId) {
        const id = parseInt(movieId);
        return this.movieService.getMovieById(id);
    }
};
__decorate([
    (0, common_1.Get)('/search'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "searchMovies", null);
__decorate([
    (0, common_1.Get)('/popular'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, get_token_decorator_1.GetToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getPopularMovies", null);
__decorate([
    (0, common_1.Get)('/providers'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getProviders", null);
__decorate([
    (0, common_1.Get)('/discover'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('providers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "discoverMovies", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "getMovieById", null);
exports.MovieController = MovieController = __decorate([
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
//# sourceMappingURL=movie.controller.js.map