import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-7xl">🧭</div>
      <h1 className="mb-3 text-4xl font-extrabold text-polar-950">404 — Page Not Found</h1>
      <p className="mb-8 max-w-md text-base text-slate-600">
        The page you are looking for does not exist, or may have been moved.
        Please check the URL or use the navigation above.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-polar-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-polar-700 focus:outline-none focus:ring-2 focus:ring-polar-400 focus:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-polar-400 focus:ring-offset-2"
        >
          <Compass className="h-4 w-4" /> Search
        </Link>
      </div>
    </div>
  );
}