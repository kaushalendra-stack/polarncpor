import type { Metadata } from "next";
import PolicyPage, { policyMetadata } from "@/components/PolicyPage";
import { hyperlinkingPolicy } from "@/lib/policies";

export const metadata: Metadata = policyMetadata("Hyperlinking Policy");

export default function HyperlinkingPage() {
  return <PolicyPage content={hyperlinkingPolicy} />;
}