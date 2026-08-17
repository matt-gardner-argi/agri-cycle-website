import Link from "next/link";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export default function NotFound() {
  const links = [{ label: "Home", href: "/" }, ...nav.filter((n) => !n.children), ...nav[0].children!];

  return (
    <section className="relative isolate flex min-h-[70svh] items-center overflow-hidden bg-ink py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 -z-10 size-[30rem] rounded-full bg-leaf/14 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-32 -z-10 size-[26rem] rounded-full bg-sky/12 blur-[120px]"
      />

      <div className="container-page text-center">
        <Reveal>
          <p className="font-display text-[clamp(5rem,3rem+10vw,11rem)] leading-none font-bold tracking-[-0.06em] text-white/10">
            404
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-2 text-[clamp(1.8rem,1.3rem+2.4vw,3rem)] text-white">
            This page went to the digester
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/60">
            Nothing wasted, though — try one of these instead.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Button href="/" size="lg" withArrow>
              Back to home
            </Button>
            <Button href="/contact" size="lg" variant="light">
              Contact us
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.28}>
          <ul className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-2">
            {links.map((l) => (
              <li key={l.href + l.label}>
                <Link
                  href={l.href}
                  className="inline-block rounded-full border border-white/15 px-4 py-2 text-[0.8125rem] text-white/65 transition-all duration-300 hover:border-leaf hover:bg-leaf/15 hover:text-white focus-ring"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
