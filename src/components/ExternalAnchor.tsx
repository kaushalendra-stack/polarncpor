import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalAnchorProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  children: ReactNode;
  className?: string;
}

export default function ExternalAnchor({
  children,
  className = "",
  ...props
}: ExternalAnchorProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 ${className}`}
    >
      {children}
      <ExternalLinkIcon
        className="h-3.5 w-3.5 shrink-0 opacity-60"
        aria-hidden="true"
      />
      <span className="sr-only">(opens in a new window)</span>
    </a>
  );
}