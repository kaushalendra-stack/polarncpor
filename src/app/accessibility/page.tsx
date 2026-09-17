import type { Metadata } from "next";
import PolicyPage, { policyMetadata } from "@/components/PolicyPage";
import { accessibilityStatement } from "@/lib/policies";

export const metadata: Metadata = policyMetadata("Accessibility Statement");

export default function AccessibilityPage() {
  return <PolicyPage content={accessibilityStatement} />;
}