import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ChevronLeft,
  GraduationCap,
  KeyRound,
  Lock,
  Microscope,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Login — PolarNCPOR | NCPOR, Government of India",
  description:
    "Sign in to the PolarNCPOR portals — Student learning hub, Scientist data workspace, or NCPOR Administrator console.",
};

type RoleKey = "student" | "scientist" | "admin";

interface Role {
  key: RoleKey;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  href: string;
  image: string;
  accent: "sky" | "indigo" | "amber";
  public: boolean;
  features: string[];
  access: string;
}

const roles: Role[] = [
  {
    key: "student",
    title: "Student",
    tagline: "Learn polar science",
    description:
      "A curated learning hub for students — polar facts, station tours, quizzes and classroom-ready resources. No account needed.",
    icon: GraduationCap,
    cta: "Open Student Hub",
    href: "/student",
    image: "/images/student.svg",
    accent: "sky",
    public: true,
    features: ["Quizzes", "Station tours", "Classroom packs"],
    access: "No sign-in required",
  },
  {
    key: "scientist",
    title: "Scientist / Researcher",
    tagline: "Work with NCPOR data",
    description:
      "A private workspace for scientists — dataset discovery, expedition archives, publications and data submission tools.",
    icon: Microscope,
    cta: "Open Scientist Portal",
    href: "/scientist",
    image: "/images/scientist.svg",
    accent: "indigo",
    public: false,
    features: ["Dataset discovery", "Expedition archives", "Data submission"],
    access: "NCPOR credentials",
  },
  {
    key: "admin",
    title: "Administrator",
    tagline: "Manage the portal",
    description:
      "NCPOR content management console — moderation, publishing, analytics and the AI content studio.",
    icon: ShieldCheck,
    cta: "Open Admin Console",
    href: "/admin",
    image: "/images/admin.svg",
    accent: "amber",
    public: false,
    features: ["Moderation", "Publishing", "Analytics"],
    access: "NCPOR credentials",
  },
];

const accentStyles: Record<
  Role["accent"],
  { badge: string; ring: string; button: string; glow: string }
> = {
  sky: {
    badge: "bg-sky-50 text-sky-700 ring-sky-200",
    ring: "hover:border-sky-300",
    button: "bg-sky-600 hover:bg-sky-700",
    glow: "bg-sky-400/20",
  },
  indigo: {
    badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    ring: "hover:border-indigo-300",
    button: "bg-indigo-600 hover:bg-indigo-700",
    glow: "bg-indigo-400/20",
  },
  amber: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    ring: "hover:border-amber-300",
    button: "bg-amber-600 hover:bg-amber-700",
    glow: "bg-amber-400/20",
  },
};

const steps = [
  {
    title: "Pick your portal",
    body: "Student, Scientist or Administrator — choose the experience that matches how you work with polar data.",
  },
  {
    title: "Identify yourself",
    body: "Scientists and administrators sign in with NCPOR-issued credentials. Students can explore the learning hub freely.",
  },
  {
    title: "Start exploring",
    body: "Access datasets, publications, station tours and expedition archives — all in one place.",
  },
];

export default function LoginPage() {
  return (
    <div className="bg-white pb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "PolarNCPOR Portals",
          description:
            "Student, Scientist and Administrator portals of the PolarNCPOR portal — National Centre for Polar and Ocean Research (NCPOR), Government of India.",
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-polar-950 via-polar-900 to-polar-800 text-white">
        <div
          className="pointer-events-none absolute -top-32 -left-24 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-polar-500/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Back to PolarNCPOR home
          </Link>

          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-200">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> NCPOR · MoES
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Choose your portal
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
                One PolarNCPOR account, three ways in. Students learn, scientists work with
                NCPOR data, and administrators keep the portal running.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-sky-300" aria-hidden="true" />
                  NCPOR-issued credentials
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-sky-300" aria-hidden="true" />
                  Encrypted sessions
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-sky-300" aria-hidden="true" />
                  Open access for students
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role cards */}
      <section
        className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Portal options"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {roles.map((role) => {
            const styles = accentStyles[role.accent];
            return (
              <article
                key={role.key}
                className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-lg shadow-polar-950/5 transition duration-200 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-50">
                  <Image
                    src={role.image}
                    alt=""
                    width={200}
                    height={200}
                    className="absolute -right-4 bottom-0 w-44 transition duration-300 group-hover:-translate-y-1"
                  />
                  <div
                    className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl ${styles.glow}`}
                  />
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ring-1 ${styles.badge}`}
                  >
                    {role.public ? "Open access" : "Secure login"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="flex items-center gap-2 text-lg font-bold text-polar-950">
                    <role.icon className="h-5 w-5 text-polar-600" aria-hidden="true" />
                    {role.title}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-slate-400">
                    {role.tagline}
                  </p>

                  <p className="mt-4 mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                    {role.description}
                  </p>

                  <ul className="mb-6 space-y-1.5" aria-hidden="true">
                    {role.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="h-1 w-3 rounded-full bg-current opacity-40" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mb-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    {role.access}
                  </div>

                  <Link
                    href={role.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-sm transition ${styles.button}`}
                  >
                    {role.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* How signing in works */}
      <section
        className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-labelledby="how-heading"
      >
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 sm:p-10">
          <h2
            id="how-heading"
            className="text-center text-2xl font-extrabold text-polar-950 sm:text-3xl"
          >
            How signing in works
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Three quick steps and you will be inside your portal.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-polar-950 text-white sm:mx-0">
                  <span className="text-lg font-black">{i + 1}</span>
                </div>
                <h3 className="mt-4 font-bold text-polar-950">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust footer */}
      <section
        className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Access help"
      >
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-polar-950 px-8 py-8 text-center text-white sm:flex-row sm:text-left">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-8 w-8 text-sky-300" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold">Trouble signing in?</h2>
              <p className="mt-0.5 max-w-xl text-sm text-slate-300">
                NCPOR issues credentials for the scientist and administrator portals. Students
                can explore without an account. Contact the portal team for help.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-polar-950 shadow-sm transition hover:bg-slate-100"
          >
            Contact NCPOR <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
