export type LegalSection = { heading?: string; paragraphs?: string[]; list?: string[] };

export const privacyPolicy: { title: string; sections: LegalSection[] } = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "Information that is gathered from visitors",
      paragraphs: [
        "In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type, referring page and time of visit.",
        "Cookies may be used to remember visitor preferences when interacting with the website. Where registration is required, the visitor's email and a username will be stored on the server.",
      ],
    },
    {
      heading: "How the information is used",
      paragraphs: [
        "The information is used to enhance the visitor's experience when using the website to display personalized content and possibly advertising.",
        "E-mail addresses will not be sold, rented or leased to 3rd parties. E-mail may be sent to inform you of news of our services or offers by us or our affiliates.",
      ],
    },
    {
      heading: "Visitor options",
      paragraphs: [
        "If you have subscribed to one of our services, you may unsubscribe by following the instructions which are included in e-mail that you receive.",
        "You may be able to block cookies via your browser settings but this may prevent you from access to certain features of the website.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Cookies are small digital signature files that are stored by your web browser that allow your preferences to be recorded when visiting the website. Also they may be used to track your return visits to the website.",
        "3rd party advertising companies may also use cookies for tracking purposes.",
      ],
    },
  ],
};

export const termsOfUse: { title: string; sections: LegalSection[] } = {
  title: "Terms of Use",
  sections: [
    {
      heading: "1. Terms",
      paragraphs: [
        "By accessing this website, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
      ],
    },
    {
      heading: "2. Use License",
      paragraphs: [
        "Permission is granted to temporarily download one copy of the materials (information or software) on Agri-Cycle's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:",
      ],
      list: [
        "modify or copy the materials;",
        "use the materials for any commercial purpose, or for any public display (commercial or non-commercial);",
        "attempt to decompile or reverse engineer any software contained on Agri-Cycle's website;",
        "remove any copyright or other proprietary notations from the materials; or",
        'transfer the materials to another person or "mirror" the materials on any other server.',
      ],
    },
    {
      paragraphs: [
        "This license shall automatically terminate if you violate any of these restrictions and may be terminated by Agri-Cycle at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.",
      ],
    },
    {
      heading: "3. Disclaimer",
      paragraphs: [
        'The materials on Agri-Cycle\'s website are provided "as is." Agri-Cycle makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
        "Further, Agri-Cycle does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.",
      ],
    },
    {
      heading: "4. Limitations",
      paragraphs: [
        "In no event shall Agri-Cycle or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Agri-Cycle's Internet site, even if Agri-Cycle or an Agri-Cycle authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
      ],
    },
    {
      heading: "5. Revisions and Errata",
      paragraphs: [
        "The materials appearing on Agri-Cycle's website could include technical, typographical, or photographic errors. Agri-Cycle does not warrant that any of the materials on its website are accurate, complete, or current. Agri-Cycle may make changes to the materials contained on its website at any time without notice. Agri-Cycle does not, however, make any commitment to update the materials.",
      ],
    },
    {
      heading: "6. Links",
      paragraphs: [
        "Agri-Cycle has not reviewed all of the sites linked to its Internet website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Agri-Cycle of the site. Use of any such linked website is at the user's own risk.",
      ],
    },
    {
      heading: "7. Site Terms of Use Modifications",
      paragraphs: [
        "Agri-Cycle may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.",
      ],
    },
    {
      heading: "8. Governing Law",
      paragraphs: [
        "Any claim relating to Agri-Cycle's website shall be governed by the laws of the State of Maine without regard to its conflict of law provisions.",
      ],
    },
  ],
};

export const smsPolicy: { title: string; sections: LegalSection[] } = {
  title: "SMS Privacy Policy & Terms of Service",
  sections: [
    {
      heading: "1. Introduction",
      paragraphs: [
        'Agri-Cycle Energy, LLC ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy and Terms of Service explain how we collect, use, and protect your information, including information related to SMS communications. By using our services or opting into SMS messaging, you agree to the terms below.',
      ],
    },
    {
      heading: "2. Information We Collect",
      paragraphs: ["We may collect the following information:"],
      list: ["Name", "Phone number", "Email address", "Service-related information you provide", "Messaging preferences"],
    },
    {
      paragraphs: ["We collect information when you:"],
      list: [
        "Fill out a form",
        "Sign up for services",
        "Opt in to receive text messages",
        "Contact us directly",
      ],
    },
    {
      heading: "3. How We Use Your Information",
      paragraphs: ["We use your information to:"],
      list: [
        "Provide services",
        "Respond to inquiries",
        "Send service updates",
        "Send SMS notifications (if opted in)",
        "Improve our services",
        "Comply with legal requirements",
      ],
    },
    { paragraphs: ["We do not sell your personal information."] },
    {
      heading: "4. SMS Messaging Terms",
      paragraphs: [
        "By providing your phone number and opting in, you consent to receive SMS messages from Agri-Cycle Energy, LLC. These messages may include:",
      ],
      list: [
        "Service reminders",
        "Service updates",
        "Account notifications",
        "Billing notifications",
        "Customer support responses",
        "Promotional messages (if applicable)",
      ],
    },
    {
      paragraphs: [
        "Message frequency may vary. Message and data rates may apply depending on your mobile carrier.",
        "You may opt out at any time by replying STOP to cancel, or HELP for assistance. You may also contact us directly at 1-800-850-9560 or itdept@agricycleenergy.com.",
        "Consent to receive SMS messages is not a condition of purchase.",
      ],
    },
    {
      heading: "5. Data Sharing & Third Parties",
      paragraphs: [
        "We may share your information with service providers that help us operate our business (such as messaging providers, hosting providers, etc.). These providers are contractually obligated to protect your information.",
        "We do not share mobile opt-in data or SMS consent with third parties for marketing purposes.",
      ],
    },
    {
      heading: "6. Data Security",
      paragraphs: [
        "We implement reasonable safeguards to protect your personal information from unauthorized access, disclosure, or misuse. However, no electronic transmission or storage system is 100% secure.",
      ],
    },
    {
      heading: "7. Your Rights",
      paragraphs: ["You may:"],
      list: [
        "Request access to your information",
        "Request corrections",
        "Request deletion (where legally permitted)",
        "Withdraw SMS consent at any time",
      ],
    },
    { paragraphs: ["To make a request, contact us at itdept@agricycleenergy.com."] },
    {
      heading: "8. Changes to This Policy",
      paragraphs: [
        "We may update this policy periodically. Updates will be posted on this page with a revised effective date.",
      ],
    },
    {
      heading: "9. Contact Information",
      paragraphs: [
        "Agri-Cycle Energy, 500 Southborough Drive, Suite 106, South Portland, ME 04106. 1-800-850-9560. itdept@agricycleenergy.com",
      ],
    },
  ],
};
