import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type TokenCookieType = {
  accessToken: string;
  refreshToken: string;
};

export const GetToken = createParamDecorator(
  (_data, ctx: ExecutionContext): TokenCookieType => {
    const req = ctx.switchToHttp().getRequest();

    return {
      accessToken: req.cookies['access-token'],
      refreshToken: req.cookies['refresh-token'],
    };
  },
);
