import { Strategy } from 'passport-jwt';
import { JwtPayload } from './auth/interfaces/jwt-payload.interface';
import { AuthRepository } from './auth/auth.repository';
import { User } from '@prisma/client';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private authRepository;
    constructor(authRepository: AuthRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
