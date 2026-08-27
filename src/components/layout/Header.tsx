"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  // The drawer is `lg:hidden`: widening past that breakpoint while it is open
  // leaves it mounted but unpainted, so the page behind stays inert and
  // scroll-locked with nothing on screen left to dismiss it.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeIfDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    closeIfDesktop();
    desktop.addEventListener("change", closeIfDesktop);
    return () => desktop.removeEventListener("change", closeIfDesktop);
  }, []);

  /**
   * The drawer is a modal dialog, so while it is open the rest of the page has
   * to be gone: `inert` takes its 130-odd controls out of the tab order and out
   * of the accessibility tree in one move. Its siblings (`<main>`, the footer)
   * are rendered by the layout rather than here, so they are marked
   * imperatively. Focus moves to the close button on open and returns to the
   * trigger on every close — Escape, scrim, and link-driven navigation alike.
   */
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = drawerRef.current;
    const opener = openButtonRef.current;
    const backdrop = Array.from(drawer?.parentElement?.children ?? []).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && el !== drawer && el !== scrimRef.current && !el.inert
    );
    backdrop.forEach((el) => (el.inert = true));
    // The panel is still off-screen mid-spring; focusing it must not scroll.
    closeButtonRef.current?.focus({ preventScroll: true });
    return () => {
      backdrop.forEach((el) => (el.inert = false));
      opener?.focus({ preventScroll: true });
    };
  }, [mobileOpen]);

  // Wrap Tab at the drawer's edges. Without this the 22nd press escaped into
  // the page behind the scrim, which `inert` alone would only turn into a jump
  // out to the browser chrome.
  function trapTab(e: ReactKeyboardEvent<HTMLElement>) {
    if (e.key !== "Tab" || !drawerRef.current) return;
    const stops = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!stops.length) return;
    const [first] = stops;
    const last = stops[stops.length - 1];
    if (document.activeElement !== (e.shiftKey ? first : last)) return;
    e.preventDefault();
    (e.shiftKey ? last : first).focus();
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* py-3 rather than py-2.5: focused, the link was 40px tall — under the 44px minimum target size. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-leaf focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
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
            Scheduled routes in 14 states, custom programs nationally — {site.tagline}
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
          {/*
            The mark was rendered at 36px, which is smaller than the "AGRI-CYCLE"
            lettering inside it can survive — it read as a green smudge, and the
            brand's actual orange and sky blue never appeared in the header at
            all. It is larger now, sits on a warm brand-coloured disc, and the
            tagline carries the logo's orange rather than yet more green.
          */}
          <Link
            href="/"
            aria-label="Agri-Cycle — home"
            className="group flex shrink-0 items-center gap-3 focus-ring"
          >
            <span className="relative grid size-13 shrink-0 place-items-center sm:size-14">
              <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_210deg,var(--color-sun)_0deg,var(--color-sun-light)_90deg,var(--color-sky)_190deg,var(--color-leaf)_290deg,var(--color-sun)_360deg)] opacity-20 transition-all duration-500 group-hover:opacity-35 group-hover:scale-110" />
              <Image
                src="/img/site/logo-mark.png"
                alt=""
                width={72}
                height={72}
                loading="eager"
                fetchPriority="high"
                className="relative size-11 object-contain transition-transform duration-700 group-hover:rotate-[18deg] sm:size-12"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.45rem] font-bold tracking-[-0.045em] text-ink sm:text-[1.6rem]">
                Agri-Cycle
              </span>
              <span className="mt-1 text-[0.62rem] font-bold tracking-[0.2em] text-sun uppercase">
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
            {/*
              The desktop nav is display:none below lg, which prunes it from
              the accessibility tree — leaving phones with no navigation
              landmark at all. The trigger that reveals the drawer carries the
              landmark instead, so one is exposed at every viewport whether the
              drawer is mounted or not. It is a wrapper, not a nav bar: nothing
              new is painted.
            */}
            <nav aria-label="Main" className="lg:hidden">
              <button
                ref={openButtonRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-haspopup="dialog"
                className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/12 text-ink transition-colors hover:border-leaf hover:bg-leaf/10 focus-ring"
              >
                <Menu aria-hidden className="size-5" />
              </button>
            </nav>
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
              ref={scrimRef}
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/55 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              onKeyDown={trapTab}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(23rem,92vw)] flex-col bg-paper shadow-2xl lg:hidden"
            >
              <div className="flex h-18 shrink-0 items-center justify-between border-b border-ink/10 px-5">
                <span id="mobile-menu-title" className="font-display text-lg font-bold tracking-tight">
                  Menu
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 cursor-pointer place-items-center rounded-full border border-ink/12 focus-ring"
                >
                  <X aria-hidden className="size-5" />
                </button>
              </div>

              {/* Not "Main" — the toggle wrapper above already carries that name at
                  this viewport, and two landmarks with the same name are a coin
                  toss for anyone navigating by landmark. */}
              <nav aria-label="All pages" className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
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
              </nav>

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
