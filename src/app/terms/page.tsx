import type { Metadata } from "next";
import PolicyPage, { policyMetadata } from "@/components/PolicyPage";
import { termsOfUse } from "@/lib/policies";

export const metadata: Metadata = policyMetadata("Terms of Use");

export default function TermsPage() {
  return <PolicyPage content={termsOfUse} />;
}