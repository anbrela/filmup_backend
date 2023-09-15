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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthRepository = exports.AuthRepository = class AuthRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUsers() {
        return this.prisma.user.findMany();
    }
    async signUp(registerDto) {
        return this.prisma.user.create({
            data: {
                ...registerDto,
            },
        });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                roles: {
                    select: {
                        role: true,
                    },
                },
            },
        });
    }
    async updateUserRole(id, updateUserRoleDto) {
        const { roles } = updateUserRoleDto;
        const appRoles = await this.prisma.role.findMany();
        const formattedRoles = roles.map((role) => appRoles.find((appRole) => appRole.role === role));
        return this.prisma.user.update({
            where: { id },
            data: {
                roles: {
                    deleteMany: {},
                    create: formattedRoles.map((role) => ({
                        roleId: role.id,
                    })),
                },
            },
            include: {
                roles: {
                    select: {
                        role: true,
                    },
                },
            },
        });
    }
};
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthRepository);
//# sourceMappingURL=auth.repository.js.map