import type { Metadata } from "next";
import PolicyPage, { policyMetadata } from "@/components/PolicyPage";
import { contactUs } from "@/lib/policies";

export const metadata: Metadata = policyMetadata("Contact Us");

export default function ContactPage() {
  return <PolicyPage content={contactUs} />;
}