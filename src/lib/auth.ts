import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export type Role =
  | "admin"
  | "editor"
  | "researcher"
  | "scientist"
  | "student"
  | "viewer";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export const SESSION_COOKIE = "polar_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const encodedSecret = (): Uint8Array =>
  new TextEncoder().encode(
    process.env.SESSION_SECRET || "polar-portal-dev-secret-do-not-use-in-prod",
  );

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function signSession(user: SessionUser): Promise<string> {
  return new SignJWT({ name: user.name, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL_SECONDS)
    .sign(encodedSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret());
    if (!payload.sub || typeof payload.role !== "string") return null;
    return {
      id: payload.sub,
      name: (payload.name as string) || "User",
      email: (payload.email as string) || "",
      role: payload.role as Role,
    };
  } catch {
    return null;
  }
}