import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: "How Agri-Cycle collects and uses information gathered from visitors to this website.",
};

export default function PrivacyPolicyPage() {
  return <LegalPage title={privacyPolicy.title} sections={privacyPolicy.sections} />;
}
