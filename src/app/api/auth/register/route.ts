import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { hashPassword } from "@/lib/auth";
import { createUser, getUserByEmail } from "@/lib/repository";

const ALLOWED_ROLES = ["student", "scientist", "researcher", "admin"] as const;
type Role = (typeof ALLOWED_ROLES)[number];

/** POST /api/auth/register — see src/app/api/auth/register/route.ts */
export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; password?: string; role?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const role = String(body.role || "").trim() as Role;

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email and password are required" },
      { status: 400 },
    );
  }
  if (!ALLOWED_ROLES.includes(role)) {
    return NextResponse.json(
      { error: "Please choose a valid portal role" },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }

  const { user: existing } = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json(
      { error: "That email is already registered — please sign in" },
      { status: 409 },
    );
  }

  // Students get instant access; scientist/researcher/admin await NCPOR approval.
  const status = role === "student" ? "active" : "pending";
  const passwordHash = await hashPassword(password);
  const ok = await createUser({
    id: randomUUID(),
    name,
    email,
    passwordHash,
    role,
    status,
  });
  if (!ok) {
    return NextResponse.json(
      { error: "Could not create account — please try again" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      account: { email, role, status },
      message:
        status === "active"
          ? "Account created — you can sign in now."
          : "Registration submitted. You can sign in once NCPOR approves your role.",
    },
    { status: 201 },
  );
}
