import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthRepository } from './auth.repository';
import jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { setAuthCookies } from './utils';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { MailService } from '../mail/mail.service';
import { TokenCookieType } from './get-token.decorator';
@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwt: JwtService,
    private mailService: MailService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.authRepository.findUsers();
  }
  async signUp(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    try {
      const savedUser = await this.authRepository.signUp({
        ...registerDto,
      });

      const payload: JwtPayload = {
        email: savedUser.email,
        username: savedUser.username,
      };

      const accessToken = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      await this.mailService.sendUserConfirmation(savedUser, accessToken);

      return { accessToken };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async signIn(loginDto: LoginDto) {
    const { email } = loginDto;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new ConflictException('Email does not exist');
    }

    try {
      const payload: {
        email: string;
      } = {
        email: user.email,
      };

      const token = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      await this.mailService.sendUserConfirmation(user, token);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async appSignIn(loginDto: LoginDto) {
    const { email } = loginDto;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new ConflictException('Email does not exist');
    }

    try {
      const payload: {
        email: string;
      } = {
        email: user.email,
      };

      const token = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
      });

      return { user, token };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
  async confirmUser(token: string) {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.authRepository.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async loginByToken(token: string, response): Promise<User> {
    const payload: JwtPayload = await this.jwt.verify(token);
    if (!payload) {
      throw new UnauthorizedException();
    }
    const user = await this.authRepository.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }

    setAuthCookies({ payload, response, jwt: this.jwt, isLogin: false });

    return user;
  }

  async refresh(accessTokens: TokenCookieType, response) {
    let payload: JwtPayload;
    payload = await this.jwt.verify(accessTokens?.accessToken);
    if (!payload) {
      payload = await this.jwt.verify(accessTokens?.refreshToken);
    }

    if (!payload) {
      throw new UnauthorizedException();
    }

    setAuthCookies({ payload, response, jwt: this.jwt, isLogin: false });
  }

  async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto) {
    return this.authRepository.updateUserRole(id, updateUserRoleDto);
  }
}
