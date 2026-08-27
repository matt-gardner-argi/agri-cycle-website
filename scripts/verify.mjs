/**
 * Playwright verification pass.
 *
 *   npm run verify                  # all routes, three viewports
 *   npm run verify -- --quick       # key routes only
 *   npm run verify -- --posts=5     # cap the number of blog posts crawled
 *
 * Checks per page: HTTP status, console errors, failed network requests,
 * horizontal overflow, image loading, and a11y basics (h1 present, images
 * carry alt text). Writes screenshots to screenshots/<viewport>/.
 */
import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://website.localhost:3000";
const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "screenshots");

const args = process.argv.slice(2);
const QUICK = args.includes("--quick");
const postLimit = Number(args.find((a) => a.startsWith("--posts="))?.split("=")[1] ?? (QUICK ? 1 : 4));

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
  { name: "tablet", width: 834, height: 1112, deviceScaleFactor: 2, isMobile: false },
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false },
];

const CORE_ROUTES = [
  "/",
  "/services",
  "/services/collection",
  "/faq",
  "/service-area",
  "/calculator",
  "/about",
  "/about/why-agri-cycle",
  "/about/anaerobic-digestion",
  "/about/depackaging",
  "/about/processing-partners",
  "/about/history",
  "/about/team",
  "/careers",
  "/news",
  "/blog",
  "/quote",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
  "/sms-policy",
  "/this-page-does-not-exist",
];

const REDIRECTS = [
  ["/food-waste-services", "/services"],
  ["/food-waste-collection", "/services/collection"],
  ["/frequently-asked-questions", "/faq"],
  ["/about-us/our-team", "/about/team"],
  ["/about-us/the-depackaging-machine", "/about/depackaging"],
  ["/service-area-footprint", "/service-area"],
  ["/agri-calculator", "/calculator"],
  ["/employment", "/careers"],
  ["/quote-request", "/quote"],
  ["/sms_pptos", "/sms-policy"],
  ["/reasons-to-work-with-agri-cycle-for-food-waste-management", "/about/why-agri-cycle"],
];

// Noise we intentionally ignore: dev-server HMR chatter and third-party frames.
const IGNORE_CONSOLE = [
  /Download the React DevTools/i,
  /\[Fast Refresh\]/i,
  /webpack-hmr/i,
  /recruiting\.paylocity\.com/i,
  /Failed to load resource.*paylocity/i,
  /favicon/i,
];
const IGNORE_REQUEST = [/paylocity\.com/i, /_next\/static\/chunks\/.*hot-update/i];

const LCP_ADVISORY = /Largest Contentful Paint/i;

const results = [];
const issues = [];
const advisories = [];

function slug(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_") || "home";
}

async function collectRoutes() {
  const posts = JSON.parse(await readFile(path.join(ROOT, "src/content/posts.json"), "utf8"));
  const postRoutes = posts.slice(0, postLimit).map((p) => `/blog/${p.slug}`);
  const routes = QUICK
    ? ["/", "/services", "/service-area", "/calculator", "/blog", "/about/team", "/quote"]
    : CORE_ROUTES;
  return { routes: [...routes, ...postRoutes], allPosts: posts };
}

async function checkPage(context, route, vp) {
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() !== "error" && msg.type() !== "warning") return;
    const text = msg.text();
    if (IGNORE_CONSOLE.some((re) => re.test(text))) return;
    consoleErrors.push(`[${msg.type()}] ${text}`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`[pageerror] ${err.message}`));
  page.on("requestfailed", (req) => {
    if (IGNORE_REQUEST.some((re) => re.test(req.url()))) return;
    failedRequests.push(`${req.url()} — ${req.failure()?.errorText ?? "failed"}`);
  });
  page.on("response", (res) => {
    const url = res.url();
    if (IGNORE_REQUEST.some((re) => re.test(url))) return;
    if (res.status() >= 400 && url.startsWith(BASE)) {
      failedRequests.push(`${res.status()} ${url}`);
    }
  });

  const expect404 = route === "/this-page-does-not-exist";
  let status = 0;
  try {
    const res = await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
    status = res?.status() ?? 0;
  } catch (e) {
    issues.push({ route, vp: vp.name, kind: "navigation", detail: e.message });
    await page.close();
    return;
  }

  // Let scroll-triggered animations settle, then walk the page so every
  // whileInView section actually mounts before the screenshot.
  await page.waitForTimeout(700);
  await page.evaluate(async () => {
    // The site sets `scroll-behavior: smooth`, which would animate these jumps
    // and leave the page mid-scroll when the screenshot fires.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 500));
    root.style.scrollBehavior = previous;
  });
  await page.waitForTimeout(600);

  const audit = await page.evaluate(() => {
    const de = document.documentElement;
    const overflow = de.scrollWidth - de.clientWidth;

    // Which elements actually stick out past the viewport?
    const clippedByAncestor = (el) => {
      let p = el.parentElement;
      while (p && p !== document.body) {
        if (/hidden|clip|auto|scroll/.test(getComputedStyle(p).overflowX)) return true;
        p = p.parentElement;
      }
      return false;
    };

    const offenders = [];
    if (overflow > 2) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > de.clientWidth + 2 || r.left < -2) {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed" || cs.visibility === "hidden") continue;
          if (clippedByAncestor(el)) continue;
          offenders.push(
            `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(/\s+/).slice(0, 3).join(".") : ""} (right=${Math.round(r.right)})`
          );
          if (offenders.length >= 4) break;
        }
      }
    }

    const imgs = [...document.querySelectorAll("img")];
    return {
      title: document.title,
      overflow,
      offenders,
      h1Count: document.querySelectorAll("h1").length,
      h1Text: document.querySelector("h1")?.innerText?.trim().slice(0, 90) ?? null,
      imgTotal: imgs.length,
      imgBroken: imgs
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => i.currentSrc || i.src)
        .slice(0, 5),
      imgNoAlt: imgs.filter((i) => i.alt === null || i.alt === undefined).length,
      textNodes: document.body.innerText.trim().length,
      linkCount: document.querySelectorAll("a[href]").length,
    };
  });

  const dir = path.join(OUT, vp.name);
  await mkdir(dir, { recursive: true });
  if (vp.name === "desktop") {
    // A plain fullPage capture resizes the viewport and shoots before the
    // scroll-reveal observers fire, leaving whole sections blank. Grow the
    // viewport first, let the reveals land, then capture.
    const docHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.setViewportSize({ width: vp.width, height: Math.min(docHeight, 18000) });
    await page.waitForTimeout(1600);
    await page.screenshot({ path: path.join(dir, `${slug(route)}.png`) });
    await page.setViewportSize({ width: vp.width, height: vp.height });
  } else {
    await page.screenshot({ path: path.join(dir, `${slug(route)}.png`) });
  }

  // Record findings
  if (expect404 ? status !== 404 : status !== 200) {
    issues.push({ route, vp: vp.name, kind: "status", detail: `HTTP ${status}` });
  }
  if (audit.overflow > 2) {
    issues.push({
      route,
      vp: vp.name,
      kind: "overflow",
      detail: `${audit.overflow}px horizontal overflow — ${audit.offenders.join("; ") || "no visible offender found"}`,
    });
  }
  if (audit.h1Count !== 1) {
    issues.push({ route, vp: vp.name, kind: "h1", detail: `${audit.h1Count} <h1> elements` });
  }
  if (audit.imgBroken.length) {
    issues.push({ route, vp: vp.name, kind: "image", detail: audit.imgBroken.join(", ") });
  }
  if (audit.textNodes < 400 && !expect404) {
    issues.push({ route, vp: vp.name, kind: "empty", detail: `only ${audit.textNodes} chars of text` });
  }
  if (!expect404) {
    for (const e of consoleErrors.slice(0, 3)) {
      // This pass scrolls every page top to bottom, so Next's LCP heuristic
      // fires on whichever image the scroll happened to land on. Only report
      // the hint when the image it names has not already been given one.
      if (LCP_ADVISORY.test(e)) {
        const src = e.match(/src "([^"]+)"/)?.[1];
        const alreadyEager = src && (await page
          .evaluate((s) => {
            const img = [...document.querySelectorAll("img")].find((i) => i.src.includes(s));
            return !img || img.loading === "eager" || img.fetchPriority === "high";
          }, src)
          .catch(() => false));
        if (alreadyEager) continue;
        advisories.push({ route, vp: vp.name, kind: "console", detail: e.split("\n")[0] });
        continue;
      }
      issues.push({ route, vp: vp.name, kind: "console", detail: e.split("\n")[0] });
    }
    for (const f of [...new Set(failedRequests)].slice(0, 4)) {
      issues.push({ route, vp: vp.name, kind: "request", detail: f });
    }
  }

  results.push({ route, vp: vp.name, status, ...audit });
  await page.close();
}

async function checkRedirects(context) {
  const page = await context.newPage();
  for (const [from, to] of REDIRECTS) {
    try {
      const res = await page.goto(BASE + from, { waitUntil: "domcontentloaded", timeout: 30000 });
      const landed = new URL(page.url()).pathname.replace(/\/$/, "") || "/";
      if (landed !== to) {
        issues.push({
          route: from,
          vp: "redirect",
          kind: "redirect",
          detail: `landed on ${landed}, expected ${to} (status ${res?.status()})`,
        });
      }
    } catch (e) {
      issues.push({ route: from, vp: "redirect", kind: "redirect", detail: e.message });
    }
  }
  await page.close();
}

/** Crawl every internal href we render and confirm none 404. */
async function checkInternalLinks(context, routes) {
  const page = await context.newPage();
  const hrefs = new Set();
  for (const route of routes) {
    try {
      await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      const found = await page.evaluate(() =>
        [...document.querySelectorAll("a[href]")]
          .map((a) => a.getAttribute("href"))
          .filter((h) => h && h.startsWith("/") && !h.startsWith("//"))
      );
      for (const h of found) hrefs.add(h.split("#")[0]);
    } catch {
      /* page-level failures are already reported above */
    }
  }
  await page.close();

  const checked = [];
  for (const href of [...hrefs].filter(Boolean)) {
    const res = await context.request.get(BASE + href, { maxRedirects: 5 });
    checked.push({ href, status: res.status() });
    if (res.status() >= 400) {
      issues.push({ route: href, vp: "link", kind: "broken-link", detail: `HTTP ${res.status()}` });
    }
  }
  return checked;
}

/** Every blog post route must render, even the ones we don't screenshot. */
async function checkAllPostRoutes(context, allPosts) {
  const bad = [];
  for (const p of allPosts) {
    const res = await context.request.get(`${BASE}/blog/${p.slug}`);
    if (res.status() !== 200) {
      bad.push(`${p.slug}: ${res.status()}`);
      issues.push({ route: `/blog/${p.slug}`, vp: "fetch", kind: "status", detail: `HTTP ${res.status()}` });
    }
  }
  return { total: allPosts.length, bad };
}

/** Exercise the interactive widgets that carry the page's value. */
async function checkInteractions(context) {
  const page = await context.newPage();
  const log = [];

  async function step(name, fn) {
    try {
      await fn();
      log.push(`PASS  ${name}`);
    } catch (e) {
      log.push(`FAIL  ${name} — ${e.message}`);
      issues.push({ route: "interaction", vp: "desktop", kind: "interaction", detail: `${name}: ${e.message}` });
    }
  }

  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(900);

  await step("header mega-menu opens on hover", async () => {
    await page.getByRole("link", { name: "About Us", exact: true }).first().hover();
    await page.waitForTimeout(450);
    await page.getByRole("link", { name: /Processing Partners/i }).first().waitFor({ state: "visible", timeout: 4000 });
  });

  await step("cycle diagram switches stage on click", async () => {
    const node = page.getByRole("button", { name: "De-packaging", exact: true });
    await node.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await node.click();
    await page.waitForTimeout(500);
    await page.getByText(/Paddles, blades and screens|separate expired or damaged/i).first().waitFor({ timeout: 4000 });
  });

  await step("state map selects a state", async () => {
    const tile = page.getByRole("button", { name: /^Massachusetts:/ });
    await tile.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await tile.click();
    await page.waitForTimeout(500);
    await page.getByRole("link", { name: /Ask about MA/i }).waitFor({ timeout: 4000 });
  });

  await step("calculator recomputes when inputs change", async () => {
    const heading = page.getByRole("heading", { name: /Calculate your impact/i });
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const readout = page.locator("#calculator").getByText(/MT CO₂e/).first();
    await readout.waitFor({ timeout: 5000 });
    const result = page.locator('#calculator p:has-text("MT CO\u2082e")').first();
    const before = await result.innerText();
    const slider = page.locator('#calculator input[type="range"]').last();
    await slider.fill(await slider.getAttribute("max"));
    await page.waitForTimeout(2000);
    const after = await result.innerText();
    if (before === after) throw new Error(`result did not change (${before})`);
  });

  await step("methodology panel toggles and cites its sources", async () => {
    const btn = page.getByRole("button", { name: /the model, the factors and the sources/i });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await page.waitForTimeout(500);
    // Every factor has to carry a link a salesperson can follow.
    await page.getByRole("link", { name: /EPA Waste Reduction Model/i }).first().waitFor({ timeout: 4000 });
    const sourced = await page.locator("table a[href^='https://www.epa.gov'], table a[href^='https://www.eia.gov']").count();
    if (sourced < 6) throw new Error(`only ${sourced} factor rows carry a published source link`);
  });

  await step("testimonial strip scrolls, pauses on hover and opens the full quote", async () => {
    const strip = page.locator(".group\\/marquee").filter({ hasText: "Read the full quote" }).first();
    await strip.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(600);

    const track = strip.locator("> div").first();
    const offset = () => track.evaluate((el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
    const a = await offset();
    await page.waitForTimeout(900);
    if (Math.abs((await offset()) - a) < 1) throw new Error("strip is not scrolling");

    await strip.hover();
    await page.waitForTimeout(400);
    const held = await offset();
    await page.waitForTimeout(900);
    if (Math.abs((await offset()) - held) > 1) throw new Error("strip did not pause on hover");

    // The dialog is portalled to <body>; the section's stacking context used to trap it.
    await strip.getByRole("button", { name: /Read the full quote/i }).first().click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ state: "visible", timeout: 4000 });
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached", timeout: 4000 });
  });

  await step("FAQ accordion expands", async () => {
    await page.goto(BASE + "/faq", { waitUntil: "load" });
    await page.waitForTimeout(700);
    const q = page.getByRole("button", { name: /What can I put in the totes/i });
    await q.scrollIntoViewIfNeeded();
    await q.click();
    await page.waitForTimeout(600);
    await page.getByText(/vegetable and fruit trimmings/i).first().waitFor({ timeout: 4000 });
  });

  await step("blog category filter narrows the grid", async () => {
    await page.goto(BASE + "/blog", { waitUntil: "load" });
    await page.waitForTimeout(700);
    const chip = page.getByRole("button", { name: /^Partner Profile/ });
    await chip.scrollIntoViewIfNeeded();
    await chip.click();
    await page.waitForTimeout(900);
    const text = await page.getByText(/Showing \d+ of \d+ article/).innerText();
    const [, of] = text.match(/of (\d+)/) ?? [];
    if (Number(of) !== 3) throw new Error(`expected 3 partner profiles, saw "${text}"`);
  });

  await step("blog search filters", async () => {
    await page.getByRole("button", { name: /^All posts/ }).click();
    await page.waitForTimeout(500);
    const input = page.getByRole("searchbox", { name: /Search articles/i });
    await input.fill("depackager");
    await page.waitForTimeout(800);
    const text = await page.getByText(/Showing \d+ of \d+ article/).innerText();
    if (/of 0 article/.test(text)) throw new Error("search returned nothing");
  });

  await step("team bio modal opens", async () => {
    await page.goto(BASE + "/about/team", { waitUntil: "load" });
    await page.waitForTimeout(700);
    await page.getByRole("button", { name: /Dan Bell/ }).first().click();
    await page.waitForTimeout(600);
    await page.getByRole("dialog").waitFor({ timeout: 4000 });
    await page.getByRole("button", { name: "Close" }).click();
    await page.waitForTimeout(400);
  });

  await step("quote form validates and requires a message", async () => {
    await page.goto(BASE + "/quote", { waitUntil: "load" });
    await page.waitForTimeout(700);
    await page.getByRole("button", { name: /Send my quote request/i }).click();
    await page.waitForTimeout(500);
    await page.getByText(/Please tell us your name/i).waitFor({ timeout: 4000 });
    await page.getByText(/We need an email address/i).waitFor({ timeout: 4000 });
  });

  await step("before/after slider moves by press, by drag and by keyboard", async () => {
    await page.goto(BASE + "/about/history", { waitUntil: "load" });
    await page.waitForTimeout(700);
    const slider = page.getByRole("slider", { name: /Compare the farm then and now/i });
    await slider.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const at = () => slider.getAttribute("aria-valuenow").then(Number);
    const box = await slider.boundingBox();

    // Press anywhere on the frame — the defect was that only dragging the photo worked.
    await page.mouse.click(box.x + box.width * 0.25, box.y + box.height / 2);
    await page.waitForTimeout(300);
    const pressed = await at();
    if (Math.abs(pressed - 25) > 4) throw new Error(`press did not jump the divider (${pressed})`);

    // Drag from the handle, which used to snap to the extremes.
    await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2, { steps: 12 });
    await page.mouse.up();
    await page.waitForTimeout(300);
    const dragged = await at();
    if (Math.abs(dragged - 70) > 5) throw new Error(`drag did not track the pointer (${dragged})`);

    await slider.focus();
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(200);
    if ((await at()) >= dragged) throw new Error("arrow key did not move the divider");

    const clip = await page.locator("div[style*='clip-path']").first().evaluate((el) => el.style.clipPath);
    if (!/inset\(0(px)? [\d.]+% 0(px)? 0(px)?\)/.test(clip)) throw new Error(`clip-path not tracking: ${clip}`);
  });

  await page.close();
  return log;
}

async function checkMobileNav(browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const log = [];
  try {
    await page.goto(BASE + "/", { waitUntil: "load" });
    await page.waitForTimeout(800);
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.waitForTimeout(700);
    const drawer = page.getByRole("dialog", { name: /menu/i });
    await drawer.waitFor({ state: "visible", timeout: 5000 });
    await drawer
      .getByRole("link", { name: "Processing Partners" })
      .waitFor({ state: "visible", timeout: 5000 });
    // The drawer promises aria-modal, so the page behind it must be inert.
    const leaked = await page.evaluate(() =>
      [...document.body.children].filter(
        (el) => !el.matches("[role=dialog], script, next-route-announcer") && !el.inert && el.querySelector("a[href]")
      ).length
    );
    if (leaked) throw new Error(`${leaked} background region(s) still reachable behind the modal drawer`);
    await page.screenshot({ path: path.join(OUT, "mobile", "_drawer-open.png") });
    await page.getByRole("button", { name: "Close menu" }).click();
    await page.waitForTimeout(500);
    log.push("PASS  mobile drawer opens, lists sub-nav, and closes");
  } catch (e) {
    log.push(`FAIL  mobile drawer — ${e.message}`);
    issues.push({ route: "/", vp: "mobile", kind: "interaction", detail: `mobile drawer: ${e.message}` });
  }
  await context.close();
  return log;
}

// ---------------------------------------------------------------------------

const { routes, allPosts } = await collectRoutes();
console.log(`Verifying ${routes.length} routes × ${VIEWPORTS.length} viewports against ${BASE}\n`);

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.isMobile,
    reducedMotion: "no-preference",
  });
  process.stdout.write(`${vp.name.padEnd(8)} `);
  for (const route of routes) {
    await checkPage(context, route, vp);
    process.stdout.write(".");
  }
  process.stdout.write("\n");
  await context.close();
}

const utilContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
console.log("\nRedirects…");
await checkRedirects(utilContext);
console.log("Internal links…");
const links = await checkInternalLinks(utilContext, routes);
console.log("All blog post routes…");
const postCheck = await checkAllPostRoutes(utilContext, allPosts);
await utilContext.close();

const interactionContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
console.log("Interactions…\n");
const interactionLog = await checkInteractions(interactionContext);
await interactionContext.close();

const mobileLog = await checkMobileNav(browser);
await browser.close();

// ---------------------------------------------------------------------------

for (const line of [...interactionLog, ...mobileLog]) {
  console.log("  " + line);
}

console.log(`\nInternal links checked: ${links.length}`);
console.log(`Blog post routes: ${postCheck.total - postCheck.bad.length}/${postCheck.total} OK`);

const grouped = issues.reduce((acc, i) => {
  (acc[i.kind] ??= []).push(i);
  return acc;
}, {});

if (advisories.length) {
  console.log(`\n${advisories.length} non-blocking advisory/advisories (Next.js image hints):`);
  for (const a of advisories) console.log(`   ${a.vp.padEnd(9)} ${a.route.padEnd(42)} ${a.detail}`);
}

console.log("\n" + "=".repeat(72));
if (issues.length === 0) {
  console.log("PASS — no issues found.");
} else {
  console.log(`${issues.length} issue(s):\n`);
  for (const [kind, list] of Object.entries(grouped)) {
    console.log(`── ${kind} (${list.length})`);
    for (const i of list.slice(0, 25)) {
      console.log(`   ${i.vp.padEnd(9)} ${i.route.padEnd(42)} ${i.detail}`);
    }
    if (list.length > 25) console.log(`   … ${list.length - 25} more`);
    console.log("");
  }
}
console.log("=".repeat(72));
console.log(`Screenshots: ${path.relative(ROOT, OUT)}/{mobile,tablet,desktop}/`);

await writeFile(
  path.join(OUT, "report.json"),
  JSON.stringify({ base: BASE, results, issues, advisories, links, interactionLog, mobileLog }, null, 2)
);

process.exit(issues.length ? 1 : 0);
