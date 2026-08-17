import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { smsPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: smsPolicy.title,
  description:
    "How Agri-Cycle Energy, LLC collects, uses and protects your information, including information related to SMS communications.",
};

export default function SmsPolicyPage() {
  return (
    <LegalPage
      title={smsPolicy.title}
      sections={smsPolicy.sections}
      intro="Agri-Cycle Energy, LLC respects your privacy and is committed to protecting your personal information."
      image="/img/site/toters.jpg"
    />
  );
}
