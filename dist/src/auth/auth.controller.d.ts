import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenCookieType } from './get-token.decorator';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(registerDto: RegisterDto): Promise<{
        accessToken: string;
    }>;
    getAllUsers(): Promise<User[]>;
    loginByToken(response: any, token: string): Promise<User>;
    refresh(response: any, accessTokens: TokenCookieType): Promise<void>;
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
    updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<any>;
}
