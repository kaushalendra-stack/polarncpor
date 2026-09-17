import type { Metadata } from "next";
import PolicyPage, { policyMetadata } from "@/components/PolicyPage";
import { copyrightPolicy } from "@/lib/policies";

export const metadata: Metadata = policyMetadata("Copyright Policy");

export default function CopyrightPage() {
  return <PolicyPage content={copyrightPolicy} />;
}