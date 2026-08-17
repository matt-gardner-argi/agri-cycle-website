"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Close everything on navigation. Resetting during render (rather than in an
  // effect) avoids a frame where the drawer is still open on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-leaf focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      {/* Utility bar — hidden once scrolling starts to buy back vertical space. */}
      <motion.div
        aria-hidden={scrolled}
        animate={{ height: scrolled ? 0 : 38, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 overflow-hidden bg-ink text-white max-lg:hidden"
      >
        <div className="container-page flex h-[38px] items-center justify-between text-[0.7rem] tracking-wide">
          <p className="flex items-center gap-2 text-white/60">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-leaf" />
            </span>
            Now collecting in 14 states — {site.tagline}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/careers" className="text-white/70 transition-colors hover:text-leaf-bright">
              Employment
            </Link>
            <Link href="/news" className="text-white/70 transition-colors hover:text-leaf-bright">
              News
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center gap-1.5 font-semibold text-leaf-bright transition-colors hover:text-white"
            >
              <Phone aria-hidden className="size-3" />
              {site.phone}
            </a>
          </div>
        </div>
      </motion.div>

      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled
            ? "bg-paper/85 shadow-[0_1px_0_rgba(7,23,17,0.08),0_18px_40px_-32px_rgba(7,23,17,0.4)] backdrop-blur-xl"
            : "bg-paper/60 backdrop-blur-sm"
        )}
      >
        <div className="container-page flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="group flex shrink-0 items-center gap-3 focus-ring">
            <span className="relative grid size-11 place-items-center">
              <span className="absolute inset-0 rounded-full bg-leaf/18 transition-transform duration-500 group-hover:scale-110" />
              <Image
                src="/img/site/logo-mark.png"
                alt=""
                width={44}
                height={44}
                priority
                className="relative size-9 object-contain transition-transform duration-700 group-hover:rotate-[18deg]"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.35rem] font-bold tracking-[-0.045em] text-ink">
                Agri-Cycle
              </span>
              <span className="mt-0.5 text-[0.6rem] font-semibold tracking-[0.19em] text-leaf-deep uppercase">
                {site.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              const hasKids = !!item.children?.length;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(hasKids ? item.label : null)}
                >
                  <Link
                    href={item.href}
                    aria-expanded={hasKids ? openMenu === item.label : undefined}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-2.5 text-[0.875rem] font-medium transition-colors focus-ring",
                      active ? "text-leaf-deep" : "text-ink/75 hover:text-ink"
                    )}
                  >
                    {item.label}
                    {hasKids && (
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          openMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-leaf/14"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button href="/quote" size="sm" variant="primary" withArrow className="max-sm:hidden">
              Request a Quote
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/12 text-ink transition-colors hover:border-leaf hover:bg-leaf/10 focus-ring lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>

        {/* Desktop mega-menu */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-t border-ink/8 bg-paper/95 shadow-[0_30px_60px_-30px_rgba(7,23,17,0.35)] backdrop-blur-xl lg:block"
            >
              <div className="container-page grid gap-1 py-7 md:grid-cols-2 xl:grid-cols-3">
                {nav
                  .find((n) => n.label === openMenu)
                  ?.children?.map((child, i) => (
                    <motion.div
                      key={child.href + child.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 + i * 0.035, duration: 0.4 }}
                    >
                      <Link
                        href={child.href}
                        className="group flex items-start gap-4 rounded-2xl p-4 transition-colors hover:bg-leaf/10 focus-ring"
                      >
                        <span className="mt-1.5 size-2 shrink-0 rounded-full bg-leaf/40 transition-all duration-300 group-hover:scale-150 group-hover:bg-leaf" />
                        <span>
                          <span className="block font-display text-[0.975rem] font-semibold text-ink">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-1 block text-[0.8125rem] leading-snug text-ink/55">
                              {child.description}
                            </span>
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/55 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(23rem,92vw)] flex-col bg-paper shadow-2xl lg:hidden"
            >
              <div className="flex h-18 shrink-0 items-center justify-between border-b border-ink/10 px-5">
                <span className="font-display text-lg font-bold tracking-tight">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 cursor-pointer place-items-center rounded-full border border-ink/12 focus-ring"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
                <Link
                  href="/"
                  className="block border-b border-ink/8 py-3.5 font-display text-lg font-semibold tracking-tight"
                >
                  Home
                </Link>
                {nav.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 22 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.4 }}
                    className="border-b border-ink/8 py-1"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block py-3 font-display text-lg font-semibold tracking-tight",
                        isActive(item.href) ? "text-leaf-deep" : "text-ink"
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="mb-3 flex flex-col gap-0.5 border-l-2 border-leaf/25 pl-4">
                        {item.children.map((child) => (
                          <li key={child.href + child.label}>
                            <Link
                              href={child.href}
                              className="block py-2 text-[0.9rem] text-ink/65 transition-colors hover:text-leaf-deep"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="shrink-0 space-y-3 border-t border-ink/10 bg-cream/50 p-5">
                <Button href="/quote" size="md" withArrow className="w-full">
                  Request a Quote
                </Button>
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-ink/70"
                >
                  <Phone aria-hidden className="size-3.5" />
                  {site.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
