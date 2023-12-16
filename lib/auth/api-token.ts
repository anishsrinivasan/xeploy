import { API_TOKEN_SECRET } from "@/constants";
import type { NextRequest } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

export type TokenPayload = {
  projectId: string;
  envId: string;
};

export async function generateToken(payload: TokenPayload) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setJti(nanoid())
    .sign(new TextEncoder().encode(API_TOKEN_SECRET));

  return jwt;
}

export class AuthError extends Error {}

export async function verifyAPIToken(request: NextRequest) {
  const authorization = request.headers.get("authorization"); // Assuming the token is passed in the Authorization header
  const token = authorization?.split("Bearer ")[1] ?? null;

  if (!token) throw new AuthError("Token Missing");

  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(API_TOKEN_SECRET)
    );
    return verified.payload as TokenPayload;
  } catch (err) {
    console.log("verifyAPIToken", err);
    throw new AuthError("Token not valid!");
  }
}
