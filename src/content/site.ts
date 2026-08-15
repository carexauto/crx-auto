/**
 * Single source of truth for all editable marketing copy and business facts.
 * Developers maintain content here rather than scattering it across components.
 *
 * IMPORTANT (legal/launch): Do not add licensing claims, registration numbers,
 * insurance dollar amounts, guarantees, or testimonials that are not verified
 * and approved by the business owner. See README and the launch checklist.
 */

export const business = {
  name: "Carex Auto",
  yearsExperience: 5,
  foundedYear: new Date().getFullYear() - 5,
  email: "info@carextransport.com",
  phones: {
    primary: { display: "424-518-1326", href: "tel:+14245181326" },
    secondary: { display: "302-333-6571", href: "tel:+13023336571" },
  },
  address: {
    line1: "39C Chambers Brg Rd",
    city: "Lakewood",
    state: "NJ",
    postalCode: "08701",
    full: "39C Chambers Brg Rd, Lakewood, NJ 08701",
  },
  // Legal disclosure shown in the footer.
  legalNote: "Carex Transport is a trade name of Carex Auto LLC.",
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Carex", href: "#why-carex" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "Nationwide & International Vehicle Transport",
  h1: "Your Vehicle. Our Route. Delivered With Care.",
  supporting:
    "Carex Auto coordinates dependable vehicle transportation across all 50 states and international destinations—with responsive support from quote to delivery.",
  primaryCta: "Get My Free Quote",
  secondaryCta: `Call ${business.phones.primary.display}`,
} as const;

export const trustStrip = [
  "5 Years of Experience",
  "All 50 States Served",
  "International Shipping Options",
  "Open & Enclosed Transport",
] as const;

export const services = [
  {
    title: "Nationwide Auto Transport",
    body: "Door-to-door transport coordination across all 50 states for a single car or a full order.",
  },
  {
    title: "International Vehicle Shipping",
    body: "Coordination for vehicles heading overseas, including port and container logistics options.",
  },
  {
    title: "Dealer & Auction Transportation",
    body: "Reliable movement for dealerships and auctions, including multi-vehicle orders.",
  },
  {
    title: "Carrier Dispatch Solutions",
    body: "Dispatch support for carriers looking for well-organized loads and dependable coordination.",
  },
] as const;

export const howItWorks = [
  {
    step: 1,
    title: "Tell us about the route and vehicle",
    body: "Share pickup, delivery, and vehicle details through the quick quote request form.",
  },
  {
    step: 2,
    title: "Receive a personalized rate",
    body: "Our team reviews your request and gets back to you with a rate tailored to your shipment.",
  },
  {
    step: 3,
    title: "Confirm transport and stay informed",
    body: "Approve the details and we coordinate the transport while keeping you in the loop.",
  },
] as const;

export const whyCarex = [
  {
    title: "Personal, responsive support",
    body: "Talk to real people who follow your shipment from the first quote to delivery.",
  },
  {
    title: "Open and enclosed options",
    body: "Choose the level of protection that fits your vehicle and budget.",
  },
  {
    title: "Nationwide & international coordination",
    body: "One point of contact for shipments across the US and to overseas destinations.",
  },
  {
    title: "Built for every customer",
    body: "We support individuals, dealers, auctions, relocation customers, and carriers.",
  },
  {
    title: "Insurance confirmed before booking",
    body: "Cargo insurance coverage is confirmed as part of the booking process.",
  },
  {
    title: "Multiple transport options",
    body: "Flexible solutions so you only pay for what your shipment actually needs.",
  },
] as const;

export const whoWeHelp = [
  {
    title: "Individual Owners",
    body: "Moving, buying, or selling a vehicle and need it transported with care.",
  },
  {
    title: "Dealerships",
    body: "Keep inventory moving between lots, customers, and other dealers.",
  },
  {
    title: "Auctions",
    body: "Coordinate pickups and deliveries for vehicles bought or sold at auction.",
  },
  {
    title: "Relocation Customers",
    body: "Individuals and companies relocating who need dependable vehicle transport.",
  },
  {
    title: "Carriers",
    body: "Drivers and fleets seeking organized dispatch and steady coordination.",
  },
] as const;

export const faq = [
  {
    q: "How is my quote calculated?",
    a: "After you send your request, our team reviews the route, vehicle, transport type, and timing, then contacts you with a rate for your specific shipment.",
  },
  {
    q: "What is the difference between open and enclosed transport?",
    a: "Open transport carries vehicles on an exposed trailer and is the most common, cost-effective option. Enclosed transport encloses the vehicle for added protection from weather and road debris.",
  },
  {
    q: "Can you transport an inoperable vehicle?",
    a: "In many cases, yes. Let us know the vehicle is not running when you request a quote so we can coordinate the right equipment.",
  },
  {
    q: "How soon can my vehicle be picked up?",
    a: "Timing depends on the route, season, and availability. Tell us your preferred window and we will work to coordinate a pickup that fits.",
  },
  {
    q: "Is my vehicle insured during transport?",
    a: "Cargo insurance coverage is confirmed as part of the booking process. We will review the details with you before your shipment is booked.",
  },
  {
    q: "Do you ship vehicles internationally?",
    a: "Yes. We coordinate international vehicle shipping options in addition to transport across all 50 states.",
  },
  {
    q: "Can dealerships or auctions request transport for multiple vehicles?",
    a: "Absolutely. You can include multiple vehicles in a single quote request, and we support ongoing dealer and auction transportation.",
  },
] as const;

export const finalCta = {
  headline: "Ready to Move Your Vehicle?",
  button: "Request a Free Quote",
  reassurance: "Send us the details and we'll contact you shortly.",
} as const;

/**
 * Consent copy — DRAFT for legal review before public launch, particularly
 * before any automated calls or marketing texts are introduced.
 */
export const consentText =
  "I agree that Carex Auto may contact me by phone, text, or email about this quote request. Consent is not a condition of purchase. Message and data rates may apply.";

export const seo = {
  title: "Carex Auto | Nationwide & International Vehicle Transport",
  description:
    "Request vehicle transportation across the United States or internationally with Carex Auto. Open and enclosed options for individuals, dealers, auctions, and carriers.",
} as const;

/**
 * Toggle to reveal the testimonials section. Keep false in production until
 * genuine, approved testimonials exist. Never publish invented testimonials.
 */
export const SHOW_TESTIMONIALS = false;

/**
 * Development-only sample cards. Clearly labeled and only rendered when
 * SHOW_TESTIMONIALS is enabled AND the build is not production.
 */
export const sampleTestimonials = [
  {
    quote: "Sample testimonial — replace before launch.",
    author: "Sample Customer",
    location: "City, ST",
  },
  {
    quote: "Sample testimonial — replace before launch.",
    author: "Sample Customer",
    location: "City, ST",
  },
] as const;
