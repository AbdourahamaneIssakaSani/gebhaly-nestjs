export type JwtPayload = {
  sub: string;
  iat: number;
  exp: number;
  email: string;
  role: string;
};
