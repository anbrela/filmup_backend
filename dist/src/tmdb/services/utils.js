"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmdbOptions = void 0;
exports.tmdbOptions = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMD_API_KEY}`,
    },
};
//# sourceMappingURL=utils.js.map