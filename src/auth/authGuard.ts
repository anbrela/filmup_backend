import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['access-token'];

    const refreshToken = request.cookies['refresh-token'];

    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.confirmUser(accessToken);
    return !!user;
  }
}
