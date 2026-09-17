import type { ReactNode } from "react";
import type { Metadata } from "next";

export interface PolicySection {
  heading: string;
  body?: string;
  list?: string[];
}

export interface PolicyContent {
  title: string;
  subtitle: string;
  updated: string;
  sections: PolicySection[];
}

export function policyMetadata(title: string): Metadata {
  return {
    title,
    description: `${title} of the PolarNCPOR Portal, NCPOR, Ministry of Earth Sciences, Government of India.`,
  };
}

export default function PolicyPage({
  content,
}: {
  content: PolicyContent;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <span className="mb-3 inline-block rounded-full bg-polar-50 px-3 py-1 text-xs font-semibold text-polar-600">
          Government of India
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-polar-950">
          {content.title}
        </h1>
        <p className="mt-2 text-base text-slate-600">{content.subtitle}</p>
        <p className="mt-3 text-sm text-slate-400">
          Last updated: {content.updated}
        </p>
      </div>

      <div className="space-y-8">
        {content.sections.map((section, i) => (
          <section key={i}>
            <h2 className="mb-3 text-xl font-bold text-polar-950">
              <span className="mr-2 text-polar-400">{i + 1}.</span>
              {section.heading}
            </h2>
            {section.body && (
              <p className="mb-3 text-[15px] leading-relaxed text-slate-700">
                {section.body}
              </p>
            )}
            {section.list && (
              <ul className="space-y-2">
                {section.list.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-[15px] leading-relaxed text-slate-700"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-polar-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-polar-50 p-5 text-sm text-slate-600">
        <strong className="text-polar-800">Queries / Grievances:</strong>{" "}
        For any questions regarding this portal, please contact the Web Master
        at NCPOR, Ministry of Earth Sciences, Government of India at{" "}
        <a
          href="mailto:webmaster@ncpor.res.in"
          className="font-semibold text-polar-600 hover:underline"
        >
          webmaster@ncpor.res.in
        </a>
      </div>
    </div>
  );
}

export function PolicyLayoutChildren({ children }: { children: ReactNode }) {
  return children;
}