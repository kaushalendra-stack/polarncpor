import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { privacyPolicy } from "@/lib/policies";
import { policyMetadata } from "@/components/PolicyPage";

export const metadata: Metadata = policyMetadata("Privacy Policy");

export default function PrivacyPage() {
  return <PolicyPage content={privacyPolicy} />;
}