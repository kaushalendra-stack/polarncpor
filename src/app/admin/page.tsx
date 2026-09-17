"use client";
import { useState, useEffect } from "react";
import {
  Lock,
  LogIn,
  LogOut,
  LayoutDashboard,
  Database,
  FileText,
  Megaphone,
  Camera,
  Compass,
  Sparkles,
  CalendarClock,
  TrendingUp,
  Eye,
  Copy,
  Check,
  Loader,
} from "lucide-react";

type Tab = "dashboard" | "content" | "ai";

interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "scientist" | "student" | "viewer";
}

const mockStats = [
  { label: "Total Expeditions", value: "45+", icon: Compass, color: "bg-sky-100 text-sky-700" },
  { label: "Datasets", value: "850+", icon: Database, color: "bg-violet-100 text-violet-700" },
  { label: "Publications", value: "2,400", icon: FileText, color: "bg-amber-100 text-amber-700" },
  { label: "Media Assets", value: "12,500", icon: Camera, color: "bg-emerald-100 text-emerald-700" },
  { label: "Social Posts This Month", value: "24", icon: Megaphone, color: "bg-rose-100 text-rose-700" },
  { label: "Total Portal Views", value: "48,000", icon: Eye, color: "bg-cyan-100 text-cyan-700" },
];

const mockSocialPosts = [
  {
    platform: "Twitter",
    scheduled: "2026-09-16 10:00 AM",
    content: "🧊 46th ISEA update: Winter-over crew at Bharati completes balloon launch #500 this season! Read the full report → ncpor.res.in/isea-46",
    status: "scheduled",
  },
  {
    platform: "Instagram",
    scheduled: "2026-09-16 02:00 PM",
    content: "📸 NEW: Stunning aurora australis captured over Bharati station by our winter-over team during the 45th ISEA season. #Antarctica #Aurora",
    status: "scheduled",
  },
  {
    platform: "Facebook",
    scheduled: "2026-09-15 09:00 AM",
    content: "Dr. Sunita Dangwal leads the 11th Indian Arctic Expedition at Himadri station, Ny-Ålesund. Follow the journey of our scientists in the high Arctic...",
    status: "published",
  },
];

const aiTopics = [
  {
    input: "46th ISEA winter-over team achieves 500 balloon launches milestone",
    output:
      "🎈 500 and counting! Our winter-over scientists at Bharati station, Antarctica have completed their 500th meteorological balloon launch this season. Each launch captures vital upper-atmosphere data that feeds our ozone and radiation monitoring wall. 🌏 #IndianInAntarctica #PolarScience #NCPOR",
  },
  {
    input: "New drone-based glacier mapping programme launched from Himansh",
    output:
      "🏔️ Drones are mapping the Himalayan cryosphere like never before! A new programme at Himansh station is using high-resolution UAV surveys to track Chhota Shigri glacier's mass balance with unprecedented precision. Science in motion. 🛰️ #HimalayanCryosphere #NCPOR",
  },
];

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [email, setEmail] = useState("admin@ncpor.gov.in");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [aiInput, setAiInput] = useState(aiTopics[0].input);
  const [aiOutput, setAiOutput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store" });
        const data = await res.json();
        if (alive && data.user) {
          setUser(data.user);
          setLoggedIn(true);
        }
      } catch {
        // stay logged out
      } finally {
        if (alive) setCheckingSession(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLoginError("");
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
        setLoginError(data.error || "Login failed. Please try again.");
      }
    } catch {
      setLoginError("Network error. Please try again.");
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

  const handleGenerate = () => {
    setGenerating(true);
    setAiOutput("");
    const topic = aiTopics.find((t) => t.input === aiInput) || aiTopics[0];
    let i = 0;
    const text = topic.output;
    const interval = setInterval(() => {
      i += 2;
      setAiOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 15);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(aiOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (checkingSession)
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
        <div className="w-full max-w-sm">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-polar-600 to-ice-500 text-white shadow-sm">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-polar-950">Admin Login</h1>
              <p className="mt-1 text-sm text-slate-500">
                NCPOR Content Management System
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                  Email
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
              {loginError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600"
                >
                  {loginError}
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
                Default: admin@ncpor.gov.in / NCPOR@admin2026
              </p>
            </form>
          </div>
        </div>
      </div>
    );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "content", label: "Content Feed", icon: FileText },
    { id: "ai", label: "AI Content Studio", icon: Sparkles },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-extrabold text-polar-950">
              NCPOR Admin Dashboard
            </h1>
            {user && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                  user.role === "admin"
                    ? "bg-polar-100 text-polar-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {user.role}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Signed in as {user?.name || user?.email || "Admin"} — manage content,
            view analytics and generate social posts
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="mb-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-polar-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "dashboard" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockStats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}
                >
                  <s.icon className="h-5 w-5" />
                </span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-polar-950">
                {s.value}
              </div>
              <div className="mt-0.5 text-xs font-medium text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "content" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-polar-950">
              <CalendarClock className="mr-1 inline h-4 w-4 text-polar-600" />
              Scheduled & Published Content
            </h2>
            {mockSocialPosts.map((post, i) => (
              <div
                key={i}
                className="mb-3 flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 last:mb-0"
              >
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                    post.platform === "Twitter"
                      ? "bg-sky-100 text-sky-700"
                      : post.platform === "Instagram"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {post.platform[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-700">
                      {post.platform}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{post.scheduled}</span>
                    <span
                      className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        post.status === "scheduled"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700">{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "ai" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-polar-950">
              <Sparkles className="h-5 w-5 text-amber-500" /> AI Content Generator
            </h2>

            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Topic / Summary
              </label>
              <select
                value={aiInput}
                onChange={(e) => {
                  setAiInput(e.target.value);
                  setAiOutput("");
                }}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
              >
                {aiTopics.map((t, i) => (
                  <option key={i} value={t.input}>
                    {t.input.slice(0, 60)}...
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Raw text (editable)
              </label>
              <textarea
                value={aiInput}
                onChange={(e) => {
                  setAiInput(e.target.value);
                  setAiOutput("");
                }}
                rows={4}
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 transition focus:border-polar-400 focus:ring-2 focus:ring-polar-200 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 text-sm font-bold text-white shadow transition hover:shadow-md disabled:opacity-70"
            >
              {generating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Social Post
                </>
              )}
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-polar-950">
              📱 Preview
            </h2>

            {aiOutput ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-xs font-bold text-white">
                      N
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        NCPOR Outreach
                      </div>
                      <div className="text-xs text-slate-400">@NCPOR_India</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                    {aiOutput}
                  </p>
                  <div className="mt-3 flex gap-4 text-xs text-slate-400">
                    <span>❤️ 0</span>
                    <span>🔁 0</span>
                    <span>💬 0</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy to clipboard
                    </>
                  )}
                </button>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-2 text-xs font-semibold text-slate-600">
                    Queue for scheduling
                  </div>
                  <div className="flex gap-2">
                    {["Twitter", "Instagram", "Facebook"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className="flex-1 rounded-lg bg-white border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-polar-400 hover:text-polar-600"
                      >
                        + {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
                <div className="mb-3 text-4xl">✨</div>
                <p className="text-sm font-semibold text-slate-600">
                  Generated content will appear here
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Select a topic and click Generate
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}