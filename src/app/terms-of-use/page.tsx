import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { termsOfUse } from "@/content/legal";

export const metadata: Metadata = {
  title: termsOfUse.title,
  description: "Terms and conditions of use for the Agri-Cycle website.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <LegalPage
      title={termsOfUse.title}
      sections={termsOfUse.sections}
      intro="By accessing this website you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations."
      image="/img/site/energy18.jpg"
    />
  );
}
