"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Database,
  FileText,
  FlaskConical,
  Library,
  Loader,
  Lock,
  Microscope,
  Ruler,
  Ship,
  Sparkles,
  Tag,
} from "lucide-react";

type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "scientist" | "researcher" | "student";
};

const tools = [
  {
    title: "Field Notebooks",
    desc: "Draft, archive and link expedition notebooks and cruise reports to the knowledge repository.",
    href: "/expeditions",
    icon: FileText,
  },
  {
    title: "Sample & Instrument Registry",
    desc: "Register ice, water, sediment and biological samples with NCPOR sample identifiers.",
    href: "/datasets",
    icon: FlaskConical,
  },
  {
    title: "Data Collection Portal",
    desc: "Log real-time observations and readings from base stations and research vessels.",
    href: "/datasets",
    icon: Database,
  },
  {
    title: "Publication Tracker",
    desc: "Track preprints, peer-reviewed papers and expedition reports for the media feed.",
    href: "/publications",
    icon: Library,
  },
];

export default function ResearcherPage() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (alive && data?.user && ["researcher", "admin"].includes(data.user.role)) {
          setLoggedIn(true);
          setUser(data.user);
        }
      } catch {
        // session check failed — treated as logged out
      }
      if (alive) setChecking(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader className="h-7 w-7 animate-spin text-polar-500" aria-hidden="true" />
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-polar-950 text-white">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-polar-950">Researcher Portal</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            This workspace is for NCPOR researchers. Sign in to access your research dashboard.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-polar-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-polar-800"
          >
            Sign in <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <section className="bg-gradient-to-br from-polar-950 via-polar-900 to-polar-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-200">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> NCPOR · Research Workspace
          </span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Access your field notebooks, sample registry, data collection portal and publication
            tracker — all in one research workspace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.title}
                href={t.href}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-polar-300 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-polar-950 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-polar-950">{t.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{t.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
