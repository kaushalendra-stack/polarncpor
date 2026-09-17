"use client";

import { AlertTriangle } from "lucide-react";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[65vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="mb-3 text-3xl font-extrabold text-polar-950">Something went wrong</h1>
      <p className="mb-6 max-w-md text-base text-slate-600">
        An unexpected error occurred. Our team has been notified. Please try again,
        or contact the Web Master at{" "}
        <a
          href="mailto:webmaster@ncpor.res.in"
          className="font-semibold text-polar-600 hover:underline"
        >
          webmaster@ncpor.res.in
        </a>{" "}
        if the problem persists.
      </p>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-xl bg-polar-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-polar-700 focus:outline-none focus:ring-2 focus:ring-polar-400 focus:ring-offset-2"
      >
        Try again
      </button>
    </div>
  );
}