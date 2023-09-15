export type TokenCookieType = {
    accessToken: string;
    refreshToken: string;
};
export declare const GetToken: (...dataOrPipes: any[]) => ParameterDecorator;
