export type JwtConfigType = {
    secret: string;
    audience: string;
    issuer: string;
    accessTokenTtl: number;
};