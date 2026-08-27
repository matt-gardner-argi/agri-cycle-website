/**
 * Every piece of editorial copy on the site lives here, transcribed from the
 * live agricycleenergy.com pages so the new build stays factually identical.
 */

/**
 * The domain this site will finally serve from. Canonical URLs always point
 * here, so a staging copy never competes with production in the index.
 */
export const PRODUCTION_URL = "https://www.agricycleenergy.com";

/**
 * Where this particular build is served. Set `NEXT_PUBLIC_SITE_URL` on staging
 * (e.g. https://website.agricycleenergy.app) and leave it unset in production.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL).replace(/\/+$/, "");

/**
 * Only the production domain is allowed into search indexes. Every other host
 * — staging, the Cloudflare tunnel, preview builds — serves `noindex`, which is
 * what actually keeps duplicates out of Google.
 */
export const IS_PRODUCTION_HOST = SITE_URL === PRODUCTION_URL;

export const site = {
  name: "Agri-Cycle",
  legalName: "Agri-Cycle Energy, LLC",
  tagline: "Food Full Circle",
  claim: "You've got the power.",
  description:
    "Agri-Cycle is the premier organics recycling service in the United States. We convert wasted food and other organic streams into renewable energy, rich compost, and animal feed.",
  url: SITE_URL,
  productionUrl: PRODUCTION_URL,
  phone: "1-800-850-9560",
  phoneHref: "tel:+18008509560",
  email: "info@agricycleenergy.com",
  itEmail: "itdept@agricycleenergy.com",
  address: {
    street: "500 Southborough Drive, Suite 106",
    city: "South Portland",
    state: "ME",
    zip: "04106",
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/agricycleenergy" },
    { label: "Twitter", href: "https://twitter.com/agricycleenergy" },
    { label: "Instagram", href: "https://www.instagram.com/agricycleenergy/" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Food Waste Collection Services",
        href: "/services",
        description: "Toter service, high-volume liquids, roll-off and emergencies.",
      },
      {
        label: "How Collection Works",
        href: "/services/collection",
        description: "What you do, what we do, and who we work with.",
      },
      {
        label: "Service Area",
        href: "/service-area",
        description: "14 states on route, custom programs nationally — plus state ban rules.",
      },
      {
        label: "Frequently Asked Questions",
        href: "/faq",
        description: "Costs, containers, odor, training and the depackager.",
      },
      {
        label: "Impact Calculator",
        href: "/calculator",
        description: "See the greenhouse gases your diversion would avoid.",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      {
        label: "Why Agri-Cycle",
        href: "/about/why-agri-cycle",
        description: "Reasons to keep wasted food out of the trash.",
      },
      {
        label: "What Is Anaerobic Digestion?",
        href: "/about/anaerobic-digestion",
        description: "The biology that turns scraps into energy.",
      },
      {
        label: "Our Depackaging Solution",
        href: "/about/depackaging",
        description: "Recovering food from plastic, metal and cardboard.",
      },
      {
        label: "Processing Partners",
        href: "/about/processing-partners",
        description: "The digester network that closes the loop.",
      },
      {
        label: "History",
        href: "/about/history",
        description: "Five generations at Stonyvale Farm in Exeter, Maine.",
      },
      { label: "Our Team", href: "/about/team", description: "The people behind the fleet." },
      { label: "Employment", href: "/careers", description: "Open roles across the company." },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * How we describe our footprint. "Maine to California" over-promised a
 * scheduled route everywhere; these two lines separate what we run on a route
 * from what we build to order, which is the honest version of the same reach.
 */
export const serviceArea = {
  headline: "14 states on route. The rest of the country, by design.",
  short: "Scheduled route collections in 14 states, customized programs nationally.",
  long: "We run scheduled route collections in 14 states. Outside that footprint we build customized programs — palletized freight, roll-off, recall and emergency work — for producers anywhere in the country.",
  routed: "14 states",
  national: "customized programs nationally",
} as const;

/** Small stat strip used under the hero and on interior pages. */
export const stats = [
  { value: 2400, suffix: "+", label: "Collection locations", sub: "on scheduled routes" },
  { value: 850, suffix: "+", label: "Commercial partners", sub: "from restaurants to national grocers" },
  { value: 14, suffix: "", label: "States on route", sub: "plus custom programs nationally" },
  { value: 2013, suffix: "", label: "Serving since", sub: "born from a fifth-generation dairy", raw: true },
];

export type Service = {
  slug: string;
  name: string;
  blurb: string;
  items: string[];
  image: string;
  accent: "leaf" | "sky" | "sun";
};

export const services: Service[] = [
  {
    slug: "toter-service",
    name: "Toter Service",
    blurb:
      "Scheduled route collection using 32- and 64-gallon totes, sized for crowded kitchens and busy loading docks alike.",
    items: [
      "Grocers",
      "Restaurants",
      "Residential drop-off",
      "Universities & Schools",
      "Hospitals",
      "Municipalities",
      "and more",
    ],
    image: "/img/site/toters.jpg",
    accent: "leaf",
  },
  {
    slug: "high-volume-liquids",
    name: "High Volume Liquids",
    blurb:
      "Vacuum-pump tanker trucks hauling up to 8,500 gallons for producers whose organics arrive by the thousand gallons.",
    items: [
      "Breweries",
      "Production facilities",
      "Ice cream / dairy",
      "Slurry",
      "Food grease",
      "Liquid bi-products",
      "and more",
    ],
    image: "/img/site/tanker-truck.jpg",
    accent: "sky",
  },
  {
    slug: "roll-off-and-emergencies",
    name: "Roll Off & Emergencies",
    blurb:
      "Roll-off containers, gaylord boxes and palletized pickups for mass loss, recalls and one-off events — nationwide.",
    items: [
      "Emergency services",
      "Palletized food waste (nationwide)",
      "Large producers",
      "One-off service",
      "Mass loss at grocers",
      "Recall",
      "and more",
    ],
    image: "/img/site/truck-rolloff.png",
    accent: "sun",
  },
];

/** The four-part story told on the services and collection pages. */
export const howItWorks = [
  {
    step: "01",
    title: "What You Do",
    body: "If you care about the planet and want to use sustainable practices at your business, town, or school, call Agri-Cycle today to customize a program that meets your needs and goals. All you have to do is put your food waste in our designated container and we'll take it from there. If your business or organization needs a solution for wasted packaged food, we can take that material as well.",
    image: "/img/site/containers.jpg",
  },
  {
    step: "02",
    title: "What We Do",
    body: "Agri-Cycle operates a fleet of collection vehicles dedicated to both solid and liquid food waste collection. We accept all types of organic waste streams including produce, meat, seafood, and dairy, as well as brewery and other industrial food waste. Our fleet is capable of collecting palletized packaged food waste, either as part of our scheduled routes, an emergency or an on-call basis.",
    image: "/img/site/collectiontruck.jpg",
  },
  {
    step: "03",
    title: "Who We Work With",
    body: "Agri-Cycle works with thousands of partner locations throughout the US, making it a premier organics hauling company in the nation. Our partners include supermarkets, restaurants, universities, distribution centers, food processing plants, corporate cafeterias, school districts, municipalities, and hospitals.",
    image: "/img/site/cafeteria.jpg",
  },
  {
    step: "04",
    title: "Where It Goes",
    body: "Agri-Cycle partners with a robust network of anaerobic digesters, composters, and animal feed outlets across the country in offering the very best solution for your organic waste stream. All food scraps collected by Agri-Cycle are sustainably managed at partner facilities, and never go to landfills or incinerators. In short, Agri-Cycle brings food full circle.",
    image: "/img/site/digester.jpg",
  },
];

/** Nodes of the interactive Food Full Circle diagram. */
export const cycle = [
  {
    key: "waste",
    label: "Wasted food",
    icon: "apple",
    body: "Produce, meat, seafood, dairy, brewery and industrial streams are collected from restaurants, grocers, brewers and institutions — packaged or loose.",
  },
  {
    key: "collect",
    label: "Collection",
    icon: "truck",
    body: "A diverse fleet of rear-loaders, dump trailers and vacuum-pump tankers keeps every load travelling no further than it has to.",
  },
  {
    key: "depack",
    label: "De-packaging",
    icon: "package",
    body: "Paddles, blades and screens separate expired or damaged food from its plastic, metal or cardboard container, recovering what is still valuable.",
  },
  {
    key: "digest",
    label: "Anaerobic digestion",
    icon: "digester",
    body: "Microorganisms break down the organics without oxygen. Methane and other gases are captured rather than released to the atmosphere.",
  },
  {
    key: "energy",
    label: "Renewable energy",
    icon: "zap",
    body: "Captured biogas is combusted for electricity and heat, or processed into renewable natural gas and transportation fuels.",
  },
  {
    key: "soil",
    label: "Fertilizer & feed",
    icon: "sprout",
    body: "Bio-separators recover liquid and solid digestate for use as rich fertilizer, soil amendment, animal bedding and animal feed.",
  },
  {
    key: "farm",
    label: "Back to the farm",
    icon: "leaf",
    body: "Nutrients return to the fields that grow the next crop — and the cows whose manure co-digests with your scraps. Food, full circle.",
  },
];

export const faqs = [
  {
    q: "How much will it cost?",
    a: "It depends, but rest assured that our fees are typically competitive — if not cheaper — than your current disposal costs. It is helpful for us to get familiar with your operation to determine your specific needs & goals. This information is used to provide a plan (and estimate) that best fits your operation. Our goal from day one has been to provide a service that is professional, reliable, friendly & cost-competitive while helping you meet your sustainability goals. There are many variables to every circumstance, but it's fair to say we've seen it all and we are here to help you make the right plan for your operation.",
    group: "Getting started",
  },
  {
    q: "What can I put in the totes?",
    a: "Everything you'd put in your backyard compost pile — vegetable and fruit trimmings, eggshells, breads, grains, meat and fish scraps, dairy products, soiled coffee filters, paper towels and more. Thanks to our state-of-the-art de-packaging capabilities, we can also accept food products still in their packaging. Our only exception is that we cannot accept any glass, diapers and a handful of other items. Please feel free to call us with any more specific questions.",
    group: "What we accept",
  },
  {
    q: "What do you use for containers?",
    a: "Agri-Cycle relies on a wide array of containers, large and small, to fulfill our collective mission of keeping food scraps out of the waste stream. We offer 32-gallon totes for crowded spaces and small operations, and larger 64-gallon containers, gaylord boxes, and roll-off containers for larger operations and mass loss situations; for example, a supermarket needing to clean out a freezer during a power outage.",
    group: "Day to day",
  },
  {
    q: "Do you wash the totes?",
    a: "During each tote service, Agri-Cycle inserts a new liner designed to contain smelly residue and help keep odors to a minimum. In extreme summer heat we will make special arrangements to wash your totes using our state-of-the-art wash trailer.",
    group: "Day to day",
  },
  {
    q: "Will it stink? What about animals?",
    a: "We're in this together, and like you, we do not want any unwanted odor or pest nuisances at your location. For starters, we customize our collection strategy by first paying you a visit to get familiar with your specific needs and constraints. Once we've agreed on a good, solid plan and have launched service, we use liners that are replaced each time we empty your totes that help keep odors to a minimum and therefore less attractive to pests.",
    group: "Day to day",
  },
  {
    q: "How do you collect the food scraps?",
    a: "We have a fleet of vehicles made for the open road and small city streets. In most cases, we use a small rendering truck with tipper-bucket to empty totes staged at a designated location on site. In other situations we utilize dump-trailers for industrial solid waste collections, or vacuum-pump tanker trucks that specialize in liquids collections from partners such as breweries, processing facilities, and grease traps.",
    group: "Day to day",
  },
  {
    q: "What do you do with the food scraps when they get to their designated processing facility?",
    a: "We are proud to say that all food scraps collected by Agri-Cycle are sustainably managed at partner anaerobic digestion or composting facilities, and never go to landfills or incinerators. The food waste is converted to renewable energy or rich compost, and in some cases animal feed.",
    group: "Where it goes",
  },
  {
    q: 'What is "anaerobic digestion"?',
    a: "Anaerobic digestion is a biological process in which microorganisms break down organic material in the absence of oxygen. Methane and other gases that result are captured in commercial digesters and combusted to generate electricity, heat, and fertilizer. Biogas can also be processed into renewable natural gas and transportation fuels. Anaerobic digestion is even greener than composting food waste — because it completely eliminates harmful greenhouse gases from the atmosphere.",
    group: "Where it goes",
  },
  {
    q: "What about food waste that has expired in its packaging. Do I have to separate it?",
    a: "No, you don't: we accept all damaged or expired packaged foods, including items in metal cans, plastic jugs, and cardboard boxes. That said, we do encourage you to separate as much of the lost food product from their containers as possible to maximize your space in our containers and keep our program cost down. Please note: we do not accept packaging with a low volume of waste or anything packaged in glass.",
    group: "What we accept",
  },
  {
    q: "How do you get the food out of the packaging?",
    a: "We load the packaged food into the depackaging machine, which uses a series of fans, paddles and screens to separate the food from the packaging.",
    group: "What we accept",
  },
  {
    q: "My current trash bill is a flat fee no matter how much I throw away. What do I do?",
    a: "Speak with your current waste provider and let them know you'd like to work with us on a food waste program. If they are a good partner, they will work with you on meeting your goals both operationally and financially. If your current hauler is not willing to adjust the service for you to encourage recycling, we can provide the names of other haulers who would be happy to work with you.",
    group: "Getting started",
  },
  {
    q: "Do you do any staff training? How about signage that clearly states guidelines?",
    a: "We offer staff trainings upon request and provide signage that clearly states what we can and cannot accept.",
    group: "Getting started",
  },
  {
    q: "Do you have any marketing materials, such as window stickers or table tents, if I want to publicize our efforts?",
    a: "Yes. And we are happy to share them. Want some? Just ask.",
    group: "Getting started",
  },
];

export const team = [
  {
    name: "Dan Bell",
    role: "CEO / Co-Founder",
    image: "/img/team/dan-bell.jpg",
    bio: "Dan has over 20 years of exceptional business skills owning, leading and developing businesses, growing Agri-Cycle from its first employee to a company that is now offering services across the country. In conjunction, he has built Bellport Property Management in Portland, ME to be one of the state's largest property management companies. Dan also founded and sits on the Board of the Bargetzi ALS. His considerable success is a function of his strategic thinking as well as his ability to adapt to change with speed and professionalism, skills that are invaluable to Agri-Cycle.",
  },
  {
    name: "Shane Albert",
    role: "Chief Operating Officer",
    image: "/img/team/shane-albert.jpg",
    bio: "Shane provides strategic leadership across all operational and financial functions. In this dual executive role, Shane drives organizational performance through disciplined financial management, operational excellence, and data-driven decision-making. He plays a pivotal role in ensuring efficient day-to-day operations while supporting long-term growth initiatives. Shane earned his MBA from the University of Maine at Orono.",
  },
  {
    name: "Geno Gervais",
    role: "General Manager",
    image: "/img/team/geno-gervais.jpg",
    bio: "Geno comes to Agri-Cycle with decades of experience in the solid waste industry. From humble beginnings as a route driver, Geno has risen through the ranks of some of the country's largest solid waste companies, gaining knowledge and experience necessary to adapt in an ever-changing environment. With a focus on operational efficiencies, sustainable business practices and human resource management, Geno is an integral part of the Agri-Cycle team.",
  },
  {
    name: "Greg Williams",
    role: "Director of Public Policy & Affairs",
    image: "/img/team/greg-williams.jpg",
    bio: "Greg follows legislation related to the organics industry and works with federal, state, and local agencies, NGOs, and citizen stakeholders on advancing food waste diversion in the company's service areas. Greg joined in 2014 with diverse experience in the field, including sales, consulting, business development, and operations. He holds a Master's in Public Policy & Planning from the University of Southern Maine's Muskie School of Public Service, and he was a founder and manager of a commercial composting business in Portland, Maine.",
  },
  {
    name: "Holden Cookson",
    role: "VP of Strategy & Development",
    image: "/img/team/holden-cookson.jpg",
    bio: "Holden operates at the intersection of strategy, operations, and finance, building data-driven business cases that link diversion performance to lower disposal costs, ESG impact, and scalable systems. He believes effective circular-economy solutions should deliver environmental, operational, and financial value at scale.",
  },
  {
    name: "Marc Draper",
    role: "Senior Operations Manager",
    image: "/img/team/marc-draper.jpg",
    bio: "An Exeter, Maine native, Marc Draper has been with Agri-Cycle since 2014, and currently serves as the company's fleet manager. Marc's 25-plus years of trucking experience have proven invaluable in managing a broad network of collection routes for both solid and liquid organics in Maine, New Hampshire, Vermont, Massachusetts and Rhode Island.",
  },
  {
    name: "Evan LaPointe",
    role: "Logistics Manager",
    image: "/img/team/evan-lapointe.jpg",
    bio: "Evan joined in 2017 after working in various roles in the customer service industry, emphasizing customer focus, timely service, and a detail-oriented approach. He is heavily involved in the daily operations of the company and works closely with the management team and drivers to ensure superior customer service while maximizing efficiency.",
  },
];

export const processingPartners = [
  {
    name: "Exeter Agri-Energy",
    location: "Exeter, Maine",
    featured: true,
    body: "Our sister company, co-located with Stonyvale Farm, a fifth-generation dairy operation. Manure from the farm's 2,000 dairy cows is combined with food waste in EAE's anaerobic digester for efficient conversion into biofuel and fertilizer.",
    facts: [
      "3 anaerobic digestion vessels",
      "3.2 million gallons of treatment capacity",
      "3 MW co-digestion system",
      "70,000 kWh of electricity daily",
      "Powers as many as 2,500 households annually",
      "Daily heat equal to 2,100 gallons of heating oil",
    ],
    image: "/img/hero/eae-aerial.jpg",
  },
  {
    name: "Quantum Organics",
    location: "Southington, CT",
    body: "A state-of-the-art anaerobic digestion and composting operation.",
  },
  {
    name: "Lewiston Auburn Water Pollution Control Authority",
    location: "Lewiston, Maine",
    body: "The anaerobic digestion facility consists of two mesophilic digesters with a capacity of 690,000 gallons each. The facility digests approximately 45,000 gallons per day of thickened activated and primary sludge — producing more than 14,000 cubic yards of digested material annually — which is either land-applied or sent to the Authority composting facility in Auburn.",
  },
  {
    name: "Vanguard Renewables",
    location: "Rutland and Hadley, Massachusetts",
    body: "Vanguard Renewables operates two anaerobic digesters in Massachusetts: at Jordan's Dairy Farm in Rutland and Barstow's Longview Farm in Hadley. The company markets fertilizer products derived from digestion. The biogas produced at each site powers small combined heat and power units, which provide electricity and heat to the farms' buildings. Surplus electricity is distributed through the power grid.",
  },
  {
    name: "Ag-Grid Energy",
    location: "Granville, Massachusetts",
    body: "Ag-Grid Energy partners with some of America's premier dairy farms to finance, build and operate digestion & waste-to-energy facilities. Their vision is to convert agricultural and organic waste into renewable energy & compost while supporting sustainable local area practices. Currently Ag-Grid Energy operates several digestion sites at dairy farms in Massachusetts & Connecticut, and they are growing quickly.",
  },
];

export type Testimonial = {
  /** The full quote, exactly as the partner gave it. */
  quote: string;
  /**
   * A verbatim, contiguous excerpt of `quote`, short enough to read on a card
   * as it scrolls past. Never paraphrase this — trim only.
   */
  pull: string;
  name: string;
  title: string;
  org: string;
  /** Short name used on the scrolling cards. */
  orgShort: string;
  href: string;
};

/**
 * Every quote here is transcribed from the partner profile it links to. Do not
 * add a testimonial without a source we can point at — see `pendingTestimonials`
 * below for the ones we have been asked to add and are still waiting on.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "We changed our composting vendor at the beginning of last year to Agri-Cycle and we are quite happy. The pickup process is more convenient and less work for our staff; we can send Agri-Cycle a wider variety of compostable food and products which means less sorting on site; and it is less expensive than our previous composting process and substantially cheaper than the landfill. Rarely are there solutions for waste streams that are convenient, less work, and less expensive, but we have found one.",
    pull: "Rarely are there solutions for waste streams that are convenient, less work, and less expensive, but we have found one.",
    name: "Kevin Bright",
    title: "Sustainability Coordinator",
    org: "Colby College, Waterville, ME",
    orgShort: "Colby College",
    href: "/blog/bonapetit-cafeteria-at-colby-college",
  },
  {
    quote:
      "Working with the Agri-Cycle team is easy and enjoyable. They are always available when needed and respond promptly to any requests. As a nonprofit organization we are always looking for the most cost effective and efficient way to do our work. Thanks to Agri-Cycle, the Food Bank is saving money and staff labor that we previously spent dealing with waste. Every dollar saved is a dollar that can provide 4 meals to a Maine family facing hunger.",
    pull: "Thanks to Agri-Cycle, the Food Bank is saving money and staff labor that we previously spent dealing with waste. Every dollar saved is a dollar that can provide 4 meals to a Maine family facing hunger.",
    name: "Clara Whitney",
    title: "Director of Public Affairs",
    org: "Good Shepherd Food Bank, Auburn, ME",
    orgShort: "Good Shepherd Food Bank",
    href: "/blog/good-shepherd-food-bank-auburn-me",
  },
  {
    quote:
      "As part of our Certified Environmental Leader initiatives, Agri-Cycle has been a valuable service for us. They have made composting a user-friendly program by providing the bins and working out a timely pick-up. The cost is offset by the tonnage we are not putting in our dumpster, which would be incinerated otherwise. We know that our food scraps are going to good use.",
    pull: "The cost is offset by the tonnage we are not putting in our dumpster, which would be incinerated otherwise. We know that our food scraps are going to good use.",
    name: "Chris Merriam",
    title: "Executive Chef, Food and Beverage Manager",
    org: "Marriott Sable Oaks, South Portland, ME",
    orgShort: "Marriott Sable Oaks",
    href: "/blog/marriott-sable-oaks-south-portland-me",
  },
];

/**
 * Requested for the scrolling testimonial strip, blocked on copy.
 *
 * The quotes live in the "Customer Testimonials" slides of the sales deck, which
 * is not in this repo, so nothing here is written yet — a testimonial attributed
 * to a named person at a named company has to be their words, not ours. Drop each
 * one into `testimonials` above (with a `pull` excerpt and a source link) as the
 * text arrives, and delete its row here.
 */
export const pendingTestimonials = [
  { org: "Hannaford", contacts: ["Samantha Pease", "Ericka Dodge"] },
  {
    org: "Amazon",
    contacts: ["Sally Palmiter", "Patricia Sullivan", "Sam Mehta", "Deidre Kruckenberg"],
  },
  { org: "ecomaine", contacts: ["Kevin Roche"] },
  { org: "Vail Resorts", contacts: ["Mike Johnson"] },
  { org: "Whole Foods", contacts: ["Karen Franczyk"] },
  { org: "Market Basket", contacts: ["Bernie Socha"] },
  { org: "Good Shepherd Food Bank", contacts: ["Sam Michaud"] },
] as const;

export type TimelineEntry = {
  year: string;
  /** Two or three words for the jump-to rail above the timeline. */
  chapter: string;
  title: string;
  body: string;
  /** The one number or phrase worth remembering from this milestone. */
  marker?: { value: string; label: string };
  image: string;
  /** Icon key, mapped to a lucide component in `Timeline.tsx`. */
  icon: "sprout" | "milk" | "zap" | "truck" | "droplets" | "handshake";
  accent: "moss" | "leaf" | "sun" | "sky";
  contain?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    year: "Late 1800s",
    chapter: "The land",
    title: "The Fogler family works the land",
    body: "The Fogler family has been farming in Exeter, Maine since the late 1800s. Willis J. Peabody, then patriarch, and family at the farm around 1935 — Willis' daughter married a Fogler, and the rest is history.",
    marker: { value: "5", label: "generations on the same ground" },
    image: "/img/site/history-family.jpg",
    icon: "sprout",
    accent: "moss",
  },
  {
    year: "1950s",
    chapter: "The dairy",
    title: "Stonyvale becomes a commercial dairy",
    body: "The farm started as a commercial operation in the early 1950s with only 17 cows.",
    marker: { value: "17", label: "cows at the start" },
    image: "/img/site/history-cows.jpg",
    icon: "milk",
    accent: "leaf",
  },
  {
    year: "2011",
    chapter: "The digesters",
    title: "Digesters arrive on the farm",
    body: "Anaerobic digesters were installed at Stonyvale Farm to help with manure management and to diversify revenue through manure conversion to biofuel.",
    marker: { value: "3", label: "anaerobic digesters" },
    image: "/img/site/digester.jpg",
    icon: "zap",
    accent: "sun",
  },
  {
    year: "2013",
    chapter: "Agri-Cycle",
    title: "Agri-Cycle is established",
    body: "Agri-Cycle was founded to support sister company Exeter Agri-Energy. What began as a way to preserve the viability of a family farm blossomed into a sustainable solution for businesses and organizations seeking a home for wasted food.",
    marker: { value: "2013", label: "first collection routes" },
    image: "/img/site/depackager-loading.jpg",
    icon: "truck",
    accent: "sky",
  },
  {
    year: "Today",
    chapter: "At scale",
    title: "Over 2,000 animals, 6 million gallons",
    body: "The farm now has over 2,000 animals on site — 1,200 milked each day and more than 1,000 young stock — with storage for 6 million gallons of manure.",
    marker: { value: "6M", label: "gallons of manure storage" },
    image: "/img/site/cows-today.jpeg",
    icon: "droplets",
    accent: "leaf",
  },
  {
    year: "2025",
    chapter: "Closed Loop",
    title: "Closed Loop Partners acquires Agri-Cycle",
    body: "Agri-Cycle was purchased by Closed Loop Partners, a New York-based private equity firm specializing in the circular economy and sustainable materials management. Agri-Cycle continues to work with EAE as a partner alongside a growing network of outlets across the nation.",
    image: "/img/partners/closed-loop.png",
    icon: "handshake",
    accent: "sun",
    contain: true,
  },
];

export const whyReasons = [
  {
    title: "We convert your wasted food",
    body: "Into renewable energy, soil amendment, and animal feed — not landfill methane.",
    icon: "zap",
  },
  {
    title: "We keep organics out of landfills",
    body: "Prolonging their lifespan and preventing the release of potent greenhouse gases.",
    icon: "shield",
  },
  {
    title: "We're typically cheaper",
    body: "Than traditional forms of disposal, and the savings show up on your monthly trash bill.",
    icon: "dollar",
  },
];

export const wasteFacts = [
  {
    stat: "3rd",
    label: "largest emitter",
    body: "If global food waste were a country, it would be the third-largest contributor of greenhouse gases, behind only the US and China.",
  },
  {
    stat: "40%",
    label: "of US food wasted",
    body: "Nearly 40 percent of food produced in the U.S. is wasted each year, and the majority ends up in landfills where it converts to methane.",
  },
  {
    stat: "58%",
    label: "of landfill methane",
    body: "Food sent to landfill is responsible for 58% of landfill methane emissions released to the atmosphere.",
  },
  {
    stat: "27 yrs",
    label: "of landfill capacity",
    body: "There are only 27 years of median landfill capacity remaining in the U.S. — and less in population centers.",
  },
];

/* ---------------------------------------------------------------------------
   State organics policy tiles.
   The old site asked "does your state have a food-waste ban?" behind a slider;
   this rebuild turns it into an interactive tile map. Positions are a stylised
   US grid (row/col), not true geography.
--------------------------------------------------------------------------- */
export type BanLevel = "universal" | "commercial" | "local" | "none";

export const banLevels: Record<BanLevel, { label: string; short: string; color: string }> = {
  universal: {
    label: "Universal mandate",
    short: "Applies to businesses and residents",
    color: "var(--color-leaf-deep)",
  },
  commercial: {
    label: "Commercial mandate",
    short: "Threshold-based requirement for larger generators",
    color: "var(--color-leaf)",
  },
  local: {
    label: "Local programs & incentives",
    short: "City, county or incentive-led diversion",
    color: "var(--color-sky)",
  },
  none: {
    label: "No statewide mandate yet",
    short: "Diversion is still voluntary — and still worth it",
    color: "var(--color-clay)",
  },
};

export type StateTile = {
  code: string;
  name: string;
  row: number;
  col: number;
  level: BanLevel;
  note?: string;
};

export const stateTiles: StateTile[] = [
  { code: "AK", name: "Alaska", row: 1, col: 1, level: "none" },
  {
    code: "ME",
    name: "Maine",
    row: 1,
    col: 11,
    level: "local",
    note: "Home state. Statewide organics recycling goals plus municipal food-scrap programs, including residential drop-off in Brunswick.",
  },
  {
    code: "VT",
    name: "Vermont",
    row: 2,
    col: 10,
    level: "universal",
    note: "Under the Universal Recycling Law (Act 148), food scraps have been banned from the landfill for every generator — businesses and households alike — since July 1, 2020.",
  },
  {
    code: "NH",
    name: "New Hampshire",
    row: 2,
    col: 11,
    level: "commercial",
    note: "As of February 1, 2025, generators disposing of one ton or more of food waste per week must divert it if an authorised facility is within 20 miles.",
  },
  { code: "WA", name: "Washington", row: 3, col: 1, level: "commercial", note: "Organics management law phases in business requirements by volume." },
  { code: "ID", name: "Idaho", row: 3, col: 2, level: "none" },
  { code: "MT", name: "Montana", row: 3, col: 3, level: "none" },
  { code: "ND", name: "North Dakota", row: 3, col: 4, level: "none" },
  { code: "MN", name: "Minnesota", row: 3, col: 5, level: "local", note: "Metro-area counties require organics collection options for large generators." },
  { code: "IL", name: "Illinois", row: 4, col: 6, level: "local", note: "Composting infrastructure and local diversion programs, no statewide ban." },
  { code: "WI", name: "Wisconsin", row: 3, col: 6, level: "none" },
  { code: "MI", name: "Michigan", row: 3, col: 7, level: "local", note: "State organics management plan targets food-waste reduction by 2030." },
  {
    code: "NY",
    name: "New York",
    row: 3,
    col: 9,
    level: "commercial",
    note: "The Food Donation and Food Scraps Recycling Law requires large generators to donate edible food and recycle scraps when an organics recycler is nearby.",
  },
  {
    code: "CT",
    name: "Connecticut",
    row: 4,
    col: 11,
    level: "commercial",
    note: "Commercial organics recycling law covers larger generators located within a set distance of a permitted processing facility.",
  },
  {
    code: "MA",
    name: "Massachusetts",
    row: 3,
    col: 10,
    level: "commercial",
    note: "The commercial organic material waste ban tightened in November 2022, cutting the threshold from one ton to half a ton of food waste per week.",
  },
  { code: "OR", name: "Oregon", row: 4, col: 1, level: "local", note: "Portland metro requires business food-scrap collection." },
  { code: "NV", name: "Nevada", row: 4, col: 2, level: "none" },
  { code: "WY", name: "Wyoming", row: 4, col: 3, level: "none" },
  { code: "SD", name: "South Dakota", row: 4, col: 4, level: "none" },
  { code: "IA", name: "Iowa", row: 4, col: 5, level: "none" },
  { code: "IN", name: "Indiana", row: 4, col: 7, level: "none" },
  { code: "OH", name: "Ohio", row: 4, col: 8, level: "local" },
  { code: "PA", name: "Pennsylvania", row: 4, col: 9, level: "local", note: "Philadelphia and other municipalities run organics programs; no statewide ban." },
  {
    code: "NJ",
    name: "New Jersey",
    row: 4,
    col: 10,
    level: "commercial",
    note: "The Food Waste Recycling Law requires large generators to divert food waste when an authorised facility is within range.",
  },
  { code: "RI", name: "Rhode Island", row: 3, col: 11, level: "commercial", note: "The food residuals law covers large generators located near a licensed composting or digestion facility." },
  {
    code: "CA",
    name: "California",
    row: 5,
    col: 1,
    level: "universal",
    note: "SB 1383 sets statewide organic waste reduction targets and requires organics collection service for businesses and residents.",
  },
  { code: "UT", name: "Utah", row: 5, col: 2, level: "none" },
  { code: "CO", name: "Colorado", row: 5, col: 3, level: "local" },
  { code: "NE", name: "Nebraska", row: 5, col: 4, level: "none" },
  { code: "MO", name: "Missouri", row: 5, col: 5, level: "none" },
  { code: "KY", name: "Kentucky", row: 5, col: 6, level: "none" },
  { code: "WV", name: "West Virginia", row: 5, col: 7, level: "none" },
  { code: "VA", name: "Virginia", row: 5, col: 8, level: "local" },
  {
    code: "MD",
    name: "Maryland",
    row: 5,
    col: 9,
    level: "commercial",
    note: "Since 2023 large generators located within 30 miles of an organics recycling facility must divert food residuals; the threshold has since tightened.",
  },
  { code: "DE", name: "Delaware", row: 5, col: 10, level: "local" },
  { code: "AZ", name: "Arizona", row: 6, col: 2, level: "none" },
  { code: "NM", name: "New Mexico", row: 6, col: 3, level: "none" },
  { code: "KS", name: "Kansas", row: 6, col: 4, level: "none" },
  { code: "AR", name: "Arkansas", row: 6, col: 5, level: "none" },
  { code: "TN", name: "Tennessee", row: 6, col: 6, level: "none" },
  { code: "NC", name: "North Carolina", row: 6, col: 7, level: "local" },
  { code: "SC", name: "South Carolina", row: 6, col: 8, level: "none" },
  { code: "DC", name: "District of Columbia", row: 6, col: 9, level: "local", note: "Residential food-waste drop-off and commercial diversion programs." },
  { code: "OK", name: "Oklahoma", row: 7, col: 4, level: "none" },
  { code: "LA", name: "Louisiana", row: 7, col: 5, level: "none" },
  { code: "MS", name: "Mississippi", row: 7, col: 6, level: "none" },
  { code: "AL", name: "Alabama", row: 7, col: 7, level: "none" },
  { code: "GA", name: "Georgia", row: 7, col: 8, level: "local" },
  { code: "HI", name: "Hawaii", row: 8, col: 1, level: "none" },
  { code: "TX", name: "Texas", row: 8, col: 4, level: "local", note: "Austin's Universal Recycling Ordinance requires food-permitted businesses to divert organics." },
  { code: "FL", name: "Florida", row: 8, col: 8, level: "local" },
];

export const banTypes = [
  {
    title: "Large quantity / commercial bans",
    body: "Many states place bans on businesses that produce large amounts of food waste — usually 50 to 100 tons annually, and in some states far less.",
  },
  {
    title: "Residential bans",
    body: "Some bans extend to residents as well, with a focus on removing food waste from individual households' garbage.",
  },
  {
    title: "State-wide or city-wide bans",
    body: "Many residential bans or incentives sit at the city or county level for large urban centers. Check whether one of your locations is covered.",
  },
  {
    title: "Incentive programs",
    body: "Some states instead provide tax breaks and other incentives for food donations or other higher-use situations.",
  },
];

/** Recognisable partner logos shown in the marquee. */
export const partnerLogos = [
  { name: "Hannaford", src: "/img/partners/hannaford.jpg" },
  { name: "L.L.Bean", src: "/img/partners/llbean.png" },
  { name: "Closed Loop Partners", src: "/img/partners/closed-loop.png" },
  { name: "Portland Food Co-op", src: "/img/partners/pfc.png" },
  { name: "City of South Portland", src: "/img/partners/south-portland.png" },
];

export const partnerNames = [
  "Supermarkets",
  "Restaurants",
  "Universities",
  "Distribution centers",
  "Food processing plants",
  "Corporate cafeterias",
  "School districts",
  "Municipalities",
  "Hospitals",
  "Breweries",
  "Hotels",
  "Food banks",
];

export const pressRelease = {
  date: "2025-08-20",
  dateLabel: "August 20, 2025",
  location: "New York, NY",
  eyebrow: "Company news",
  title:
    "Closed Loop Partners' Private Equity Group Acquires Leading Organics Waste Management Platform, Agri-Cycle",
  standfirst:
    "The acquisition accelerates Agri-Cycle's national expansion across the U.S. to divert organic waste from landfills and convert valuable resources to clean energy and fertilizer.",
  body: [
    "Today, Closed Loop Partners announces their acquisition of Agri-Cycle, a premier provider of organics collection for commercial & industrial sectors across the U.S. The acquisition was completed by Closed Loop Private Equity.",
    "Since its inception in 2013, Agri-Cycle has expanded significantly, now operating as a leading provider of organics management services in the U.S. The company collects organic waste from over 2,400 locations across 14 U.S. states, and provides clients with education, collection, processing and disposal services, as well as data analytics and reporting to maximize cost savings and landfill diversion. They serve over 850 commercial and industrial customers, including Hannaford and other leading national players, addressing the ~$110 billion market for food waste management within the food industry.",
    "Agri-Cycle's acquisition takes place as strong regulatory tailwinds, including landfill disposal bans and organics diversion mandates in states including Maine, New Hampshire, Vermont and Massachusetts, accelerate demand for organics collection. Today, up to 40% of all food in the U.S. goes to landfill, equivalent to an estimated $340 billion in value and responsible for 58% of landfill methane emissions released to the atmosphere. With only 27 years of median landfill capacity remaining in the U.S. — and less in population centers — the need for scaled circular food waste management services is critical.",
    "Following the acquisition, Agri-Cycle's management team will partner with Closed Loop Partners to expand the company's reach and services. With the firm's deep experience in running circular economy businesses across a range of materials, and extensive ecosystem of the world's largest corporations, institutional investors and notable family offices, Agri-Cycle has strategic support at a pivotal moment of expansion.",
    "This is Closed Loop Private Equity's most recent platform acquisition, employing a buy-and-build strategy to partner with companies and scale platforms and enabling technologies across plastics & packaging, circular technology, food & agriculture, the built environment, energy efficiency, textiles and healthcare, aiming to develop, accelerate and modernize circular supply chains and recycling & reuse infrastructure.",
    "Closed Loop Private Equity's acquisition of Agri-Cycle marks a key milestone for Closed Loop Partners' work to advance organics circularity — a key focus area for the firm alongside plastics & packaging, textiles and electronics. The firm's broader work in organics spans solutions at every point of the value chain, including platforms to support regenerative food production, innovations to extend food shelf life, technologies to mitigate post-consumer organic waste, compostable packaging field tests, and composting and anaerobic digestion infrastructure.",
  ],
  quotes: [
    {
      quote:
        "Closed Loop Partners is proud to back Agri-Cycle, and partner with their management team to accelerate their path to scale and drive meaningful impact for organics circularity in the U.S. Through this acquisition, we can together capture the significant market opportunity for food and organic waste diversion in the U.S.",
      name: "Jackson Pei",
      title: "Co-head of Closed Loop Private Equity, Closed Loop Partners",
    },
    {
      quote:
        "The deep sector expertise and long tenured industry relationships of the Agri-Cycle team have laid a strong foundation for a platform positioned to scale both organically and through M&A.",
      name: "Daniel Phan",
      title: "Co-head of Closed Loop Private Equity",
    },
    {
      quote:
        "We look forward to supporting Agri-Cycle's growth into a large national player for organics management, executing on a robust platform of acquisition targets and creating an ecosystem of best-in-class operating businesses in the industry.",
      name: "Derek Trott",
      title: "Vice President of Closed Loop Private Equity",
    },
    {
      quote:
        "Our partnership with Closed Loop Partners marks the next phase of growth for Agri-Cycle Energy, as we work with their team and ecosystem toward our shared goal of driving a circular economy for organics. Agri-Cycle has provided services to keep thousands of tons of food in circulation over the last decade. As the organics waste challenge grows more urgent, we look to continue meeting market demand, and work alongside Closed Loop Partners to accelerate impact at scale.",
      name: "Dan Bell",
      title: "CEO of Agri-Cycle",
    },
  ],
  about: [
    {
      heading: "About Agri-Cycle",
      body: "Agri-Cycle is the premier food-waste-collection service in the Northeast, and we are growing rapidly across the US. We recycle organic waste via anaerobic digestion and composting, turning it into renewable energy and healthy soil. Our partners include supermarkets, restaurants, universities, distribution centers, food processing plants, corporate cafeterias, school districts, municipalities, and hospitals. Agri-Cycle works in conjunction with sister companies Stonyvale Farm (a fifth-generation family business) and Exeter Agri-Energy, as well as a growing network of anaerobic digesters that convert food waste into electricity, fuel, fertilizer, and other beneficial products. Our unique model is a fusion of Maine's independent farming tradition and energy innovation. Waste collection is a critical component: Agri-Cycle brings food full circle.",
    },
    {
      heading: "About Closed Loop Partners",
      body: "Closed Loop Partners is at the forefront of building the circular economy. The company is comprised of three key business segments: its investment group, Closed Loop Capital Management; its innovation center, the Center for the Circular Economy; and its operating group, Closed Loop Builders. Closed Loop Capital Management manages venture capital, private equity and catalytic capital & private credit investment strategies. Closed Loop Private Equity seeks to make control investments in cash flowing businesses and enabling technologies to scale platforms that are fundamental to the circular economy, focused on areas including plastics & packaging, circular technology, food & agriculture, the built environment, energy efficiency, textiles and healthcare. Closed Loop Partners is based in New York City and is a registered B Corp.",
    },
  ],
  disclosure:
    "This publication is for informational purposes only, and nothing contained herein constitutes an offer to sell or a solicitation of an offer to buy any interest in any investment vehicle managed by Closed Loop Capital Management or any company in which Closed Loop Capital Management or its affiliates have invested. An offer or solicitation will be made only through a final private placement memorandum, subscription agreement and other related documents with respect to a particular investment opportunity and will be subject to the terms and conditions contained in such documents, including the qualifications necessary to become an investor. Closed Loop Capital Management does not utilize its website to provide investment or other advice, and nothing contained herein constitutes a comprehensive or complete statement of the matters discussed or the law relating thereto. Information provided reflects Closed Loop Capital Management's views as of a particular time and are subject to change without notice. Certain information may contain forward-looking statements, which are subject to risks and uncertainties and speak only as of the date on which they are made. Past performance is not indicative of future results.",
};

export const depackaging = {
  intro:
    "When packaged food products can't be sold or donated, we help recover what's still valuable. Our de-packaging technology separates organic content from packaging, so materials can be composted or recycled, not wasted.",
  body: [
    "De-packaging isn't the solution for all occasions, but it is often the best option for large grocers and food distributors experiencing significant volumes of organics otherwise destined for a landfill or incinerator. In all other situations, we encourage source separation to the best of your staff's ability for a clean organic stream that can either be converted into renewable energy via anaerobic digestion or composted to support soil health.",
    "Agri-Cycle relies on a variety of end uses to recover wasted food, including digestion to energy, composting to soil amendment, and animal feed.",
    "Our state-of-the-art de-packaging machine was the first of its kind in the Northeast, and now many of our partner farm-based digesters are also using this technology. The de-pack is comprised of a network of paddles, blades, and screens that work in unison to separate expired or damaged packaged food from its plastic, metal, or cardboard containers. The resulting food waste slurry is then mixed with the cow manure and digested into renewable energy. This cutting-edge technology makes it possible to recycle expired or spoiled products that otherwise might end up in a landfill.",
    "When possible, leave the de-pack option for the tough-to-separate items, and remove the food from its packaging and recycle that container. And it's always a good reminder that the less packaging we use in the first place results in less packaging that must be managed downstream. Reusable options are becoming increasingly more available, and we support using them as often as possible.",
  ],
  steps: [
    { n: "01", title: "Tipping floor", body: "A loader moves palletized and boxed food waste from the tipping floor into the intake trough." },
    { n: "02", title: "Intake trough", body: "Material is fed steadily into the machine, mixing packaged and loose product together." },
    { n: "03", title: "Separator", body: "Fans, paddles, blades and screens work in unison to strip organics from plastic, metal and cardboard." },
    { n: "04", title: "Slurry out", body: "The recovered food slurry is blended with cow manure and digested into renewable energy." },
  ],
};

export const anaerobic = {
  summary:
    "Anaerobic digestion is a biological process in which microorganisms break down organic material in the absence of oxygen. Methane and other gases that result are captured in commercial digesters and combusted to generate electricity, heat, and fertilizer. Biogas can also be processed into renewable natural gas and transportation fuels.",
  kicker:
    "Anaerobic digestion is even greener than composting food waste — because it completely eliminates harmful greenhouse gases from the atmosphere.",
};

export const blogIntro =
  "Welcome to the Agri-Cycle blog — your resource for food waste recycling news, sustainability tips, and the latest on how anaerobic digestion and organics recycling are transforming the way we power homes, businesses, and communities. Here you'll find practical guidance for managing food waste at your business, research on the true costs of wasted food, and updates on Agri-Cycle's own growth as we help clients and municipalities take their food full circle.";

export const contactIntro =
  "We are excited to hear from you. Fill out the form below to help us determine who from our team is the best fit to reach back out to you. Whether you have landed on this page in hopes to talk about social media collaboration, a service quote, or you're simply curious about what we do — we're happy you're here.";

export const quoteIntro =
  "Thanks for your interest. Please complete the form here to give us some initial information. We will get back to you within three business days.";
