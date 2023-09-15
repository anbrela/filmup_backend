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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const movie_repository_1 = require("./movie.repository");
const auth_service_1 = require("../auth/auth.service");
let MovieService = exports.MovieService = class MovieService {
    constructor(movieRepository, authService) {
        this.movieRepository = movieRepository;
        this.authService = authService;
    }
    async getMovieById(movieId) {
        return this.movieRepository.getMovieById(movieId);
    }
    async searchMovies(query) {
        return this.movieRepository.searchMovies(query);
    }
    async getProviders() {
        const providers = await this.movieRepository.getProviders();
        const mostPopular = [337, 8, 119, 2, 63, 384, 149];
        return providers?.results?.filter((provider) => mostPopular.includes(provider?.provider_id));
    }
    async discoverMovies(page, providers) {
        return this.movieRepository.discoverMovies(page, providers);
    }
    async getPopularMovies(token, page) {
        const user = await this.authService.confirmUser(token);
        return this.movieRepository.getPopularMovies(user?.id, page);
    }
};
exports.MovieService = MovieService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movie_repository_1.MovieRepository,
        auth_service_1.AuthService])
], MovieService);
//# sourceMappingURL=movie.service.js.map