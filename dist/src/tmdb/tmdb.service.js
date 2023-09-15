"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TmdbService = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("./services/utils");
let TmdbService = exports.TmdbService = class TmdbService {
    constructor() {
        this.getDiscover = async ({ page, providers }) => {
            return await fetch(`${process.env.TMD_API_URL}/discover/movie?include_adult=false&include_video=false&language=es-ES&page=${page}&sort_by=popularity.desc&watch_region=ES&with_watch_monetization_types=flatrate&with_watch_providers=${providers}`, {
                ...utils_1.tmdbOptions,
            })
                .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
                .catch((err) => {
                throw new Error(err);
            });
        };
    }
    async getMovie(movieId) {
        return await fetch(`${process.env.TMD_API_URL}/movie/${movieId}?language=es-Es`, utils_1.tmdbOptions)
            .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
            .catch((err) => {
            throw new Error(err);
        });
    }
    async searchMovies(query) {
        return await fetch(`${process.env.TMD_API_URL}/search/movie?language=es-Es&query=${query}`, {
            ...utils_1.tmdbOptions,
        })
            .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
            .catch((err) => {
            throw new Error(err);
        });
    }
    async getPopularMovies(page) {
        return await fetch(`${process.env.TMD_API_URL}/movie/popular?language=es-Es&page=${page}&region=ES`, {
            ...utils_1.tmdbOptions,
        })
            .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
            .catch((err) => {
            throw new Error(err);
        });
    }
    async getProviders() {
        return await fetch(`${process.env.TMD_API_URL}/watch/providers/movie?language=es-Es&watch_region=ES`, {
            ...utils_1.tmdbOptions,
        })
            .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
            .catch((err) => {
            throw new Error(err);
        });
    }
};
exports.TmdbService = TmdbService = __decorate([
    (0, common_1.Injectable)()
], TmdbService);
//# sourceMappingURL=tmdb.service.js.map