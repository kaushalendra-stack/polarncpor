import type { Metadata } from "next";
import PolicyPage, { policyMetadata } from "@/components/PolicyPage";
import { disclaimer } from "@/lib/policies";

export const metadata: Metadata = policyMetadata("Disclaimer");

export default function DisclaimerPage() {
  return <PolicyPage content={disclaimer} />;
}