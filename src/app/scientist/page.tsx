"use client";
import { useState, useEffect } from "react";
import {
  Microscope,
  Lock,
  LogIn,
  LogOut,
  Database,
  FileText,
  FlaskConical,
  Upload,
  CheckCircle2,
  Loader,
  Ship,
  Library,
} from "lucide-react";
import Link from "next/link";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "scientist" | "student" | "viewer";
}

const quickTools = [
  { icon: Database, title: "Dataset Discovery", desc: "Browse 850+ NPDC datasets across atmosphere, oceans, cryosphere and more.", href: "/datasets" },
  { icon: FileText, title: "Publications Archive", desc: "Search 2,400+ peer-reviewed papers, reports and annual reviews.", href: "/publications" },
  { icon: Ship, title: "Expedition Archives", desc: "Full Indian Antarctic & Arctic expedition history since 1981.", href: "/expeditions" },
  { icon: Library, title: "Open Data API", desc: "Machine-readable access for research scripts and dashboards.", href: "/api-docs" },
];

export default function ScientistPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [email, setEmail] = useState("scientist@ncpor.gov.in");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (alive && data.user && (data.user.role === "scientist" || data.user.role === "admin")) {
          setUser(data.user);
          setLoggedIn(true);
        }
      } catch {
        // stay logged out
      } finally {
        if (alive) setChecking(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        setLoggedIn(true);
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // ignore
    }
    setUser(null);
    setLoggedIn(false);
  };

  if (checking)
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <Loader className="h-8 w-8 animate-spin text-polar-600" aria-hidden="true" />
          <p className="text-sm font-medium">Checking session…</p>
        </div>
      </div>
    );

  if (!loggedIn)
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-sm pb-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-polar-600 to-ice-500 text-white shadow-sm">
                <Microscope className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-polar-950">Scientist Portal</h1>
              <p className="mt-1 text-sm text-slate-500">
                Access NCPOR data &amp; publications corporates
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  NCPOR email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 transition focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
                />
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-polar-600 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-polar-700 disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" /> {submitting ? "Signing in…" : "Sign In"}
              </button>
              <p className="text-center text-xs text-slate-400">
                Default: scientist@ncpor.gov.in / Scientist@2026
              </p>
            </form>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Looking for the student hub?{" "}
            <Link href="/student" className="font-semibold text-polar-600 underline">
              Open Student Portal
            </Link>
          </p>
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-polar-950 to-polar-800 p-6 text-white">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-polar-300">
            <Microscope className="h-3.5 w-3.5" aria-hidden="true" /> Researcher Workspace
          </div>
          <h1 className="text-2xl font-extrabold">Welcome, {user?.name || "Researcher"}</h1>
          <p className="mt-1 text-sm text-slate-300">
            Signed in as {user?.email} · {user?.role}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickTools.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-polar-700">
              <t.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="font-bold text-polar-950 group-hover:text-polar-700">{t.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{t.desc}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Data submission */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-polar-950">
            <Upload className="h-4 w-4 text-polar-600" aria-hidden="true" /> Submit Research Output
          </h2>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="text"
              placeholder="Dataset / paper title"
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
            />
            <select className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm transition focus:border-polar-400 focus:outline-none">
              <option>Research Paper</option>
              <option>Dataset submission</option>
              <option>Expedition report</option>
              <option>Field photograph</option>
            </select>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-polar-600 py-2.5 text-xs font-bold text-white transition hover:bg-polar-700"
            >
              <FlaskConical className="h-4 w-4" aria-hidden="true" /> Submit for moderation
            </button>
          </form>
          {submitted && (
            <p className="mt-3 flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Submitted — an NCPOR
              moderator will review it.
            </p>
          )}
        </div>

        {/* Session info */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold text-polar-950">
            <Lock className="h-4 w-4 text-polar-600" aria-hidden="true" /> Access Rights
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Read access to NPDC open datasets
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Public API (no key required)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Submit expedition &amp; publication records
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Access scientific datasets restricted tier
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}