import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  signSession,
  verifyPassword,
  type SessionUser,
} from "@/lib/auth";
import { getUserByEmail } from "@/lib/repository";
import { isDbAvailable } from "@/lib/db";

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Authenticates against DB (or dev fallback credentials) and sets a JWT cookie.
 */
export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  let user: SessionUser | null = null;
  let mode: "db" | "fallback" = "fallback";
  let dbAvailable = false;

  // Try database first
  if (await isDbAvailable()) {
    dbAvailable = true;
    const { user: dbUser } = await getUserByEmail(email);
    if (dbUser) {
      const ok = await verifyPassword(password, dbUser.passwordHash);
      if (ok) {
        user = {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role,
        };
        mode = "db";
      }
    }
  }

  // Dev fallback credentials — only when the database is unavailable, so a
  // presumably stronger DB password is never silently bypassed in production.
  if (!user && !dbAvailable) {
    const fallbackAccounts: {
      role: SessionUser["role"];
      email: string;
      password: string;
      name: string;
      id: string;
    }[] = [
      {
        role: "admin",
        name: "Administrator",
        id: "fallback-admin",
        email: process.env.ADMIN_EMAIL || "admin@ncpor.gov.in",
        password: process.env.ADMIN_PASSWORD || "NCPOR@admin2026",
      },
      {
        role: "scientist",
        name: "Scientist 01",
        id: "fallback-scientist",
        email: process.env.SCIENTIST_EMAIL || "scientist@ncpor.gov.in",
        password: process.env.SCIENTIST_PASSWORD || "Scientist@2026",
      },
    ];

    const match = fallbackAccounts.find(
      (a) => a.email.toLowerCase() === email && a.password === password,
    );
    if (match) {
      user = {
        id: match.id,
        name: match.name,
        email: match.email,
        role: match.role,
      };
      mode = "fallback";
    }
  }

  if (!user) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = await signSession(user);

  const res = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
    mode,
    message:
      mode === "fallback"
        ? "Using fallback credentials — set DATABASE_URL for real authentication"
        : "Authenticated via database",
  });

  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });

  return res;
}