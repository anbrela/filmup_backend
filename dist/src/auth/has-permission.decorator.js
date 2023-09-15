"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasPermission = void 0;
const common_1 = require("@nestjs/common");
exports.hasPermission = (0, common_1.createParamDecorator)((_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return {
        accessToken: req.cookies['access-token'],
        refreshToken: req.cookies['refresh-token'],
    };
});
//# sourceMappingURL=has-permission.decorator.js.map