import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, site } from "@/content/site";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "SMS Privacy Policy & TOS", href: "/sms-policy" },
];

/* Every link down here is text-only, so its box collapsed to the line box —
   15px to 22px tall, well under the 44px target minimum and easy to miss on a
   phone. The fix throughout is symmetric vertical padding to grow the anchor's
   border box — the hit area — to 44px, cancelled by an equal negative margin so
   its margin box, and with it every position in the painted layout, is exactly
   what it was. The legal row also needs `inline-block`: a bare inline box with
   vertical padding repaints its glyphs with different antialiasing. */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      {/* Oversized brand marquee across the top of the footer. */}
      <div className="border-b border-white/8 py-7">
        <Marquee slow>
          {["Food Full Circle", "You've got the power", "14 states on route"].map((phrase) => (
            <span
              key={phrase}
              className="flex items-center gap-8 pr-8 font-display text-[clamp(1.6rem,1rem+3vw,3.2rem)] font-bold tracking-[-0.04em] whitespace-nowrap text-white/12"
            >
              {phrase}
              <span aria-hidden className="size-2.5 shrink-0 rounded-full bg-leaf/50" />
            </span>
          ))}
        </Marquee>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-40 -z-10 size-[38rem] rounded-full bg-leaf/12 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[32rem] rounded-full bg-sky/10 blur-[110px]"
      />

      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <Reveal direction="up">
            <div className="flex flex-col gap-5">
              <Link href="/" className="-my-[1.2px] flex items-center gap-3 py-[1.2px] focus-ring">
                <Image
                  src="/img/site/logo-mark.png"
                  alt=""
                  width={44}
                  height={44}
                  className="size-10 object-contain"
                />
                <span className="flex flex-col leading-none">
                  <span className="font-display text-xl font-bold tracking-[-0.045em]">Agri-Cycle</span>
                  <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.19em] text-leaf-bright uppercase">
                    {site.tagline}
                  </span>
                </span>
              </Link>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-white/60">
                We are located in South Portland, Maine, running scheduled collection routes across New
                England, the Mid-Atlantic and beyond — plus customized programs for producers
                anywhere in the country.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {site.social.map((s) => (
                  /* The pill's border is the painted edge, so the target grows on the
                     anchor and the pill keeps its own box down to the pixel. */
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -my-[3.4px] flex items-center py-[3.4px] focus-ring"
                  >
                    <span className="rounded-full border border-white/15 px-4 py-2 text-[0.8rem] font-medium text-white/70 transition-all duration-300 group-hover:border-leaf group-hover:bg-leaf/15 group-hover:text-white">
                      {s.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.08}>
            <div>
              <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                Services
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {nav[0].children?.map((c) => (
                  <li key={c.href + c.label}>
                    <FooterLink href={c.href}>{c.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.14}>
            <div>
              <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                Company
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {nav[1].children?.map((c) => (
                  <li key={c.href + c.label}>
                    <FooterLink href={c.href}>{c.label}</FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href="/news">News</FooterLink>
                </li>
                <li>
                  <FooterLink href="/blog">Blog</FooterLink>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div>
              <h2 className="text-[0.7rem] font-semibold tracking-[0.2em] text-leaf-bright uppercase">
                Get in touch
              </h2>
              <ul className="mt-5 flex flex-col gap-4 text-[0.9375rem]">
                <li>
                  <a
                    href={site.phoneHref}
                    className="group -my-2 flex items-start gap-3 py-2 text-white/70 transition-colors hover:text-white focus-ring"
                  >
                    <Phone aria-hidden className="mt-1 size-4 shrink-0 text-leaf" />
                    <span className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-leaf-bright">
                      {site.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="-my-[10.75px] flex items-start gap-3 py-[10.75px] text-white/70 transition-colors hover:text-white focus-ring"
                  >
                    <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf" />
                    Email us
                  </Link>
                </li>
                <li className="flex items-start gap-3 text-white/60">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf" />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.state} {site.address.zip}
                  </span>
                </li>
              </ul>
              <Link
                href="/quote"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:scale-[1.03] focus-ring"
              >
                Request a Quote
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-[0.8rem] text-white/45 sm:flex-row">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                {/* Padding trimmed to just clear 44px: this row wraps on a phone and a
                    taller box would reach over the glyphs of the line above it. */}
                <Link
                  href={l.href}
                  className="-my-[12.5px] inline-block py-[12.5px] transition-colors hover:text-leaf-bright focus-ring"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group -my-[11.2px] inline-flex min-w-11 items-center gap-2 py-[11.2px] text-[0.9rem] text-white/60 transition-colors hover:text-white focus-ring"
    >
      <span className="h-px w-0 bg-leaf transition-all duration-300 group-hover:w-3" />
      {children}
    </Link>
  );
}
