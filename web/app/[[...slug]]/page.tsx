import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "../../components/enquiry-form";
import { ProjectCard } from "../../components/project-card";
import { TestimonialFeed } from "../../components/testimonial-feed";
import { LiveWebsitePreview } from "../../components/live-website-preview";
import { Reveal } from "../../components/reveal";
import { MobileDrawer } from "../../components/mobile-drawer";
import { getFaqs, getProcess, getProjects, getServices, getSettings, getSocialLinks, getTestimonials, type PresenceLink, type Project, type Settings, type Testimonial } from "../../lib/content";

const pageTitles: Record<string, string> = { "": "Shopify, Websites, Automation & Paid Advertising", about: "About Paul Oloruntobi | Shopify, Digital Systems & Paid Advertising", "how-i-can-help": "Shopify, Websites, Automation & Paid Advertising", services: "Shopify, Websites, Automation & Paid Advertising", process: "Our Shopify, Website & Advertising Process", work: "Selected Shopify & Website Work", "graphic-design": "Graphic Design Portfolio | Pluswrld", testimonials: "Client Reviews & Testimonials", faq: "Frequently Asked Questions", contact: "Discuss a Digital Project", "services/shopify-store-setup": "Shopify Store Setup, Redesign & Management", "services/website-development": "Website Development & No-Code Apps", "services/ai-automation": "AI Workflow & Business Automation", "services/creator-commerce": "Whop, Skool & Community Setup", "services/seo-social-visibility": "Pinterest Marketing & TikTok Content Creation", "services/paid-advertising": "Paid Advertising Campaign Management", "services/graphic-design": "Graphic Design & Visual Communication" };
const pageDescriptions: Record<string, string> = { "": "Pluswrld builds Shopify stores, websites and automations, and plans, manages and optimises paid advertising campaigns to help businesses reach the right customers.", about: "Meet Paul Oloruntobi, the builder behind Pluswrld. Explore his Shopify, website development, automation and paid advertising services.", "how-i-can-help": "Get practical help with Shopify, ecommerce, website development, no-code apps, business automation and paid advertising campaigns.", services: "Shopify store setup, ecommerce website development, no-code applications, AI workflow automation and paid advertising campaign management.", process: "See how Shopify, website, automation and paid advertising projects are scoped, implemented, tested and reviewed.", work: "Explore selected Shopify stores, websites and digital projects by Pluswrld.", "graphic-design": "Browse event flyers, posters and promotional graphic-design work from Pluswrld.", testimonials: "Read client feedback about Shopify store setup, website development and digital implementation work.", faq: "Answers about Shopify services, website development, project scope, platforms and delivery.", contact: "Discuss Shopify, website development, automation or a paid advertising campaign with Pluswrld.", "services/shopify-store-setup": "Shopify store setup, redesign, management and ecommerce improvements, with paid advertising support available to help attract qualified traffic.", "services/website-development": "Business websites in Webflow and Framer, no-code apps in Bubble, Glide, FlutterFlow and Adalo, customer portals and MVP implementation by Pluswrld.", "services/ai-automation": "GoHighLevel CRM pipelines, AI-assisted workflow automation, app integrations and repeatable operations systems designed and implemented by Pluswrld.", "services/creator-commerce": "Whop storefronts, Skool communities, memberships, digital products and GoHighLevel-powered onboarding and follow-up automations by Pluswrld.", "services/seo-social-visibility": "Pinterest marketing, TikTok content creation and website discoverability foundations by Pluswrld.", "services/paid-advertising": "Paid advertising strategy, campaign setup, management, tracking and optimisation by Pluswrld.", "services/graphic-design": "Promotional graphics, event flyers, posters and visual assets designed around your message." };
type RouteProps = { params: Promise<{ slug?: string[] }> };
const serviceLandingPages: Record<string, { name: string; title: string; description: string; eyebrow: string; heading: string; intro: string; deliverables: { title: string; description: string }[]; scope: string; tools: string; cta: string }> = {
  "services/shopify-store-setup": {
    name: "Shopify Store Setup, Redesign & Management",
    title: "Shopify Store Setup, Redesign & Management",
    description: "Shopify store setup and redesign, theme customisation, product and variant setup, SEO foundations and store management by Pluswrld.",
    eyebrow: "SHOPIFY STORE SETUP & ECOMMERCE",
    heading: "Shopify stores built around how your business sells.",
    intro: "Whether you are launching a new store or improving an existing one, I help set up and refine Shopify stores with clear product structure, responsive storefronts and practical day-to-day operations.",
    deliverables: [
      { title: "New Shopify store builds", description: "Store setup, theme selection and core configuration based on your products, brand and agreed requirements." },
      { title: "Theme customisation and redesign", description: "Responsive storefront layouts and usability improvements that respect your existing brand direction." },
      { title: "Products, collections and variants", description: "Product uploads, collection organisation, options, SKUs and clearer product-page structure." },
      { title: "SEO and conversion foundations", description: "Page titles, meta descriptions, product-page structure, navigation and practical shopping-experience improvements." },
      { title: "Store operations and integrations", description: "Relevant setup for Google Merchant Center and Bing Merchant Center feed troubleshooting, plus relevant Shopify channel connections." },
      { title: "Store management and handover", description: "Agreed store-management support, operational checks and clear handover notes for your team." }
    ],
    scope: "Paid advertising campaigns can be planned and managed as part of an ecommerce growth project or as a separate engagement. Ad spend and third-party platform fees are separate from the service fee. Ongoing organic social posting is scoped separately.",
    tools: "Shopify · Google Merchant Center · TikTok Shop · Pinterest · Marketplace Connect",
    cta: "Tell me whether you are starting a new Shopify store or improving an existing one."
  },
  "services/website-development": {
    name: "Website Development and No-Code Applications",
    title: "Website Development & No-Code Apps",
    description: "Business websites built with Webflow and Framer, plus no-code apps in Bubble, Glide, FlutterFlow and Adalo by Pluswrld.",
    eyebrow: "WEBSITE DEVELOPMENT & NO-CODE",
    heading: "Websites and applications that make your business easier to use.",
    intro: "I design and build practical websites and no-code applications around the people who will use them. The work can range from a clear business website to a customer portal, internal tool or early product MVP.",
    deliverables: [
      { title: "Business website design and build", description: "Page structure, responsive layouts and clear content presentation for service businesses and growing brands." },
      { title: "Webflow and Framer development", description: "Responsive websites, reusable page structures and CMS-backed implementation using Webflow or Framer." },
      { title: "No-code applications", description: "Practical app interfaces, workflows and MVPs built with platforms such as Bubble, FlutterFlow, Glide and Adalo." },
      { title: "Customer portals and internal tools", description: "Structured experiences that help customers, members or teams access information and complete tasks." },
      { title: "Integrations and usability", description: "Forms, data connections and workflow improvements that support the intended user journey." },
      { title: "Testing and handover", description: "Responsive checks, agreed functionality testing and clear guidance for managing the finished solution." }
    ],
    scope: "The platform and implementation approach are selected after the requirements are understood. Complex custom integrations, subscriptions or third-party costs are confirmed before work begins.",
    tools: "Webflow · Framer · Bubble · Glide · FlutterFlow · Adalo",
    cta: "Share what the website or application needs to help people do."
  },
  "services/ai-automation": {
    name: "AI Workflow and Business Automation",
    title: "AI Workflow & Business Automation",
    description: "GoHighLevel CRM pipelines, AI-assisted workflows, app integrations and repeatable business automations implemented by Pluswrld.",
    eyebrow: "AI & BUSINESS AUTOMATION",
    heading: "Connect your tools. Simplify repeatable work.",
    intro: "I map your current process, then configure GoHighLevel pipelines, follow-ups and connected automations to reduce repetitive work and keep leads or customers moving through the right steps.",
    deliverables: [
      { title: "Workflow discovery and mapping", description: "Understand the current process, handoffs, data and points where manual work creates friction." },
      { title: "GoHighLevel and workflow automation", description: "Configure CRM pipelines, triggers, lead follow-ups and connected workflows in GoHighLevel and other suitable tools." },
      { title: "AI-assisted workflows", description: "Introduce AI for suitable tasks such as classification, drafting, extraction and structured assistance, with human review where needed." },
      { title: "Application and API integrations", description: "Connect supported CRMs, forms, spreadsheets, communication tools and business applications." },
      { title: "Testing and exception handling", description: "Check normal and edge cases, reduce avoidable failures and define what happens when a step needs attention." },
      { title: "Documentation and handover", description: "Explain the workflow, dependencies and practical steps for maintaining the automation." }
    ],
    scope: "Automation is designed around the actual process and available platform access. Third-party subscriptions, API usage and ongoing monitoring are scoped separately where required.",
    tools: "GoHighLevel · OpenAI · n8n · Make · Zapier · APIs",
    cta: "Describe the repetitive task or disconnected process you want to improve."
  },
  "services/creator-commerce": {
    name: "Whop, Skool and Community Commerce Setup",
    title: "Whop, Skool & Community Setup",
    description: "Whop and Skool storefronts, paid communities, memberships and GoHighLevel onboarding automations by Pluswrld.",
    eyebrow: "CREATOR & COMMUNITY COMMERCE",
    heading: "Build the systems behind your creator business.",
    intro: "I help creators and digital sellers organise Whop or Skool storefronts, memberships, paid communities and the customer journeys around them, including GoHighLevel follow-up automations where they fit.",
    deliverables: [
      { title: "Digital storefront and offer setup", description: "Organise products, services, pricing tiers and the customer path from offer discovery to purchase." },
      { title: "Memberships and subscriptions", description: "Configure access levels, recurring offers and member experiences around the agreed business model." },
      { title: "Discord access automation", description: "Connect paid access to appropriate Discord roles and membership permissions where supported." },
      { title: "Community platform configuration", description: "Set up the structure, spaces and core settings needed to deliver a clear member experience." },
      { title: "Customer onboarding and follow-up", description: "Connect welcome steps, member access and GoHighLevel follow-ups so customers know what to do after joining." },
      { title: "Testing and handover", description: "Check purchase-to-access journeys and document how to manage the setup after launch." }
    ],
    scope: "Paid campaigns can support the launch or growth of a creator offer and can be scoped alongside the storefront and membership setup. Ad spend, platform fees and community moderation are separate considerations.",
    tools: "Whop · Skool · GoHighLevel · Discord",
    cta: "Tell me what you sell, where your community lives and how members should get access."
  },
  "services/graphic-design": {
    name: "Graphic Design & Visual Communication",
    title: "Graphic Design & Visual Communication",
    description: "Promotional graphics, event flyers, posters, social media creatives and supporting brand assets designed around your message.",
    eyebrow: "GRAPHIC DESIGN & VISUAL COMMUNICATION",
    heading: "Make your message clear at a glance.",
    intro: "I design visual assets for businesses, events and digital offers. From event flyers and posters to social media creatives and banners, the focus is clear communication and a polished, consistent presentation.",
    deliverables: [
      { title: "Event flyers and posters", description: "Promotional layouts that make the event, message and key details easy to understand." },
      { title: "Social media creatives", description: "Post and story graphics shaped around the platform, message and audience." },
      { title: "Promotional banners", description: "Visuals for launches, offers, campaigns and digital storefronts." },
      { title: "Brand-supporting graphics", description: "Supporting visual assets that follow an existing brand direction and make the presentation more consistent." },
      { title: "Logo and icon refinements", description: "Careful refinements to existing logo, favicon and supporting graphic assets where the brief calls for them." }
    ],
    scope: "The brief, dimensions, number of concepts, revision rounds, final formats and usage requirements are agreed before design begins. Full brand identity development is scoped separately where needed.",
    tools: "Visual design tools selected to fit the brief and final output.",
    cta: "Share the message, audience and platform the design needs to work for."
  },
  "services/paid-advertising": {
    name: "Paid Advertising Campaign Management",
    title: "Paid Advertising Campaign Management",
    description: "Paid advertising strategy, campaign setup, management, tracking and optimisation by Pluswrld.",
    eyebrow: "PAID ADVERTISING & CAMPAIGN MANAGEMENT",
    heading: "Turn your offer into campaigns with a clear purpose.",
    intro: "I help businesses plan and manage paid advertising campaigns around a defined objective, a clear audience and a realistic budget. The work is structured around the platform and customer journey that make sense for your offer.",
    deliverables: [
      { title: "Campaign strategy and planning", description: "Clarify campaign objectives, audience, offer, budget, funnel and the measures that will be used to evaluate performance." },
      { title: "Campaign and account setup", description: "Configure the agreed advertising platform, campaign structure, targeting, placements and settings." },
      { title: "Ad copy and creative direction", description: "Plan messaging, creative requirements and variations that align with the offer and audience." },
      { title: "Tracking and conversion measurement", description: "Review or configure supported pixels, events, conversion actions and measurement foundations." },
      { title: "Launch and campaign management", description: "Launch approved campaigns, monitor delivery and manage agreed budgets, audiences and campaign settings." },
      { title: "Performance optimisation and reporting", description: "Review results, identify improvement opportunities, test agreed changes and communicate performance clearly." }
    ],
    scope: "The advertising platform, campaign objectives, budget, creative responsibilities, tracking access and reporting cadence are agreed before launch. Advertising spend and third-party platform fees are paid separately and are not part of the service fee. Performance depends on the offer, market, budget, creative and other factors; specific results are not guaranteed.",
    tools: "Paid advertising platforms · Conversion tracking · Analytics · Campaign reporting",
    cta: "Share your offer, target audience and what you want your advertising to achieve."
  },
  "services/seo-social-visibility": {
    name: "Website SEO and Social Commerce Setup",
    title: "Website SEO & Social Commerce Setup",
    description: "Pinterest marketing, TikTok content creation and the website SEO foundations that support organic discovery by Pluswrld.",
    eyebrow: "SEARCH & SOCIAL VISIBILITY",
    heading: "Help the right people discover your business.",
    intro: "I help businesses build a clearer presence across Pinterest, TikTok and search. That can include Pinterest profile and board optimisation, product pins, TikTok content creation and the website SEO basics that support discoverability.",
    deliverables: [
      { title: "Technical SEO foundations", description: "Review crawl access, indexability, canonical URLs, sitemap, robots rules and important page structure." },
      { title: "On-page SEO and metadata", description: "Improve page titles, descriptions, headings, internal links and content wording around real customer searches." },
      { title: "Search indexing setup", description: "Prepare sitemap submission and ownership verification workflows for supported search tools such as Google Search Console and Bing Webmaster Tools." },
      { title: "Social profile optimisation", description: "Improve business profile information, links, descriptions and presentation so visitors understand what you offer." },
      { title: "Social-commerce connections", description: "Set up relevant product catalogues, channel connections, pixels or tracking foundations where supported." },
      { title: "Pinterest marketing and TikTok content", description: "Optimise Pinterest profiles, boards and product pins, and create TikTok content that introduces the offer clearly." }
    ],
    scope: "The work focuses on organic visibility and content setup. Ongoing daily posting, community management and paid advertising are not included unless they are separately agreed in a clearly defined scope.",
    tools: "Google Search Console · Bing Webmaster Tools · Shopify · Pinterest · Meta business tools",
    cta: "Share your website and the services or products you want customers to find."
  }
};


export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ["about"] },
    { slug: ["how-i-can-help"] },
    { slug: ["services"] },
    { slug: ["process"] },
    { slug: ["work"] },
    { slug: ["graphic-design"] },
    { slug: ["testimonials"] },
    { slug: ["faq"] },
    { slug: ["contact"] },
    { slug: ["services", "shopify-store-setup"] },
    { slug: ["services", "website-development"] },
    { slug: ["services", "ai-automation"] },
    { slug: ["services", "creator-commerce"] },
    { slug: ["services", "seo-social-visibility"] },
    { slug: ["services", "paid-advertising"] },
    { slug: ["services", "graphic-design"] }
  ];
}
export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const route = (await params).slug?.join("/") || "";
  const title = pageTitles[route] || "Page not found";
  const description = pageDescriptions[route] || "Pluswrld — digital building, ecommerce, automation and online visibility.";
  const canonical = route ? `/${route}` : "/";
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: "website", siteName: "Pluswrld", title: `${title} | Pluswrld`, description, url: canonical },
    twitter: { card: "summary_large_image", title: `${title} | Pluswrld`, description },
    robots: { index: true, follow: true }
  };
}
function Eyebrow({ children }: { children: React.ReactNode }) { return <span className="eyebrow"><i className="eyebrow-line" />{children}</span>; }
function Intro({ eyebrow, title, body, showActions = true }: { eyebrow: string; title: string; body: string; showActions?: boolean }) {
  return <section className="page-intro container"><Reveal><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p>{showActions && <div className="page-intro-actions"><Link className="button" href="/contact">Discuss a project <span>↗</span></Link><Link className="text-link" href="/work">View selected work <span>↗</span></Link></div>}</Reveal></section>;
}

function Cta({ title, body }: { title: string; body: string }) {
  return <section className="cta-band"><div className="container cta-band-inner"><div><Eyebrow>THE NEXT STEP</Eyebrow><h2>{title}</h2><p>{body}</p></div><Link href="/contact" className="button button-light">Discuss a project <span>↗</span></Link></div></section>;
}
function Arrow({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="text-link">{children} <span>↗</span></Link>; }

function ReviewCard({ review, compact = false }: { review: Testimonial; compact?: boolean }) {
  const rating = Math.max(0, Math.min(5, review.rating || 0));
  return <article className={"testimonial-card" + (compact ? " testimonial-card-compact" : "")}>
    <div className="testimonial-top">
      <span className="testimonial-stars" aria-label={rating + " out of 5 stars"}>{"★".repeat(rating) + "☆".repeat(5 - rating)}</span>
      <span>{review.platform} · {review.reviewDateLabel || review.reviewDate}</span>
    </div>
    <blockquote>“{review.quote}”</blockquote>
    <div className="testimonial-bottom">
      <div><strong>{review.reviewerLabel || "Client review"}</strong><span>{review.reviewerCountry || (review.reviewerHandle ? "@" + review.reviewerHandle : "Client feedback")}{review.repeatClient ? " · Repeat client" : ""}</span></div>
      {review.sourceUrl ? <a href={review.sourceUrl} target="_blank" rel="noreferrer">{review.sourceLabel || "View source"} ↗</a> : <span className="testimonial-source-note">Shared client feedback</span>}
    </div>
  </article>;
}
function ServiceIcon({ label }: { label: string }) {
  const value = label.toLowerCase();
  const icon = value.includes("graphic") || value.includes("design")
    ? <><path d="M4 20 14.5 4.5a2.1 2.1 0 0 1 3.4 2.4L7.5 22H4z" /><path d="m12 8 4 3M3 22h18" /><circle cx="18.5" cy="5.5" r="1.5" /></>
    : value.includes("advert") || value.includes("campaign")
      ? <><path d="M4 18V6M4 18h16" /><path d="m7 14 4-4 3 2 5-6" /><path d="M16 6h3v3" /></>
      : value.includes("automation") || value.includes("ai")
        ? <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 7.5 10.5 15M15.5 7.5 13.5 15M8.5 6h7" /></>
        : value.includes("community") || value.includes("creator")
          ? <><circle cx="9" cy="8" r="3" /><path d="M3 20c.5-3.3 2.5-5 6-5s5.5 1.7 6 5" /><circle cx="18" cy="9" r="2.2" /><path d="M16.5 15.5c2.8-.1 4.3 1.2 4.7 3.5" /></>
          : value.includes("website") || value.includes("application") || value.includes("no-code")
            ? <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h10M7 16h7" /></>
            : <><path d="M6 8h12l1.2 12H4.8L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>;
  return <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{icon}</svg></span>;
}
function serviceHref(title: string) {
  const value = title.toLowerCase();
  if (value.includes("shopify") || value.includes("ecommerce")) return "/services/shopify-store-setup";
  if (value.includes("website") || value.includes("no-code")) return "/services/website-development";
  if (value.includes("automation") || value.includes("ai")) return "/services/ai-automation";
  if (value.includes("advert")) return "/services/paid-advertising";
  if (value.includes("seo") || value.includes("social")) return "/services/seo-social-visibility";
  if (value.includes("creator") || value.includes("community")) return "/services/creator-commerce";
  if (value.includes("graphic") || value.includes("design")) return "/services/graphic-design";
  return "/services";
}

function DeviceView({ project, variant }: { project: Project & { liveUrl: string }; variant: "desktop" | "tablet" | "phone" }) {
  let projectHost = "live project";
  try { projectHost = new URL(project.liveUrl).hostname.replace(/^www\\./, ""); } catch {}
  return <a className={"device-view device-view-" + variant} href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={"Open " + project.title + " website"}>
    <span className="device-browser"><i /><i /><i /><span>{projectHost}</span></span>
    <div className="device-screen"><LiveWebsitePreview url={project.liveUrl} title={project.title} poster={project.imageUrl} className="live-preview-device" /></div>
    <span className="device-view-label">{project.title} <span>↗</span></span>
  </a>;
}

function HeroShowcase({ projects }: { projects: Project[] }) {
  const publicProjects = projects.filter((project): project is Project & { liveUrl: string } => Boolean(project.liveUrl));
  const [desktop, tablet, phone] = publicProjects.slice(0, 3);
  return <div className="hero-showcase">
    <div className="device-showcase">
      {desktop && <div className="device-frame device-frame-desktop"><DeviceView project={desktop} variant="desktop" /></div>}
      {tablet && <div className="device-frame device-frame-tablet"><DeviceView project={tablet} variant="tablet" /></div>}
      {phone && <div className="device-frame device-frame-phone"><DeviceView project={phone} variant="phone" /></div>}
      <span className="showcase-chip showcase-chip-one">LIVE PROJECTS</span>
      <span className="showcase-chip showcase-chip-two">DESKTOP · TABLET · MOBILE</span>
    </div>
  </div>;
}
function Hero({ settings, projects }: { settings: Settings; projects: Project[] }) {
  return <section className="home-hero"><div className="container home-hero-grid">
    <div className="hero-copy"><div><Eyebrow>SHOPIFY · WEBSITES · AUTOMATION · NO-CODE</Eyebrow><h1>{settings.heroTitle}</h1><p className="hero-description">{settings.heroDescription}</p>
      <div className="hero-actions"><Link href="/contact" className="button">Discuss a project <span>↗</span></Link><Link href="/work" className="button button-outline">Explore my work <span>↗</span></Link></div>
      <div className="hero-caption"><i className="availability-dot" />{settings.availability}</div></div></div>
    <HeroShowcase projects={projects} />
  </div></section>;
}
function ExpertiseStrip() {
  return <div className="expertise-strip"><div className="container expertise-track">{["Shopify & ecommerce","Website development","No-code applications","AI & business automation","Online communities & memberships"].map((x,i)=><span key={x}><i>0{i+1}</i>{x}</span>)}</div></div>;
}
function ExploreMore() {
  const pages = [
    { href: "/about", number: "01 / BACKGROUND", title: "About me", body: "Get to know the builder and the thinking behind Pluswrld." },
    { href: "/how-i-can-help", number: "02 / START HERE", title: "How I can help", body: "Explore the business situations I help solve." },
    { href: "/process", number: "03 / DELIVERY", title: "My process", body: "See how projects move from discovery to handover." },
    { href: "/faq", number: "04 / QUESTIONS", title: "FAQs & client reviews", body: "Find practical answers and read feedback from past buyers." }
  ];
  return <section className="section section-soft explore-more"><div className="container">
    <div className="section-heading"><div><Eyebrow>MORE TO EXPLORE</Eyebrow><h2>Find the right<br/><span className="heading-muted">next page.</span></h2></div><div className="section-heading-aside"><p>Not every visitor arrives with the same question. These pages give you a clearer way to explore the services, approach and experience behind Pluswrld.</p></div></div>
    <MobileDrawer className="explore-more-drawer" label="Explore all four pages" expandedLabel="Close explore pages">
      <div className="explore-more-grid">{pages.map((page,i)=><Reveal key={page.href} delay={i*45}><Link className="explore-more-card" href={page.href}><span>{page.number}</span><h3>{page.title}</h3><p>{page.body}</p><b>Explore page ↗</b></Link></Reveal>)}</div>
    </MobileDrawer>
    <div className="section-end-cta"><Arrow href="/contact">Discuss a project</Arrow></div>
  </div></section>;
}

async function Home({ settings }: { settings: Settings }) {
  const [projects, steps, reviews] = await Promise.all([getProjects(), getProcess(), getTestimonials()]);
  const selectedProjects = projects
    .filter((project) => project.liveUrl && project.category?.toLowerCase().includes("shopify"))
    .slice(0, 3);
  const capabilityGroups = [
    {
      title: "Sell online",
      body: "Shopify store design and management, plus Google and Bing Merchant Center feed fixes.",
      href: "/services/shopify-store-setup",
      platforms: [
        { label: "Shopify", src: "/platform/shopify.svg" },
        { label: "Google", src: "/platform/google.svg" },
        { label: "Bing", src: "/platform/bing.svg" }
      ]
    },
    {
      title: "Get found",
      body: "Pinterest marketing foundations and TikTok content creation that help people discover your offer.",
      href: "/services/seo-social-visibility",
      platforms: [
        { label: "Pinterest", src: "/platform/pinterest.svg" },
        { label: "TikTok", src: "/platform/tiktok.svg" }
      ]
    },
    {
      title: "Build sites and apps",
      body: "Webflow and Framer websites, plus no-code apps built with Bubble, Glide, FlutterFlow and Adalo.",
      href: "/services/website-development",
      platforms: [
        { label: "Webflow", src: "/platform/webflow.svg" },
        { label: "Framer", src: "https://framerusercontent.com/images/dVpT3X2jfKMoj2h0OfcGhqTqs.svg?height=54&width=200" },
        { label: "Bubble", src: "/platform/bubble.svg" },
        { label: "Glide", src: "/platform/glide.svg" },
        { label: "FlutterFlow", src: "/platform/flutterflow.svg" },
        { label: "Adalo", src: "/platform/adalo.svg" }
      ]
    },
    {
      title: "Run communities and automation",
      body: "Whop and Skool community setups, membership journeys and GoHighLevel automation.",
      href: "/services/creator-commerce",
      platforms: [
        { label: "Whop", src: "/platform/whop.svg" },
        { label: "Skool", src: "/platform/skool.svg" },
        { label: "GoHighLevel", src: "https://assets.cdn.filesafe.space/zELBHkVp0JPbbLvKIlF5/media/690a5f4a57ea175183408da2.png" }
      ]
    }
  ];
  return <>
    <Hero settings={settings} projects={projects} />
    <section className="home-capabilities-section">
      <div className="container">
        <div className="section-heading">
          <div><Eyebrow>MY SERVICES</Eyebrow><h2>What your digital setup<br/><span className="heading-muted">needs to do well.</span></h2></div>
          <div className="section-heading-aside"><p>From selling and discovery to websites, apps, communities and connected workflows, I build the practical pieces that make your setup work together.</p></div>
        </div>
        <div className="capability-grid">
          {capabilityGroups.map((group, index) => <Reveal key={group.title} delay={index * 55}>
            <article className="capability-card">
              <h3>{group.title}</h3>
              <p>{group.body}</p>
              <div className="capability-logos" aria-label={group.title + " platforms"}>
                {group.platforms.map((platform) => <span className="capability-brand" key={platform.label}>
                  <img src={platform.src} alt="" loading="lazy"/>
                  <span>{platform.label}</span>
                </span>)}
              </div>
              <Arrow href={group.href}>Explore this area</Arrow>
            </article>
          </Reveal>)}
        </div>
        <div className="section-end-cta"><Arrow href="/services">View all services</Arrow></div>
      </div>
    </section>
    <section className="section section-soft home-selected-work">
      <div className="container">
        <div className="section-heading"><div><Eyebrow>SELECTED WORK</Eyebrow><h2>Real builds.<br/><span className="heading-muted">Useful outcomes.</span></h2></div><div className="section-heading-aside"><p>A few live Shopify projects and ecommerce builds. Website previews open from the cards, with each project available to visit directly.</p></div></div>
        <div className="project-grid home-project-grid">{selectedProjects.map((project, index) => <ProjectCard key={project._id} project={project} index={index}/>)}</div>
        <div className="section-end-cta"><Arrow href="/work">View all selected work</Arrow></div>
      </div>
    </section>
    <section className="section container founder-feature">
      <Reveal className="founder-feature-image"><Image src={settings.portraitUrl} alt="Paul Oloruntobi, digital builder behind Pluswrld" fill sizes="(max-width: 760px) 86vw, 35vw"/></Reveal>
      <div className="founder-feature-copy"><Eyebrow>THE PERSON BEHIND PLUSWRLD</Eyebrow><h2>Thoughtful systems. Practical execution.</h2>
        <p>I’m Paul Oloruntobi. I build and improve digital experiences, connect business tools and help businesses create clearer routes to customers.</p>
        <Arrow href="/about">Meet Paul</Arrow>
      </div>
    </section>
    <PlatformWall compact />
    {reviews.some((review) => review.featured) && <section className="section container home-reviews">
      <div className="section-heading"><div><Eyebrow>CLIENT FEEDBACK</Eyebrow><h2>Good work.<br/><span className="heading-muted">Good working relationships.</span></h2></div><div className="section-heading-aside"><p>Original client feedback, with the wording and attribution preserved.</p></div></div>
      <div className="home-review-grid">{reviews.filter((review) => review.featured).slice(0, 2).map((review, index) => <Reveal key={review._id} delay={index * 60}><ReviewCard review={review} compact /></Reveal>)}</div>
      <div className="section-end-cta"><Arrow href="/testimonials">Read all reviews</Arrow></div>
    </section>}
    <section className="section container home-process">
      <div className="section-heading"><div><Eyebrow>HOW I WORK</Eyebrow><h2>Clear thinking.<br/><span className="heading-muted">Careful execution.</span></h2></div><div className="section-heading-aside"><p>Good delivery starts with a clear goal, an agreed scope, careful implementation and a useful handover.</p></div></div>
      <div className="process-preview-list">{steps.slice(0, 4).map((step, index) => <Reveal key={step._id} delay={index * 50} className="preview-step"><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.description}</p></Reveal>)}</div>
      <div className="section-end-cta"><Arrow href="/process">See the project process</Arrow></div>
    </section>
    <ExploreMore />
    <Cta title="Have a project in mind?" body="Tell me what you want to build, improve or connect. We can work out a clear next step." />
  </>;
}

function TextParagraphs({ text, className = "" }: { text: string; className?: string }) {
  const normalized = (text || "").replace(/\r\n?/g, "\n").trim();
  const paragraphs = normalized.split(/\n\s*\n/).map((part) => part.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
  return <div className={className}>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}

function AboutSocialLinks({ links }: { links: PresenceLink[] }) {
  const icons: Record<string, { slug: string; colour: string }> = {
    instagram: { slug: "instagram", colour: "017930" },
    facebook: { slug: "facebook", colour: "017930" },
    tiktok: { slug: "tiktok", colour: "017930" },
    linkedin: { slug: "linkedin", colour: "017930" },
    threads: { slug: "threads", colour: "017930" },
    whatsapp: { slug: "whatsapp", colour: "017930" },
    x: { slug: "x", colour: "017930" },
    twitter: { slug: "x", colour: "017930" }
  };
  const visibleLinks = [...links];
  if (!visibleLinks.some((link) => link.name.toLowerCase() === "whatsapp")) {
    visibleLinks.push({ _id: "pluswrld-whatsapp", name: "WhatsApp", url: "https://wa.me/2349161612746", order: 7, enabled: true });
  }
  if (!visibleLinks.length) return null;
  return <nav className="about-social-links" aria-label="Social media profiles">
    {visibleLinks.map((link) => {
      const icon = icons[link.name.toLowerCase()];
      if (!icon) return null;
      return <a key={link._id} className={"social-link social-link-" + icon.slug} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={"Visit " + link.name + " profile"} title={link.name}>
        {icon.slug === "linkedin"
          ? <svg className="social-link-icon-linkedin" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.919-2.064 2.063-2.064 1.14 0 2.064.926 2.064 2.064 0 1.139-.923 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
          : icon.slug === "whatsapp"
            ? <svg className="social-link-icon-whatsapp" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            : <img src={"/platform/" + icon.slug + ".svg"} alt="" width="18" height="18" loading="lazy"/>}
      </a>;
    })}
  </nav>;
}
async function About({ settings }: { settings: Settings }) {
  const [socialLinks, reviews] = await Promise.all([getSocialLinks(), getTestimonials()]);
  const metrics = settings.metrics ?? { yearsExperience: "2+", completedProjects: "80+", satisfiedClients: "15+", marketReach: "Worldwide" };
  const featuredReviews = reviews.filter((review) => review.featured).slice(0, 2);
  const approach = [
    { title: "Understand the goal", description: "We start with what the business needs to achieve and what is getting in the way." },
    { title: "Agree on the scope", description: "I clarify priorities, platform, deliverables and dependencies before implementation." },
    { title: "Build and refine", description: "I work through the details and improve the experience around how people will actually use it." },
    { title: "Test and hand over", description: "I check the key journeys, explain what has been delivered and make the next steps clear." }
  ];
  return <>
    <Intro eyebrow="ABOUT PAUL" title="I help businesses build digital experiences that work." body={settings.aboutIntro} />
    <section className="section container about-profile">
      <div className="about-profile-visual">
        <Reveal className="about-image"><Image src={settings.originalPortraitUrl || settings.portraitUrl} alt="Paul Oloruntobi, the person behind Pluswrld" fill sizes="(max-width: 760px) 85vw, 40vw"/></Reveal>
        <div className="about-profile-meta">
          <div><strong>Paul Oloruntobi</strong><span>{settings.role}</span></div>
          <AboutSocialLinks links={socialLinks}/>
        </div>
      </div>
      <div className="about-profile-copy">
        <Reveal>
          <Eyebrow>MY STORY</Eyebrow>
          <h2>Hands-on from the first conversation to the finished build.</h2>
          <TextParagraphs text={settings.aboutStory} className="about-story-copy"/><div className="section-end-cta"><Arrow href="/work">See selected work</Arrow></div>
        </Reveal>
      </div>
    </section>
    <section className="section section-soft about-metrics">
      <div className="container">
        <div className="about-metric-grid">
          <article className="about-metric"><strong>{metrics.yearsExperience || "2+"}</strong><span>Years of experience</span></article>
          <article className="about-metric"><strong>{metrics.completedProjects || "80+"}</strong><span>Projects completed</span></article>
          <article className="about-metric"><strong>{metrics.satisfiedClients || "15+"}</strong><span>Satisfied clients</span></article>
          <article className="about-metric"><strong>{metrics.marketReach || settings.marketReach || "Worldwide"}</strong><span>Market reach</span></article>
        </div>
      </div>
    </section>
    <section className="section container about-philosophy">
      <div className="section-heading"><div><Eyebrow>HOW I THINK</Eyebrow><h2>Useful first.<br/><span className="heading-muted">Complicated only when needed.</span></h2></div><div className="section-heading-aside"><TextParagraphs text={settings.aboutPhilosophy}/></div></div>
      <div className="about-process-grid">{approach.map((step, index) => <Reveal key={step.title} delay={index * 50}><article className="about-process-card"><h3>{step.title}</h3><p>{step.description}</p></article></Reveal>)}</div>
      <div className="section-end-cta"><Arrow href="/process">See how I work</Arrow></div>
    </section>
    <PlatformWall compact />
    <section className="section section-soft about-reviews">
      <div className="container">
        <div className="section-heading"><div><Eyebrow>CLIENT FEEDBACK</Eyebrow><h2>Good work is built<br/><span className="heading-muted">on good relationships.</span></h2></div><div className="section-heading-aside"><p>Here is a sample of the feedback clients have shared about the work and the experience of working together.</p></div></div>
        {featuredReviews.length > 0 ? <div className="about-review-grid">{featuredReviews.map((review, index) => <Reveal key={review._id} delay={index * 60}><ReviewCard review={review} compact /></Reveal>)}</div> : <p>Client feedback is available on the reviews page.</p>}
        <div className="section-end-cta"><Arrow href="/testimonials">Read more reviews</Arrow></div>
      </div>
    </section>
    <section className="section container about-human">
      <div><Eyebrow>THE HUMAN SIDE</Eyebrow><h2>Curious by nature. Practical in delivery.</h2></div>
      <div><p>I’m based in Nigeria and work with clients and businesses across different markets. I enjoy learning how design, technology and clear communication can make everyday business work simpler.</p><p className="about-availability"><i className="availability-dot"/> {settings.availability}</p><div className="about-human-actions"><Arrow href="/work">Explore my work</Arrow><Arrow href="/contact">Start a conversation</Arrow></div></div>
    </section>
    <Cta title="Let's make your next step clear." body="Tell me what your business is working towards. We can shape a practical plan and decide whether I’m the right person to help."/>
  </>;
}

function Help() {
  const items = [
    ["01 / STARTING SOMETHING NEW","You have an idea but need a digital foundation.","I help shape the scope, choose a practical platform and build the first working version around your business needs — a Shopify store, website, customer portal or no-code application."],
    ["02 / IMPROVING WHAT EXISTS","Your current setup is holding you back.","I review the existing store or website, identify the most important usability or operational issues and implement agreed improvements in a controlled scope."],
    ["03 / CONNECTING YOUR TOOLS","Your tools do not work well together.","I map the workflow and connect suitable tools through integrations and automation, with testing and a clear handover."],
    ["04 / CREATOR COMMERCE","You want to sell services, memberships or digital products.","I help organise storefronts, service listings, tiers and access workflows using platforms such as Whop, Skool and Discord."],
    ["05 / PAID ADVERTISING","You want to reach more of the right people with paid campaigns.","I help plan, launch, manage and optimise paid advertising campaigns around your offer, target audience and business objectives. We agree on the platform, budget, tracking and creative requirements before launch."]
  ];
  return <><Intro eyebrow="HOW I CAN HELP YOU" title="Bring me the challenge. We will map the solution." body="You do not need to arrive with a technical specification or know which platform to use. Start with what your business is trying to do, what feels difficult or what you want to make possible."/><section className="section container situation-list">{items.map((x,i)=><Reveal key={x[0]} delay={i*50}><article className="situation-row"><span>{x[0]}</span><div><h2>{x[1]}</h2><p>{x[2]}</p></div><span className="situation-arrow">↗</span></article></Reveal>)}</section><Cta title="You bring the context. I bring the structure." body="Tell me what is happening in your business. We can identify the right next step before implementation begins."/></>;
}

const platformGroups = [
  { title: "Ecommerce, search & social commerce", items: [
    {name:"Shopify",src:"/platform/shopify.svg"},
    {name:"Google",src:"https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"},
    {name:"Microsoft",src:"/platform/microsoft.svg"},
    {name:"TikTok",src:"/platform/tiktok.svg"},
    {name:"Pinterest",src:"/platform/pinterest.svg"},
    {name:"Facebook",src:"/platform/facebook.svg"},
    {name:"Instagram",src:"/platform/instagram.svg"}
  ]},
  { title: "Websites & no-code", items: [
    {name:"Webflow",src:"/platform/webflow.svg"},
    {name:"Framer",src:"https://framerusercontent.com/images/dVpT3X2jfKMoj2h0OfcGhqTqs.svg?height=54&width=200"},
    {name:"Bubble",src:"/platform/bubble.svg"},
    {name:"FlutterFlow",src:"/platform/flutterflow.svg"},
    {name:"Glide",src:"/platform/glide.svg"},
    {name:"Adalo",src:"/platform/adalo.svg"}
  ]},
  { title: "AI & automation", items: [
    {name:"OpenAI",src:"/platform/openai.svg"},
    {name:"GoHighLevel",src:"https://assets.cdn.filesafe.space/zELBHkVp0JPbbLvKIlF5/media/690a5f4a57ea175183408da2.png"},
    {name:"n8n",src:"/platform/n8n.svg"},
    {name:"Make",src:"/platform/make.svg"},
    {name:"Zapier",src:"/platform/zapier.svg"},
    {name:"Claude",src:"/platform/claude.svg"}
  ]},
  { title: "Creator, community & email", items: [
    {name:"Whop",src:"https://brand.whop.com/images/logos/whop_brandmark_orange.svg"},
    {name:"Skool",src:"/platform/skool.svg"},
    {name:"Discord",src:"/platform/discord.svg"},
    {name:"Klaviyo",src:"/platform/klaviyo.svg"},
    {name:"Brevo",src:"/platform/brevo.svg"}
  ]}
];
function PlatformWall({ compact = false }: { compact?: boolean }) {
  return <section className={"platform-wall" + (compact ? " platform-wall-compact" : " section container")}>
    <div className="platform-wall-heading"><Eyebrow>PLATFORMS & TOOLS</Eyebrow><h2>Technology I work with.</h2><p>Tools are chosen for the job — not added just to make a stack look impressive.</p></div>
    <div className="platform-groups">
      <div className="platform-group">
        <h3>{platformGroups[0].title}</h3><div className="platform-logo-grid">{platformGroups[0].items.map((item)=><div className="platform-logo-item" key={item.name}>
          <span className="platform-logo-image"><img src={item.src} alt="" loading="lazy" /></span><span>{item.name}</span>
        </div>)}</div>
      </div>
      <MobileDrawer className="platform-groups-drawer" label="Show more platforms and tools" expandedLabel="Hide additional platforms and tools">
        <div className="platform-groups-secondary">{platformGroups.slice(1).map((group)=><div className="platform-group" key={group.title}>
          <h3>{group.title}</h3><div className="platform-logo-grid">{group.items.map((item)=><div className="platform-logo-item" key={item.name}>
            <span className="platform-logo-image"><img src={item.src} alt="" loading="lazy" /></span><span>{item.name}</span>
          </div>)}</div>
        </div>)}</div>
      </MobileDrawer>
    </div>
    <div className="platform-wall-cta"><Arrow href="/services">Explore all service areas</Arrow></div>
  </section>;
}


function ServiceLanding({ route }: { route: string }) {
  const service = serviceLandingPages[route];
  if (!service) notFound();
  const serviceUrl = `https://pluswrld-portfolio.vercel.app/${route}`;
  const structuredData = { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, url: serviceUrl, areaServed: "Worldwide", provider: { "@type": "Organization", name: "Pluswrld", url: "https://pluswrld-portfolio.vercel.app/" } };
  const steps = [
    ["01", "Understand the requirement", "Clarify the business goal, current setup, constraints and what a successful delivery needs to do."],
    ["02", "Agree the scope", "Confirm the platform, deliverables, dependencies, exclusions and handover expectations before implementation."],
    ["03", "Build and test", "Implement the agreed work, check the important user journeys and address issues found during testing."],
    ["04", "Handover clearly", "Review what has been delivered and explain the next steps for using or maintaining the setup."]
  ];
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <Intro eyebrow={service.eyebrow} title={service.heading} body={service.intro} />
    <section className="section container">
      <div className="section-heading"><div><Eyebrow>WHAT THE WORK CAN INCLUDE</Eyebrow><h2>Practical deliverables.<br/><span className="heading-muted">A clear scope.</span></h2></div><div className="section-heading-aside"><p>Every project is scoped around the actual requirements. The items below are possible areas of work, not a fixed package that assumes every business needs the same thing.</p></div></div>
      <div className="service-grid">{service.deliverables.map((item,index)=><Reveal key={item.title} delay={index*45}><article className="service-card"><span className="card-number">0{index+1} / DELIVERY AREA</span><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}</div>
      <div className="section-end-cta"><Arrow href="/contact">Discuss this service</Arrow></div>
    </section>
    <section className="section section-soft"><div className="container"><div className="section-heading"><div><Eyebrow>HOW I WORK</Eyebrow><h2>From a clear brief<br/><span className="heading-muted">to a working solution.</span></h2></div></div><div className="process-preview-list">{steps.map(([number,title,description])=><article className="preview-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div><div className="section-end-cta"><Arrow href="/contact">Discuss your requirements</Arrow></div></div></section>
    <section className="scope-note container"><div><Eyebrow>TOOLS & PROJECT SCOPE</Eyebrow><h2>Choose the tools that fit the job.</h2></div><div><p>{service.scope}</p><div className="tools-line"><span>PLATFORMS & TOOLS</span><p>{service.tools}</p></div><Arrow href="/services">View all services</Arrow></div></section>
    <Cta title="Let's make the next step clear." body={service.cta} />
  </>;
}

function Services() {
  const cards = [
    {
      title: "Sell online", href: "/services/shopify-store-setup",
      intro: "Set up and improve the store, product experience and merchant feeds behind your ecommerce business.",
      items: ["Shopify store design, setup and management", "Product uploads, collections, variants and store operations", "Google Merchant Center fixes and product-feed troubleshooting", "Bing Merchant Center setup and feed troubleshooting"],
      tools: "Shopify · Google Merchant Center · Bing Merchant Center"
    },
    {
      title: "Get found", href: "/services/seo-social-visibility",
      intro: "Improve how people discover and understand your business across search and social platforms.",
      items: ["Pinterest profile, board and product-pin setup", "Pinterest marketing foundations and SEO", "TikTok content creation for products and offers", "Website SEO, metadata and indexing foundations"],
      tools: "Pinterest · TikTok · Google Search Console · Bing Webmaster Tools"
    },
    {
      title: "Build sites and apps", href: "/services/website-development",
      intro: "Create responsive websites and useful no-code applications around the people who will use them.",
      items: ["Webflow and Framer websites", "Bubble, Glide, FlutterFlow and Adalo applications", "Customer portals, internal tools and MVPs", "Responsive layouts, testing and handover"],
      tools: "Webflow · Framer · Bubble · Glide · FlutterFlow · Adalo"
    },
    {
      title: "Run communities and automation", href: "/services/creator-commerce",
      intro: "Bring your community, customer journeys and day-to-day automations into a connected setup.",
      items: ["Whop storefronts and digital products", "Skool communities and membership access", "GoHighLevel CRM pipelines and automations", "Member onboarding, follow-ups and connected workflows"],
      tools: "Whop · Skool · GoHighLevel"
    }
  ];
  return <>
    <Intro eyebrow="SERVICES / WHAT I DO" title="The digital foundations behind your business." body="Choose the part of your business you want to build or improve. I can help with the store, discovery, website, app, community or automation—and make sure the pieces work together."/>
    <section className="section container service-detail-list service-category-list">
      {cards.map((c,i)=><Reveal key={c.title}><article className="service-detail-card"><div className="service-detail-number">0{i+1}</div><div className="service-detail-main"><h2>{c.title}</h2><p className="service-detail-intro">{c.intro}</p><ul className="check-list">{c.items.map((item)=><li key={item}>{item}</li>)}</ul><div className="tools-line"><span>PLATFORMS & TOOLS</span><p>{c.tools}</p></div><Arrow href={c.href}>Explore service details</Arrow></div></article></Reveal>)}
      <div className="section-end-cta"><Arrow href="/contact">Discuss a project</Arrow></div>
    </section>
    <section className="scope-note container"><div><Eyebrow>GRAPHIC DESIGN</Eyebrow><h2>Need a visual to support the message?</h2></div><div><p>Browse a separate collection of event flyers, posters and promotional design work.</p><Arrow href="/graphic-design">View graphic-design work</Arrow></div></section>
    <PlatformWall compact />
    <Cta title="Not sure where to start?" body="Tell me what you want your business to do better. We can identify the right services and agree on a clear scope."/>
  </>;
}
async function Process() {
  const stored = await getProcess();
  const steps = stored.length ? stored : [
    {_id:"1",title:"Discover",description:"Understand the business, the people using the system and what needs to improve."},
    {_id:"2",title:"Scope & plan",description:"Turn the conversation into a clear implementation plan."},
    {_id:"3",title:"Design & build",description:"Create the experience and implement the agreed solution."},
    {_id:"4",title:"Integrate & test",description:"Make sure the important parts work together."},
    {_id:"5",title:"Launch & hand over",description:"Prepare the work for use and make ownership clear."}
  ];
  return <><Intro eyebrow="MY PROCESS / HOW WE WORK" title="A thoughtful process. No guesswork." body="The work is easier to deliver well when expectations are clear from the beginning. For paid advertising, that includes agreeing on objectives, audiences, budget, creative, tracking and reporting before launch. My process keeps the business goal, campaign or technical scope and delivery steps connected."/><section className="section container process-full-list">{steps.map((s,i)=><Reveal key={s._id} delay={i*55}><article className="process-row"><div><h2>{s.title}</h2><p>{s.description}</p></div></article></Reveal>)}</section><section className="section section-soft"><div className="container communication-block"><div><Eyebrow>COMMUNICATION</Eyebrow><h2>You will know where things stand.</h2></div><p>I keep project updates useful: what has been completed, what is currently in progress, what needs input and what comes next. If a dependency or issue affects delivery, I raise it clearly rather than leaving you guessing.</p></div><div className="container section-end-cta"><Arrow href="/contact">Discuss your project</Arrow></div></section><Cta title="A good project starts with clarity." body="Share what you have in mind. We can define the right first step together."/></>;
}
async function Work() {
  const projects = (await getProjects()).filter((project) => !project.category?.toLowerCase().includes("graphic design"));
  return <>
    <Intro eyebrow="SELECTED WORK" title="A closer look at the stores and systems I build." body="Explore Shopify and ecommerce projects, live websites and digital experiences. Graphic-design samples have their own dedicated gallery."/>
    <section className="section container">
      <div className="work-intro-note"><p>Hover a live project card to load its website preview. Select the project title to open the full website.</p></div>
      <div className="project-grid project-grid-large work-project-grid">{projects.map((project,index)=><ProjectCard key={project._id} project={project} index={index}/>)}</div>
      <div className="section-end-cta"><Arrow href="/graphic-design">Browse graphic-design work</Arrow></div>
    </section>
    <Cta title="Have a similar project in mind?" body="Share the goal and the context. We can work out the right scope together."/>
  </>;
}

async function GraphicDesign() {
  const projects = (await getProjects()).filter((project) => project.category?.toLowerCase().includes("graphic design"));
  return <>
    <Intro eyebrow="GRAPHIC DESIGN PORTFOLIO" title="Visual work that makes the message clear." body="A selection of flyers, posters and promotional graphics created for events and digital communication."/>
    <section className="section container graphic-design-gallery">
      {projects.length
        ? <div className="project-grid project-grid-large design-gallery-grid">{projects.map((project,index)=><ProjectCard key={project._id} project={project} index={index}/>)}</div>
        : <div className="empty-reviews"><h2>More design work will be added here.</h2><p>This collection will grow as additional completed designs are added.</p></div>}
      <p className="graphic-design-gallery-note">This gallery contains the three current design samples. More completed work can be added as you provide it.</p>
      <div className="section-end-cta"><Arrow href="/contact">Discuss a design project</Arrow></div>
    </section>
    <Cta title="Need a design for an event, offer or campaign?" body="Share the message, audience and final format. We can confirm the design scope before work begins."/>
  </>;
}

async function Testimonials() {
  const reviews = await getTestimonials();
  return <><Intro eyebrow="REVIEWS & TESTIMONIALS" title="Good work is remembered. Good experiences are shared." body="Feedback shared by buyers and clients. The original wording, attribution and source are kept intact."/><section className="section container testimonial-list">
    {reviews.length ? <TestimonialFeed reviews={reviews} />
    : <div className="empty-reviews"><span>CLIENT FEEDBACK</span><h2>More client feedback will be added here.</h2><p>Additional reviews will appear here as they are added.</p></div>}
  </section><Cta title="A good working relationship starts with a conversation." body="Tell me what you are building or improving and what a successful project would need to achieve."/></>;
}
async function Faq() {
  const items = await getFaqs();
  const faqStructuredData = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c") }} /><Intro eyebrow="FAQ / BEFORE WE START" title="A few useful answers before we talk." body="A project is easier to start when the practical questions are answered. Here are some things clients commonly ask about scope, platforms, timelines and working together."/><section className="section container faq-list">{items.map((item,i)=><Reveal key={item._id}><details className="faq-item"><summary><strong>{item.question}</strong><i>+</i></summary><TextParagraphs text={item.answer} className="faq-answer-copy"/></details></Reveal>)}</section><Cta title="Still have a question?" body="Send it over with a little context about your project. I would rather clarify it early than make assumptions."/></>;
}
function Contact({ settings }: { settings: Settings }) {
  const contactEmail = settings.email?.trim() || "timileyinpaul26@gmail.com";
  const emailHref = "mailto:" + contactEmail + "?subject=" + encodeURIComponent("Project enquiry");
  const gmailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(contactEmail) + "&su=" + encodeURIComponent("Project enquiry");
  return <><Intro eyebrow="CONTACT / DISCUSS A PROJECT" title="Tell me what you are looking to make possible." body="Whether you are starting from scratch, improving something that already exists, connecting tools or planning a paid advertising campaign, this is a good place to begin." showActions={false}/><section className="section container contact-layout"><div className="contact-left"><Eyebrow>PROJECT ENQUIRY</Eyebrow><h2>Let&apos;s make the next step clear.</h2><p>Share the goal, the challenge, your current setup and any context you already have. If it is an advertising project, include the platform, offer and campaign objective if known. I will review it and respond with the most useful next step.</p><div className="contact-method"><span>EMAIL</span><a href={emailHref} aria-label={"Open an email to " + contactEmail}>{contactEmail} ↗</a><a className="contact-email-fallback" href={gmailHref} target="_blank" rel="noreferrer">Open Gmail compose ↗</a></div><div className="contact-method"><span>WHATSAPP</span><a href={settings.whatsappUrl} target="_blank" rel="noreferrer">{settings.whatsappNumber} ↗</a></div><div className="contact-method"><span>FREELANCE PROFILES</span><a href="https://www.fiverr.com/timi_p1" target="_blank" rel="noreferrer">Fiverr ↗</a><a href="https://www.upwork.com/freelancers/~016b078cb44626d3a3" target="_blank" rel="noreferrer">Upwork ↗</a></div></div><Reveal className="contact-form-panel"><EnquiryForm email={contactEmail} whatsappUrl={settings.whatsappUrl}/></Reveal></section></>;
}
export default async function Page({ params }: RouteProps) {
  const route = (await params).slug?.join("/") || "";
  const allowed = ["","about","how-i-can-help","services","process","work","graphic-design","testimonials","faq","contact", ...Object.keys(serviceLandingPages)];
  if (!allowed.includes(route)) notFound();
  if (serviceLandingPages[route]) return <ServiceLanding route={route}/>;
  const settings = await getSettings();
  switch(route) {
    case "": return <Home settings={settings}/>;
    case "about": return <About settings={settings}/>;
    case "how-i-can-help": return <Help/>;
    case "services": return <Services/>;
    case "process": return <Process/>;
    case "work": return <Work/>;
    case "graphic-design": return <GraphicDesign/>;
    case "testimonials": return <Testimonials/>;
    case "faq": return <Faq/>;
    case "contact": return <Contact settings={settings}/>;
    default: return notFound();
  }
}