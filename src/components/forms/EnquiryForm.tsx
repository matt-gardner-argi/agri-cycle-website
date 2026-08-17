"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AlertCircle, Check, Mail, Phone, Send } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  stream: string;
  volume: string;
  message: string;
};

const empty: Fields = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  stream: "",
  volume: "",
  message: "",
};

const streams = [
  "Toter service (solids)",
  "High volume liquids",
  "Roll off / palletized",
  "Emergency or one-off event",
  "Residential drop-off",
  "Not sure yet",
];

/**
 * The live site collects enquiries through an embedded HubSpot form, which
 * cannot be reproduced here. This form validates locally and then hands the
 * completed enquiry to the visitor's own mail client, so nothing is silently
 * dropped and no data leaves the browser without the visitor sending it.
 */
export function EnquiryForm({
  kind = "quote",
  className,
}: {
  kind?: "quote" | "contact" | "digester";
  className?: string;
}) {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  const showOps = kind !== "contact";

  function set<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (!values.name.trim()) next.name = "Please tell us your name.";
    if (!values.email.trim()) next.email = "We need an email address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "That email address doesn't look right.";
    if (!values.message.trim()) next.message = "A sentence or two about your needs helps a lot.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const subjectByKind = {
      quote: "Quote request via website",
      contact: "Website enquiry",
      digester: "Digester partnership enquiry",
    };

    const lines = [
      `Name: ${values.name}`,
      values.company && `Company / organisation: ${values.company}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      values.city && `Location: ${values.city}`,
      showOps && values.stream && `Service of interest: ${values.stream}`,
      showOps && values.volume && `Estimated volume: ${values.volume}`,
      "",
      values.message,
    ].filter(Boolean);

    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subjectByKind[kind]
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
    setSent(true);
  }

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-leaf/40 bg-leaf/10 p-8 text-center sm:p-12"
          >
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-leaf text-ink">
              <Check aria-hidden className="size-7" />
            </span>
            <h3 className="mt-6 text-2xl">Your email client should be opening</h3>
            <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-ink/70">
              We&apos;ve prefilled a message to{" "}
              <span className="font-semibold">{site.email}</span> with everything you entered — press
              send in your mail app and we&apos;ll get back to you within three business days.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={site.phoneHref} size="md" variant="outline">
                <span className="inline-flex items-center gap-2">
                  <Phone aria-hidden className="size-4" />
                  Call {site.phone} instead
                </span>
              </Button>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="cursor-pointer rounded-full px-4 py-3 text-[0.8125rem] font-semibold text-ink/55 underline decoration-1 underline-offset-4 transition-colors hover:text-ink focus-ring"
              >
                Edit my details
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={submit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_30px_70px_-55px_rgba(7,23,17,0.5)] sm:p-9"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Your name"
                required
                value={values.name}
                onChange={(v) => set("name", v)}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Company or organisation"
                value={values.company}
                onChange={(v) => set("company", v)}
                autoComplete="organization"
              />
              <Field
                label="Email"
                type="email"
                required
                value={values.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
                autoComplete="email"
              />
              <Field
                label="Phone"
                type="tel"
                value={values.phone}
                onChange={(v) => set("phone", v)}
                autoComplete="tel"
              />
              <Field
                label="City & state"
                value={values.city}
                onChange={(v) => set("city", v)}
                className={showOps ? undefined : "sm:col-span-2"}
              />

              {showOps && (
                <>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="stream"
                      className="text-[0.8125rem] font-semibold tracking-tight text-ink/75"
                    >
                      Service of interest
                    </label>
                    <select
                      id="stream"
                      value={values.stream}
                      onChange={(e) => set("stream", e.target.value)}
                      className="h-12 cursor-pointer rounded-xl border border-ink/12 bg-cream/35 px-4 text-[0.9375rem] text-ink transition-colors focus:border-leaf focus:bg-white focus:outline-none"
                    >
                      <option value="">Select one…</option>
                      {streams.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Field
                    label="Roughly how much waste?"
                    placeholder="e.g. 2 totes per week, or 4 tons a month"
                    value={values.volume}
                    onChange={(v) => set("volume", v)}
                    className="sm:col-span-2"
                  />
                </>
              )}

              <div className="flex flex-col gap-2 sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-[0.8125rem] font-semibold tracking-tight text-ink/75"
                >
                  How can we help?{" "}
                  <span className="font-normal text-sun">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  placeholder="Tell us about your operation, your current disposal setup, and what you're hoping to change."
                  className={cn(
                    "resize-y rounded-xl border bg-cream/35 px-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink transition-colors placeholder:text-ink/35 focus:bg-white focus:outline-none",
                    errors.message
                      ? "border-sun focus:border-sun"
                      : "border-ink/12 focus:border-leaf"
                  )}
                />
                {errors.message && <FieldError>{errors.message}</FieldError>}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[0.75rem] leading-relaxed text-ink/45">
                Submitting opens a prefilled message in your own email app — nothing is sent until you
                press send there.
              </p>
              <Button type="submit" size="lg" variant="primary">
                <span className="inline-flex items-center gap-2">
                  <Send aria-hidden className="size-4" />
                  {kind === "quote" ? "Send my quote request" : "Send my message"}
                </span>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-ink/55">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-leaf-deep focus-ring"
              >
                <Phone aria-hidden className="size-3.5 text-leaf-deep" />
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-leaf-deep focus-ring"
              >
                <Mail aria-hidden className="size-3.5 text-leaf-deep" />
                {site.email}
              </a>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  placeholder,
  autoComplete,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-semibold tracking-tight text-ink/75">
        {label}
        {required && <span className="ml-1 font-normal text-sun">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={cn(
          "h-12 rounded-xl border bg-cream/35 px-4 text-[0.9375rem] text-ink transition-colors placeholder:text-ink/35 focus:bg-white focus:outline-none",
          error ? "border-sun focus:border-sun" : "border-ink/12 focus:border-leaf"
        )}
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-sun"
    >
      <AlertCircle aria-hidden className="size-3.5" />
      {children}
    </motion.p>
  );
}
