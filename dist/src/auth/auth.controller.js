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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const swagger_1 = require("@nestjs/swagger");
const get_token_decorator_1 = require("./get-token.decorator");
const update_user_role_dto_1 = require("./dto/update-user-role.dto");
const role_guard_1 = require("./role/role.guard");
const passport_1 = require("@nestjs/passport");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(registerDto) {
        return this.authService.signUp(registerDto);
    }
    async getAllUsers() {
        return this.authService.getAllUsers();
    }
    async loginByToken(response, token) {
        return this.authService.loginByToken(token, response);
    }
    async refresh(response, accessTokens) {
        if (!accessTokens ||
            (!accessTokens.accessToken && !accessTokens.refreshToken)) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        return this.authService.refresh(accessTokens, response);
    }
    async signIn(loginDto) {
        return this.authService.signIn(loginDto);
    }
    async appSignIn(loginDto) {
        return this.authService.appSignIn(loginDto);
    }
    async updateUserRole(id, updateUserRoleDto) {
        return this.authService.updateUserRole(id, updateUserRoleDto);
    }
};
__decorate([
    (0, common_2.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('/users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/loginbytoken'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginByToken", null);
__decorate([
    (0, common_2.Post)('/refresh'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, get_token_decorator_1.GetToken)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_2.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_2.Post)('/appsignin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "appSignIn", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)(), role_guard_1.RoleGuard),
    (0, common_1.SetMetadata)('roles', ['ADMINISTRATOR']),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_role_dto_1.UpdateUserRoleDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUserRole", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiCookieAuth)(),
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map