"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewModule = void 0;
const common_1 = require("@nestjs/common");
const view_controller_1 = require("./view.controller");
const view_service_1 = require("./view.service");
const view_repository_1 = require("./view.repository");
const movie_repository_1 = require("../movie/movie.repository");
let ViewModule = exports.ViewModule = class ViewModule {
};
exports.ViewModule = ViewModule = __decorate([
    (0, common_1.Module)({
        controllers: [view_controller_1.ViewController],
        providers: [view_service_1.ViewService, view_repository_1.ViewRepository, movie_repository_1.MovieRepository],
    })
], ViewModule);
//# sourceMappingURL=view.module.js.map