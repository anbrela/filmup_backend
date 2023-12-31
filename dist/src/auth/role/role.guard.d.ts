import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
export declare class RoleGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    matchRoles(roles: string[], userRoles: string[]): boolean;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
