import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { MailService } from '../mail/mail.service';
import { TokenCookieType } from './get-token.decorator';
export declare class AuthService {
    private authRepository;
    private jwt;
    private mailService;
    constructor(authRepository: AuthRepository, jwt: JwtService, mailService: MailService);
    getAllUsers(): Promise<User[]>;
    signUp(registerDto: RegisterDto): Promise<{
        accessToken: string;
    }>;
    signIn(loginDto: LoginDto): Promise<void>;
    appSignIn(loginDto: LoginDto): Promise<{
        user: import("@prisma/client/runtime").GetResult<{
            id: string;
            username: string;
            email: string;
            createdAt: Date;
        }, unknown> & {};
        token: string;
    }>;
    confirmUser(token: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        username: string;
        email: string;
        createdAt: Date;
    }, unknown> & {}>;
    loginByToken(token: string, response: any): Promise<User>;
    refresh(accessTokens: TokenCookieType, response: any): Promise<void>;
    updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<any>;
}
