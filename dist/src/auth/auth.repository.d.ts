import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findUsers(): Promise<User[]>;
    signUp(registerDto: RegisterDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<any>;
}
