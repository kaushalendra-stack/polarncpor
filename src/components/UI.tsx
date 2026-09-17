import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-gradient-to-b from-polar-500 to-ice-400" />
        <h2 className="text-2xl font-bold text-polar-950">{title}</h2>
      </div>
      {subtitle && (
        <p className="mt-2 ml-4 text-sm text-slate-600">{subtitle}</p>
      )}
    </div>
  );
}