"use client";
import { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  Snowflake,
  Waves,
  Wind,
  Compass,
  Trophy,
  CloudMoon,
  Star,
  Check,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const stations = [
  { name: "Maitri", region: "Antarctica", since: 1989, fact: "India's wintering over station at Schirmacher Oasis — ionosphere and earth science hub." },
  { name: "Bharati", region: "Antarctica", since: 2012, fact: "Modern facility at Larsemann Hills focused on climate, geology and ocean research." },
  { name: "Himadri", region: "Arctic", since: 2008, fact: "India's Arctic research station at Ny-Ålesund, Svalbard — used for 1-2 month summer campaigns." },
  { name: "Himansh", region: "Himalaya", since: 2016, fact: "High-altitude station in the Himalaya studying cryosphere, glaciers and glacial lakes." },
];

const facts = [
  { icon: Snowflake, text: "Antarctica holds about 90% of Earth's ice and 70% of its fresh water." },
  { icon: Wind, text: "The windiest place on Earth is Antarctica — gusts can top 300 km/h at the coast." },
  { icon: Waves, text: "The Southern Ocean encircles Antarctica and connects the Atlantic, Indian and Pacific oceans." },
  { icon: Star, text: "Antarctica is a natural science laboratory — a continent for peace and research since 1961." },
  { icon: Compass, text: "India has run the Indian Antarctic Programme continuously since 1981 — over 45 expeditions." },
  { icon: CloudMoon, text: "The Antarctic ozone hole was discovered in 1985; Indian scientists continue monitoring it." },
];

const quizQa = [
  {
    q: "Which year did India's FIRST Antarctic expedition set sail?",
    options: ["1961", "1975", "1981", "1991"],
    answer: 2,
    explain:
      "India's first expedition (IAE-1), led by Dr S.Z. Qasim, reached Antarctica in 1981.",
  },
  {
    q: "How many research stations does India operate in Antarctica?",
    options: ["1", "2", "3", "4"],
    answer: 1,
    explain: "Maitri and Bharati are India's two active Antarctic stations.",
  },
  {
    q: "What does the Southern Ocean satellite-monitor most closely?",
    options: ["Sea ice extent", "Crop yields", "Snow fall in metros", "Ocean plastic"],
    answer: 0,
    explain:
      "Satellites track Antarctic sea ice extent, which peaks each September.",
  },
  {
    q: "What is the primary value of glaciers for scientists?",
    options: ["Cold storage", "Climate archives", "Irrigation", "Mining"],
    answer: 1,
    explain:
      "Ice cores preserve thousands of years of temperature, CO₂ and dust records.",
  },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQa[step];

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (step + 1 >= quizQa.length) {
      setDone(true);
    } else {
      setStep((s) => s + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  if (done)
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <Trophy className="mx-auto mb-3 h-12 w-12 text-amber-400" aria-hidden="true" />
        <h3 className="mb-1 text-2xl font-extrabold text-polar-950">
          You scored {score}/{quizQa.length}
        </h3>
        <p className="mb-6 text-sm text-slate-600">
          {score === quizQa.length
            ? "Perfect! You are a true polar expert. 🐧"
            : score >= 2
              ? "Great job — keep exploring the portal to learn more!"
              : "Good start! Visit the Observatory and Expeditions pages to level up."}
        </p>
        <button
          type="button"
          onClick={restart}
          className="rounded-xl bg-polar-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-polar-700"
        >
          Play again
        </button>
      </div>
    );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>
          Question {step + 1} of {quizQa.length}
        </span>
        <span className="text-polar-600">Score: {score}</span>
      </div>
      <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-polar-600 transition-all"
          style={{ width: `${((step + 1) / quizQa.length) * 100}%` }}
        />
      </div>
      <h3 className="mt-5 mb-4 text-lg font-bold text-polar-950">{q.q}</h3>
      <div className="space-y-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = picked !== null && i === q.answer;
          const isPicked = picked === i;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                picked === null
                  ? "border-slate-200 bg-slate-50 hover:border-polar-300 hover:bg-polar-50"
                  : isAnswer
                    ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                    : isPicked
                      ? "border-red-300 bg-red-50 text-red-700"
                      : "border-slate-200 bg-slate-50 opacity-60"
              }`}
            >
              {opt}
              {picked !== null && isAnswer && <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />}
              {picked !== null && isPicked && !isAnswer && <X className="h-4 w-4 text-red-500" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="mt-4">
          <p className="mb-3 rounded-xl bg-sky-50 px-4 py-3 text-xs leading-relaxed text-sky-800">
            {q.explain}
          </p>
          <button
            type="button"
            onClick={next}
            className="rounded-xl bg-polar-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-polar-700"
          >
            {step + 1 >= quizQa.length ? "See result" : "Next question"} <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function StudentPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      {/* HERO */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-polar-600 to-polar-900 p-8 text-white sm:p-12">
        <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" /> Students &amp; Schools
            </span>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Discover the Frozen Edge of the Earth
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">
              Ice sheets, wild winds, penguins and scientific superpowers — step into
              the polar laboratory that India has called home for more than 40 years.
              Learn, quiz and meet the research stations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#quiz"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-polar-800 shadow transition hover:bg-sky-100"
              >
                Try the Polar Quiz
              </a>
              <a
                href="#stations"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Meet the Stations <MapPin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/penguin.svg"
              alt="Illustration of a penguin"
              className="w-48 sm:w-56 animate-float"
              width={200}
              height={200}
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* FACTS */}
      <section className="mb-14">
        <h2 className="mb-6 text-2xl font-extrabold text-polar-950">Polar science in a nutshell</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((f) => (
            <div
              key={f.text}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-polar-700">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-slate-700">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATIONS */}
      <section id="stations" className="mb-14">
        <h2 className="mb-2 text-2xl font-extrabold text-polar-950">Meet India&apos;s research stations</h2>
        <p className="mb-6 text-sm text-slate-500">
          Four stations span the world&apos;s extreme environments — from Antarctica to the Arctic and the Himalaya.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stations.map((s) => (
            <div
              key={s.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-polar-600 to-ice-400 text-white">
                  <Snowflake className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold text-slate-400">Since {s.since}</span>
              </div>
              <h3 className="text-lg font-bold text-polar-950">{s.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">{s.region}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.fact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUIZ + ICEBERG IMAGE */}
      <section id="quiz" className="mb-6">
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-extrabold text-polar-950">Polar quiz</h2>
          <BookOpen className="h-6 w-6 text-sky-500" aria-hidden="true" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/iceberg.svg"
              alt="Illustration of an iceberg floating in a polar ocean"
              className="w-full rounded-3xl border border-slate-200 shadow-sm"
              width={200}
              height={200}
              loading="lazy"
            />
            <Link
              href="/observatory"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-polar-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-polar-800"
            >
              Explore live polar data <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Quiz />
        </div>
      </section>

      <p className="text-xs text-slate-500">
        Illustrations are original vector artwork created for the PolarNCPOR portal.
      </p>
    </div>
  );
}