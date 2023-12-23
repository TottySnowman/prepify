import { jwtVerify } from "jose";
import jwt, { JwtPayload } from "jsonwebtoken";
interface SignOption {
  expiresIn?: string | number;
}
export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable not set");
  }

  return new TextEncoder().encode(secret);
}
const DEFAULT_SIGN_OPTIONS: SignOption = {
  expiresIn: "1h",
};
export function signJWTAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTIONS
) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret!, options);

  return token;
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (e) {
    console.log(e);
    return null;
  }
}
