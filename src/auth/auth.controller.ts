import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Res,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { GetToken, TokenCookieType } from './get-token.decorator';
import { User } from '@prisma/client';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { RoleGuard } from './role/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiCookieAuth()
@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }

  @Get('/users')
  async getAllUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Get('/loginbytoken')
  async loginByToken(
    @Res({ passthrough: true }) response: any,
    @Query('token') token: string,
  ): Promise<User> {
    return this.authService.loginByToken(token, response);
  }

  @Post('/refresh')
  async refresh(
    @Res({ passthrough: true }) response: any,
    @GetToken() accessTokens: TokenCookieType,
  ): Promise<void> {
    if (
      !accessTokens ||
      (!accessTokens.accessToken && !accessTokens.refreshToken)
    ) {
      throw new UnauthorizedException('No token provided');
    }

    return this.authService.refresh(accessTokens, response);
  }

  @Post('/signin')
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('/appsignin')
  async appSignIn(@Body() loginDto: LoginDto) {
    return this.authService.appSignIn(loginDto);
  }

  @UseGuards(AuthGuard(), RoleGuard)
  @SetMetadata('roles', ['ADMINISTRATOR'])
  @Patch('/:id')
  async updateUserRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.authService.updateUserRole(id, updateUserRoleDto);
  }
}
