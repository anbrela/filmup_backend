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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./auth.repository");
const jwt_1 = require("@nestjs/jwt");
const utils_1 = require("./utils");
const mail_service_1 = require("../mail/mail.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(authRepository, jwt, mailService) {
        this.authRepository = authRepository;
        this.jwt = jwt;
        this.mailService = mailService;
    }
    async getAllUsers() {
        return this.authRepository.findUsers();
    }
    async signUp(registerDto) {
        try {
            const savedUser = await this.authRepository.signUp({
                ...registerDto,
            });
            const payload = {
                email: savedUser.email,
                username: savedUser.username,
            };
            const accessToken = this.jwt.sign(payload, {
                secret: process.env.JWT_SECRET,
            });
            await this.mailService.sendUserConfirmation(savedUser, accessToken);
            return { accessToken };
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Email already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('Internal server error');
            }
        }
    }
    async signIn(loginDto) {
        const { email } = loginDto;
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new common_1.ConflictException('Email does not exist');
        }
        try {
            const payload = {
                email: user.email,
            };
            const token = this.jwt.sign(payload, {
                secret: process.env.JWT_SECRET,
            });
            await this.mailService.sendUserConfirmation(user, token);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
    async appSignIn(loginDto) {
        const { email } = loginDto;
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new common_1.ConflictException('Email does not exist');
        }
        try {
            const payload = {
                email: user.email,
            };
            const token = this.jwt.sign(payload, {
                secret: process.env.JWT_SECRET,
            });
            return { user, token };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Internal server error');
        }
    }
    async confirmUser(token) {
        const payload = await this.jwt.verify(token);
        if (!payload) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.authRepository.findByEmail(payload.email);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
    async loginByToken(token, response) {
        const payload = await this.jwt.verify(token);
        if (!payload) {
            throw new common_1.UnauthorizedException();
        }
        const user = await this.authRepository.findByEmail(payload.email);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        (0, utils_1.setAuthCookies)({ payload, response, jwt: this.jwt, isLogin: false });
        return user;
    }
    async refresh(accessTokens, response) {
        let payload;
        payload = await this.jwt.verify(accessTokens?.accessToken);
        if (!payload) {
            payload = await this.jwt.verify(accessTokens?.refreshToken);
        }
        if (!payload) {
            throw new common_1.UnauthorizedException();
        }
        (0, utils_1.setAuthCookies)({ payload, response, jwt: this.jwt, isLogin: false });
    }
    async updateUserRole(id, updateUserRoleDto) {
        return this.authRepository.updateUserRole(id, updateUserRoleDto);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map