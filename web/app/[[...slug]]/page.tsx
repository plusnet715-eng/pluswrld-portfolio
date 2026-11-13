import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "../../components/enquiry-form";
import { ProjectCard } from "../../components/project-card";
import { TestimonialFeed } from "../../components/testimonial-feed";
import { Reveal } from "../../components/reveal";
import { MobileDrawer } from "../../components/mobile-drawer";
import { getFaqs, getProcess, getProjects, getServices, getSettings, getSocialLinks, getTestimonials, type PresenceLink, type Project, type Settings, type Testimonial } from "../../lib/content";

const pageTitles: Record<string, string> = { "": "Shopify, Websites, Automation & Paid Advertising", about: "About Paul Oloruntobi | Shopify, Digital Systems & Paid Advertising", "how-i-can-help": "Shopify, Websites, Automation & Paid Advertising", services: "Shopify, Websites, Automation & Paid Advertising", process: "Our Shopify, Website & Advertising Process", work: "Shopify Stores, Websites & Digital Projects", testimonials: "Client Reviews & Testimonials", faq: "Frequently Asked Questions", contact: "Discuss a Digital Project", "services/shopify-store-setup": "Shopify Store Setup, Redesign & Management", "services/website-development": "Website Development & No-Code Apps", "services/ai-automation": "AI Workflow & Business Automation", "services/creator-commerce": "Whop, Skool & Community Setup", "services/seo-social-visibility": "Website SEO & Social Commerce Setup", "services/paid-advertising": "Paid Advertising Campaign Management" };
const pageDescriptions: Record<string, string> = { "": "Pluswrld builds Shopify stores, websites and automations, and plans, manages and optimises paid advertising campaigns to help businesses reach the right customers.", about: "Meet Paul Oloruntobi, the builder behind Pluswrld. Explore his Shopify, website development, automation and paid advertising services.", "how-i-can-help": "Get practical help with Shopify, ecommerce, website development, no-code apps, business automation and paid advertising campaigns.", services: "Shopify store setup, ecommerce website development, no-code applications, AI workflow automation and paid advertising campaign management.", process: "See how Shopify, website, automation and paid advertising projects are scoped, implemented, tested and reviewed.", work: "Explore selected Shopify ecommerce stores, website builds and digital systems delivered for clients.", testimonials: "Read client feedback about Shopify store setup, website development and digital implementation work.", faq: "Answers about Shopify services, website development, project scope, platforms and delivery.", contact: "Discuss Shopify, website development, automation or a paid advertising campaign with Pluswrld.", "services/shopify-store-setup": "Shopify store setup, redesign, management and ecommerce improvements, with paid advertising support available to help attract qualified traffic.", "services/website-development": "Business website development, Webflow builds, Bubble and FlutterFlow apps, customer portals and no-code MVP implementation by Pluswrld.", "services/ai-automation": "AI workflow automation, business process mapping, app integrations and repeatable operations systems designed and implemented by Pluswrld.", "services/creator-commerce": "Whop storefronts, Skool communities, memberships, digital products, Discord roles and paid-access automation setup by Pluswrld.", "services/seo-social-visibility": "Website SEO foundations, search metadata, social profile optimisation and social-commerce connections, alongside paid advertising campaign management.", "services/paid-advertising": "Paid advertising strategy, campaign setup, management, tracking and optimisation by Pluswrld." };
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
      { title: "Store operations and integrations", description: "Relevant setup for Google Merchant Center, TikTok Shop, Pinterest and supported marketplace connections." },
      { title: "Store management and handover", description: "Agreed store-management support, operational checks and clear handover notes for your team." }
    ],
    scope: "Paid advertising campaigns can be planned and managed as part of an ecommerce growth project or as a separate engagement. Ad spend and third-party platform fees are separate from the service fee. Ongoing organic social posting is scoped separately.",
    tools: "Shopify · Google Merchant Center · TikTok Shop · Pinterest · Marketplace Connect",
    cta: "Tell me whether you are starting a new Shopify store or improving an existing one."
  },
  "services/website-development": {
    name: "Website Development and No-Code Applications",
    title: "Website Development & No-Code Apps",
    description: "Business website development, Webflow builds, Bubble and FlutterFlow apps, customer portals and no-code MVP implementation by Pluswrld.",
    eyebrow: "WEBSITE DEVELOPMENT & NO-CODE",
    heading: "Websites and applications that make your business easier to use.",
    intro: "I design and build practical websites and no-code applications around the people who will use them. The work can range from a clear business website to a customer portal, internal tool or early product MVP.",
    deliverables: [
      { title: "Business website design and build", description: "Page structure, responsive layouts and clear content presentation for service businesses and growing brands." },
      { title: "Webflow development", description: "CMS-backed websites, reusable page structures and responsive implementation in Webflow." },
      { title: "No-code applications", description: "Practical app interfaces, workflows and MVPs built with platforms such as Bubble, FlutterFlow, Glide and Adalo." },
      { title: "Customer portals and internal tools", description: "Structured experiences that help customers, members or teams access information and complete tasks." },
      { title: "Integrations and usability", description: "Forms, data connections and workflow improvements that support the intended user journey." },
      { title: "Testing and handover", description: "Responsive checks, agreed functionality testing and clear guidance for managing the finished solution." }
    ],
    scope: "The platform and implementation approach are selected after the requirements are understood. Complex custom integrations, subscriptions or third-party costs are confirmed before work begins.",
    tools: "Webflow · Bubble · FlutterFlow · Glide · Adalo",
    cta: "Share what the website or application needs to help people do."
  },
  "services/ai-automation": {
    name: "AI Workflow and Business Automation",
    title: "AI Workflow & Business Automation",
    description: "AI workflow automation, business process mapping, app integrations and repeatable operations systems designed and implemented by Pluswrld.",
    eyebrow: "AI & BUSINESS AUTOMATION",
    heading: "Connect your tools. Simplify repeatable work.",
    intro: "I help map business processes and implement automations that reduce repetitive work. The focus is on useful workflows, reliable connections between tools and clear handling when something needs human attention.",
    deliverables: [
      { title: "Workflow discovery and mapping", description: "Understand the current process, handoffs, data and points where manual work creates friction." },
      { title: "Automation implementation", description: "Build trigger-based workflows that move information and actions between the tools you already use." },
      { title: "AI-assisted workflows", description: "Introduce AI for suitable tasks such as classification, drafting, extraction and structured assistance, with human review where needed." },
      { title: "Application and API integrations", description: "Connect supported CRMs, forms, spreadsheets, communication tools and business applications." },
      { title: "Testing and exception handling", description: "Check normal and edge cases, reduce avoidable failures and define what happens when a step needs attention." },
      { title: "Documentation and handover", description: "Explain the workflow, dependencies and practical steps for maintaining the automation." }
    ],
    scope: "Automation is designed around the actual process and available platform access. Third-party subscriptions, API usage and ongoing monitoring are scoped separately where required.",
    tools: "OpenAI · n8n · Make · Zapier · APIs · Business applications",
    cta: "Describe the repetitive task or disconnected process you want to improve."
  },
  "services/creator-commerce": {
    name: "Whop, Skool and Community Commerce Setup",
    title: "Whop, Skool & Community Setup",
    description: "Whop storefronts, Skool communities, memberships, digital products, Discord roles and paid-access automation setup by Pluswrld.",
    eyebrow: "CREATOR & COMMUNITY COMMERCE",
    heading: "Build the systems behind your creator business.",
    intro: "I help creators and digital sellers organise the storefront, membership and access systems behind their offers. That includes paid communities, digital products, subscription tiers and connected Discord experiences.",
    deliverables: [
      { title: "Digital storefront and offer setup", description: "Organise products, services, pricing tiers and the customer path from offer discovery to purchase." },
      { title: "Memberships and subscriptions", description: "Configure access levels, recurring offers and member experiences around the agreed business model." },
      { title: "Discord access automation", description: "Connect paid access to appropriate Discord roles and membership permissions where supported." },
      { title: "Community platform configuration", description: "Set up the structure, spaces and core settings needed to deliver a clear member experience." },
      { title: "Customer onboarding workflows", description: "Connect welcome steps, access instructions and relevant email or platform automations." },
      { title: "Testing and handover", description: "Check purchase-to-access journeys and document how to manage the setup after launch." }
    ],
    scope: "Paid campaigns can support the launch or growth of a creator offer and can be scoped alongside the storefront and membership setup. Ad spend, platform fees and community moderation are separate considerations.",
    tools: "Whop · Skool · Discord · Kajabi · Circle",
    cta: "Tell me what you sell, where your community lives and how members should get access."
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
    description: "Website SEO foundations, search metadata, indexing setup, social profile optimisation, Pinterest SEO and social-commerce connections by Pluswrld.",
    eyebrow: "SEARCH & SOCIAL VISIBILITY",
    heading: "Make your business easier to discover.",
    intro: "I help strengthen the foundations that make a business easier to understand and find across search engines and social platforms. This includes website SEO hygiene, accurate service wording, profile optimisation and relevant social-commerce setup.",
    deliverables: [
      { title: "Technical SEO foundations", description: "Review crawl access, indexability, canonical URLs, sitemap, robots rules and important page structure." },
      { title: "On-page SEO and metadata", description: "Improve page titles, descriptions, headings, internal links and content wording around real customer searches." },
      { title: "Search indexing setup", description: "Prepare sitemap submission and ownership verification workflows for supported search tools such as Google Search Console and Bing Webmaster Tools." },
      { title: "Social profile optimisation", description: "Improve business profile information, links, descriptions and presentation so visitors understand what you offer." },
      { title: "Social-commerce connections", description: "Set up relevant product catalogues, channel connections, pixels or tracking foundations where supported." },
      { title: "Pinterest and content discoverability", description: "Structure boards, profile details and product pins to support organic discovery on Pinterest." }
    ],
    scope: "SEO supports organic discoverability, while paid campaigns provide a separate route to reach targeted audiences. Advertising objectives, platform, budget, tracking and optimisation are agreed before launch. Results are not guaranteed.",
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
    { slug: ["testimonials"] },
    { slug: ["faq"] },
    { slug: ["contact"] },
    { slug: ["services", "shopify-store-setup"] },
    { slug: ["services", "website-development"] },
    { slug: ["services", "ai-automation"] },
    { slug: ["services", "creator-commerce"] },
    { slug: ["services", "seo-social-visibility"] },
    { slug: ["services", "paid-advertising"] }
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
function Intro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <section className="page-intro container"><Reveal><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></Reveal></section>;
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
function ServiceIcon({ index }: { index: number }) {
  const icons = [<><path d="M4 7h16v12H4z" /><path d="M8 4h16v12" /><path d="M8 11h8M8 15h5" /></>, <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6M9 13h6M9 17h3" /></>, <><path d="M12 3v5M12 16v5M3 12h5M16 12h5" /><circle cx="12" cy="12" r="4" /></>];
  return <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[index % 3]}</svg></span>;
}

function DeviceView({ project, variant }: { project: Project & { liveUrl: string }; variant: "desktop" | "tablet" | "phone" }) {
  let projectHost = "live project";
  try { projectHost = new URL(project.liveUrl).hostname.replace(/^www\\./, ""); } catch {}
  return <a className={"device-view device-view-" + variant} href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={"Open " + project.title + " website"}>
    <span className="device-browser"><i /><i /><i /><span>{projectHost}</span></span>
    <span className="device-screen">
      <span className="device-site-nav"><strong>{project.title}</strong><small>SHOP&nbsp;&nbsp; ABOUT&nbsp;&nbsp; CONTACT</small></span>
      <span className="device-site-hero">
        <span className="device-site-copy"><small>SELECTED CLIENT WORK</small><b>{project.title}</b><em>{variant === "phone" ? "Explore the collection" : "A storefront shaped around the brand."}</em><span className="device-site-cta">EXPLORE</span></span>
        <span className="device-site-image">{project.imageUrl ? <Image src={project.imageUrl} alt={project.title + " project visual"} fill sizes="(max-width: 760px) 24vw, 260px" priority={variant === "desktop"} /> : <span className="mock-project-empty">PROJECT VISUAL</span>}</span>
      </span>
      <span className="device-site-lower"><i /><i /><i /></span>
    </span>
    <span className="device-view-label">{project.title} <span>↗</span></span>
  </a>;
}
function HeroShowcase({ projects }: { projects: Project[] }) {
  const publicProjects = projects.filter((project): project is Project & { liveUrl: string } => Boolean(project.liveUrl));
  const [desktop, tablet, phone] = publicProjects.slice(0, 3);
  return <Reveal className="hero-showcase" delay={120}>
    <div className="device-showcase">
      {desktop && <div className="device-frame device-frame-desktop"><DeviceView project={desktop} variant="desktop" /></div>}
      {tablet && <div className="device-frame device-frame-tablet"><DeviceView project={tablet} variant="tablet" /></div>}
      {phone && <div className="device-frame device-frame-phone"><DeviceView project={phone} variant="phone" /></div>}
      <span className="showcase-chip showcase-chip-one">LIVE PROJECTS</span>
      <span className="showcase-chip showcase-chip-two">DESKTOP · TABLET · MOBILE</span>
    </div>
  </Reveal>;
}
function Hero({ settings, projects }: { settings: Settings; projects: Project[] }) {
  return <section className="home-hero"><div className="container home-hero-grid">
    <div className="hero-copy"><Reveal><Eyebrow>SHOPIFY · WEBSITES · AUTOMATION · NO-CODE</Eyebrow><h1>{settings.heroTitle}</h1><p className="hero-description">{settings.heroDescription}</p>
      <div className="hero-actions"><Link href="/contact" className="button">Discuss a project <span>↗</span></Link><Link href="/work" className="button button-outline">Explore my work <span>↗</span></Link></div>
      <div className="hero-caption"><i className="availability-dot" />{settings.availability}</div></Reveal></div>
    <HeroShowcase projects={projects} />
  </div><div className="container hero-bottom-line"><span>BUILT AROUND YOUR BUSINESS</span><span>SHOPIFY · WEBSITES · NO-CODE · CONNECTED SYSTEMS</span></div></section>;
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
  </div></section>;
}

async function Home({ settings }: { settings: Settings }) {
  const [services, projects, steps, reviews] = await Promise.all([getServices(), getProjects(), getProcess(), getTestimonials()]);
  return <>
    <Hero settings={settings} projects={projects} /><ExpertiseStrip /><PlatformWall compact />
    <section className="section container"><div className="section-heading"><div><Eyebrow>WHAT I DO</Eyebrow><h2>One partner.<br /><span className="heading-muted">Connected solutions.</span></h2></div><div className="section-heading-aside"><p>I work across the tools businesses use to reach customers, deliver services and run day-to-day operations—from ecommerce and automation to paid advertising campaigns. The aim is to make the right technology and growth channels work together.</p><Arrow href="/services">Explore all services</Arrow></div></div>
      <div className="service-grid">{services.slice(0,4).map((service,i)=><Reveal key={service._id} delay={i*70}><article className="service-card"><ServiceIcon index={i}/><span className="card-number">0{i+1} / CAPABILITY</span><h3>{service.title}</h3><p>{service.description}</p><Arrow href="/services">Explore service</Arrow></article></Reveal>)}</div>
    </section>
    <section className="section section-soft"><div className="container"><div className="section-heading"><div><Eyebrow>SELECTED WORK</Eyebrow><h2>Built around<br /><span className="heading-muted">real business needs.</span></h2></div><div className="section-heading-aside"><p>Each project reflects a specific piece of work delivered. No invented performance figures or generic case-study claims.</p><Arrow href="/work">View all projects</Arrow></div></div><div className="project-grid">{projects.slice(0,4).map((p,i)=><ProjectCard key={p._id} project={p} index={i}/>)}</div></div></section>
    <section className="section container founder-feature">
      <Reveal className="founder-feature-image"><Image src={settings.portraitUrl} alt="Paul Oloruntobi, digital builder behind Pluswrld" fill sizes="(max-width: 760px) 86vw, 35vw"/></Reveal>
      <div className="founder-feature-copy"><Eyebrow>THE FACE BEHIND PLUSWRLD</Eyebrow><h2>Thoughtful systems. Practical execution.</h2>
        <p>I’m Paul Oloruntobi. I work with businesses to build and improve their digital experiences, connect their operations and manage paid campaigns that bring the right people to their offers.</p>
        <Arrow href="/about">Meet Paul</Arrow>
      </div>
    </section>
    {reviews.some((review) => review.featured) && <section className="section container home-reviews"><div className="section-heading"><div><Eyebrow>CLIENT FEEDBACK</Eyebrow><h2>Good work.<br /><span className="heading-muted">Good working relationships.</span></h2></div><div className="section-heading-aside"><p>Feedback shared by clients across completed projects. Original wording and attribution are preserved.</p><Arrow href="/testimonials">Read all reviews</Arrow></div></div><div className="home-review-grid">{reviews.filter((review) => review.featured).slice(0,2).map((review,i)=><Reveal key={review._id} delay={i*65}><ReviewCard review={review} compact /></Reveal>)}</div></section>}
    <section className="section container"><div className="section-heading"><div><Eyebrow>HOW I WORK</Eyebrow><h2>Clear thinking.<br /><span className="heading-muted">Careful execution.</span></h2></div><div className="section-heading-aside"><p>Good delivery starts before implementation. The business goal, scope, technical decisions and handover all need to connect.</p><Arrow href="/process">See my process</Arrow></div></div><div className="process-preview-list">{steps.slice(0,4).map((s,i)=><Reveal key={s._id} delay={i*50} className="preview-step"><span>0{i+1}</span><h3>{s.title}</h3><p>{s.description}</p></Reveal>)}</div></section>
    <ExploreMore />
    <Cta title="Have something worth building?" body="Share the idea, the challenge or the system you want to improve. We can work out a practical next step." />
  </>;
}

function TextParagraphs({ text, className = "" }: { text: string; className?: string }) {
  const normalized = (text || "").replace(/\r\n?/g, "\n").trim();
  const paragraphs = normalized.split(/\n\s*\n/).map((part) => part.replace(/\s*\n\s*/g, " ").trim()).filter(Boolean);
  return <div className={className}>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}

function AboutSocialLinks({ links }: { links: PresenceLink[] }) {
  const icons: Record<string, { slug: string; colour: string }> = {
    instagram: { slug: "instagram", colour: "E4405F" },
    facebook: { slug: "facebook", colour: "0866FF" },
    tiktok: { slug: "tiktok", colour: "000000" },
    linkedin: { slug: "linkedin", colour: "0A66C2" },
    threads: { slug: "threads", colour: "000000" },
    whatsapp: { slug: "whatsapp", colour: "25D366" },
    x: { slug: "x", colour: "000000" },
    twitter: { slug: "x", colour: "000000" }
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
          ? <svg className="social-link-icon-linkedin" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.919-2.064 2.063-2.064 1.14 0 2.064.926 2.064 2.064 0 1.139-.923 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
          : icon.slug === "whatsapp"
            ? <svg className="social-link-icon-whatsapp" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            : <img src={"/platform/" + icon.slug + ".svg"} alt="" width="18" height="18" loading="lazy"/>}
      </a>;
    })}
  </nav>;
}
async function About({ settings }: { settings: Settings }) {
  const socialLinks = await getSocialLinks();
  const capabilities = [
    { number:"01", label:"SHOPIFY & ECOMMERCE", title:"Ecommerce stores", description:"Shopify builds, redesigns, theme customisation, product and variant setup, store management and practical improvements to the buying experience." },
    { number:"02", label:"WEBSITES & APPLICATIONS", title:"Websites and no-code apps", description:"Business websites, customer portals and useful applications built around how customers, members or teams need to work." },
    { number:"03", label:"CREATOR COMMERCE", title:"Memberships and communities", description:"Digital product storefronts, courses, paid memberships and community access using platforms such as Whop, Skool and Discord." },
    { number:"04", label:"AI & AUTOMATION", title:"Connected business workflows", description:"Practical automations and integrations that connect tools, reduce repetitive work and make business processes easier to manage." }
  ];
  const audiences = [
    { label:"Ecommerce businesses", description:"Businesses that need a better online store, clearer product journeys or more reliable store operations." },
    { label:"Service businesses", description:"Businesses that need a stronger website, smoother customer experience or better-connected tools." },
    { label:"Creators and digital sellers", description:"People building digital offers, memberships, courses and paid communities." }
  ];
  const visibility = [
    { label:"SEARCH VISIBILITY", title:"Help customers find you through search", description:"I improve website structure, on-page content and relevant technical foundations so search engines can understand the business and the pages it offers." },
    { label:"PAID ADVERTISING", title:"Campaigns built to reach the right audience", description:"I plan, launch, manage and optimise paid advertising campaigns around your offer, audience and business objectives. Platform, budget, tracking and creative requirements are agreed before launch." },
    { label:"SOCIAL VISIBILITY", title:"Social profile setup and commerce connections", description:"I set up and optimise business social profiles, connect relevant social-commerce features and improve the path from discovery to your offer. Ongoing organic posting is scoped separately." }
  ];
  const approach = [
    ["01","Understand the business","We start with what you want customers to do, what your team needs and what is getting in the way."],
    ["02","Plan the right solution","I choose a practical platform and agree on the work, priorities and boundaries before implementation."],
    ["03","Build and improve","I put the solution together, organise the details and refine the experience around real use."],
    ["04","Test and hand over","I check the important journeys, explain what has been delivered and make the next steps clear."]
  ];
  const principles = [
    { title:"Clarity before tools", description:"The business need comes first. The platform should serve the goal, not dictate it." },
    { title:"Useful for real people", description:"The experience should make sense to customers, owners and teams who use it every day." },
    { title:"Clear after launch", description:"Testing, communication and a practical handover are part of the work—not afterthoughts." }
  ];

  return <>
    <Intro eyebrow="INTRODUCTION" title="I build digital experiences that help businesses grow." body={settings.aboutIntro}/>
    <section className="section container about-profile">
      <div className="about-profile-visual">
        <Reveal className="about-image"><Image src={settings.originalPortraitUrl || settings.portraitUrl} alt="Paul Oloruntobi, the person behind Pluswrld" fill sizes="(max-width: 760px) 85vw, 40vw"/></Reveal>
        <div className="about-profile-meta">
          <div><strong>Paul Oloruntobi</strong><span>{settings.role}</span><small className="about-name-note">Some Fiverr clients know me as Timma.</small></div>
          <AboutSocialLinks links={socialLinks}/>
        </div>
      </div>
      <div className="about-profile-copy">
        <Reveal>
          <Eyebrow>MEET THE BUILDER</Eyebrow>
          <h2>I stay involved from the first idea to the working solution.</h2>
          <TextParagraphs text={settings.aboutStory} className="about-story-copy"/>
        </Reveal>
      </div>
    </section>
    <section className="section section-soft about-capabilities">
      <div className="container">
        <div className="section-heading"><div><Eyebrow>WHAT I BUILD</Eyebrow><h2>Digital work that helps<br/><span className="heading-muted">a business move forward.</span></h2></div>
          <div className="section-heading-aside"><p>I work across the customer-facing experience and the systems behind it—from the store or website people visit to the workflows that help the business run.</p></div></div>
        <div className="about-capability-grid">{capabilities.map((item,index)=><Reveal key={item.number} delay={index*45}><article className="about-capability-card">
          <span className="about-capability-index">{item.number} / {item.label}</span><h3>{item.title}</h3><p>{item.description}</p>
        </article></Reveal>)}</div>
      </div>
    </section>
    <section className="section container about-fit">
      <div className="section-heading"><div><Eyebrow>WHO I WORK WITH</Eyebrow><h2>Different businesses.<br/><span className="heading-muted">Different needs.</span></h2></div>
        <div className="section-heading-aside"><p>You do not need to arrive with a technical plan. Start with the business challenge or outcome you have in mind, and we can work out the right approach.</p></div></div>
      <div className="about-fit-grid">{audiences.map((item,index)=><Reveal key={item.label} delay={index*45}><article className="about-fit-card"><span>0{index+1}</span><h3>{item.label}</h3><p>{item.description}</p></article></Reveal>)}</div>
    </section>
    <section className="section section-soft about-visibility">
      <div className="container">
        <div className="section-heading"><div><Eyebrow>SEARCH & SOCIAL VISIBILITY</Eyebrow><h2>Build it well. Help people find it.</h2></div>
          <div className="section-heading-aside"><p>A good digital presence should make it easier for the right people to discover a business, understand its offer and decide what to do next.</p></div></div>
        <div className="about-visibility-grid">{visibility.map((item,index)=><Reveal key={item.label} delay={index*60}><article className="about-visibility-card">
          <span>{item.label}</span><h3>{item.title}</h3><p>{item.description}</p>
        </article></Reveal>)}</div>
      </div>
    </section>
    <section className="section container about-approach">
      <div className="about-approach-layout">
        <div className="about-approach-heading"><Eyebrow>HOW I WORK</Eyebrow><h2>Clear communication. Hands-on delivery.</h2>
          <p>I stay involved from the first conversation through implementation and handover, so you know what is being built and why.</p>
        </div>
        <div className="about-approach-list">{approach.map(([number,title,description])=><article className="about-approach-step" key={number}>
          <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
        </article>)}</div>
      </div>
    </section>
    <section className="section section-soft about-principles">
      <div className="container">
        <div className="section-heading"><div><Eyebrow>WHAT GOOD DELIVERY LOOKS LIKE</Eyebrow><h2>Work that is useful,<br/><span className="heading-muted">clear and ready to use.</span></h2></div>
          <div className="section-heading-aside"><p>The build is only one part of a good project. The experience, communication and handover matter too.</p></div></div>
        <div className="about-principle-grid">{principles.map((item,index)=><Reveal key={item.title} delay={index*45}><article className="about-principle-card"><span>0{index+1}</span><h3>{item.title}</h3><p>{item.description}</p></article></Reveal>)}</div>
      </div>
    </section>
    <section className="section container about-work-bridge">
      <div className="about-work-bridge-heading"><Eyebrow>PAST WORK</Eyebrow><h2>See how the work comes together.</h2></div>
      <div><p>Explore selected client projects across ecommerce, websites and digital systems. They show the kind of practical work I do and the details I pay attention to.</p><Arrow href="/work">Explore my past work</Arrow></div>
    </section>
    <Cta title="Have something worth building?" body="Tell me what you are trying to build, improve or make easier to find. We can work out a practical next step."/>
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
    {name:"Google",src:"/platform/google.svg"},
    {name:"Microsoft",src:"/platform/microsoft.svg"},
    {name:"TikTok",src:"/platform/tiktok.svg"},
    {name:"Pinterest",src:"/platform/pinterest.svg"},
    {name:"Facebook",src:"/platform/facebook.svg"},
    {name:"Instagram",src:"/platform/instagram.svg"}
  ]},
  { title: "Websites & no-code", items: [
    {name:"Webflow",src:"/platform/webflow.svg"},
    {name:"Bubble",src:"/platform/bubble.svg"},
    {name:"FlutterFlow",src:"/platform/flutterflow.svg"},
    {name:"Glide",src:"/platform/glide.svg"},
    {name:"Adalo",src:"/platform/adalo.svg"}
  ]},
  { title: "AI & automation", items: [
    {name:"OpenAI",src:"/platform/openai.svg"},
    {name:"n8n",src:"/platform/n8n.svg"},
    {name:"Make",src:"/platform/make.svg"},
    {name:"Zapier",src:"/platform/zapier.svg"},
    {name:"Claude",src:"/platform/claude.svg"}
  ]},
  { title: "Creator, community & email", items: [
    {name:"Whop",src:"/platform/whop.svg"},
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
    </section>
    <section className="section section-soft"><div className="container"><div className="section-heading"><div><Eyebrow>HOW I WORK</Eyebrow><h2>From a clear brief<br/><span className="heading-muted">to a working solution.</span></h2></div></div><div className="process-preview-list">{steps.map(([number,title,description])=><article className="preview-step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section className="scope-note container"><div><Eyebrow>TOOLS & PROJECT SCOPE</Eyebrow><h2>Choose the tools that fit the job.</h2></div><div><p>{service.scope}</p><div className="tools-line"><span>PLATFORMS & TOOLS</span><p>{service.tools}</p></div><Arrow href="/services">View all services</Arrow></div></section>
    <Cta title="Let's make the next step clear." body={service.cta} />
  </>;
}

function Services() {
  const cards = [
    {title:"Shopify & Ecommerce Systems",href:"/services/shopify-store-setup",intro:"Build, improve and operate an ecommerce experience that is ready for real customers and day-to-day management.",items:["Shopify store setup and builds from scratch","Theme customisation, redesign and responsive layouts","Product uploads, collections, variants and SKU setup","Store management and ecommerce VA support","On-page SEO, technical hygiene and CRO improvements","Google Merchant Center and social-commerce setup","Paid campaign support for ecommerce growth"],tools:"Shopify · Google Merchant Center · TikTok Shop · Pinterest · Marketplace Connect"},
    {title:"Websites & No-Code Applications",href:"/services/website-development",intro:"Create useful websites and applications that make it easier for customers, teams or communities to get things done.",items:["Business and service websites","Customer portals and internal tools","No-code MVPs and SaaS concepts","Workflow and interface configuration","Responsive layouts and usability improvements"],tools:"Webflow · Bubble · FlutterFlow · Glide · Adalo"},
    {title:"AI & Business Automation",href:"/services/ai-automation",intro:"Reduce repetitive work by mapping the process first, then connecting the tools and automations that genuinely help.",items:["Workflow discovery and process mapping","AI-assisted workflows and business operations","CRM and application integrations","Email automation and customer journeys","Testing, documentation and handover"],tools:"AI tools · Klaviyo · Brevo · APIs · No-code automation platforms"},
    {title:"Paid Advertising & Campaign Management",href:"/services/paid-advertising",intro:"Plan, launch and optimise paid campaigns around your offer, audience and growth objectives.",items:["Campaign strategy and objective planning","Audience, placement and budget configuration","Ad copy and creative direction","Pixel, event and conversion tracking","Campaign launch, management and optimisation","Performance monitoring and reporting"],tools:"Paid advertising platforms · Conversion tracking · Analytics"},
    {title:"Creator & Community Commerce",href:"/services/creator-commerce",intro:"Structure the experience behind digital products, paid communities, memberships and service-led creator businesses.",items:["Digital storefront and offer setup","Courses, memberships and subscription tiers","Discord roles and paid-access workflows","Community platform configuration","Customer journey and onboarding setup"],tools:"Whop · Skool · Discord · Kajabi · Circle"}
  ];
  return <><Intro eyebrow="SERVICES / WHAT I DO" title="Practical digital solutions, thoughtfully built." body="I help businesses plan and implement the digital tools behind their customer experience and operations. Choose a service area to explore, or bring me the problem and we can work out the right combination."/><section className="section container service-detail-list">{cards.map((c,i)=><Reveal key={c.title}><article className="service-detail-card"><div className="service-detail-number">0{i+1}</div><div className="service-detail-main"><Eyebrow>{c.title.toUpperCase()}</Eyebrow><h2>{c.title}</h2><p className="service-detail-intro">{c.intro}</p><ul className="check-list">{c.items.map((item)=><li key={item}>{item}</li>)}</ul><div className="tools-line"><span>PLATFORMS & TOOLS</span><p>{c.tools}</p></div><Arrow href={c.href}>Explore service details</Arrow></div></article></Reveal>)}</section><section className="scope-note container"><div><Eyebrow>CLEAR SCOPE</Eyebrow><h2>Implementation, not vague promises.</h2></div><p>Deliverables, exclusions, dependencies and handover expectations are clarified before work begins. I provide Shopify and website implementation, automation, organic visibility support and paid advertising campaign management. Ongoing organic social posting is scoped separately.</p></section><PlatformWall compact /><Cta title="Not sure which service fits?" body="Start with the outcome you need. We can clarify the right combination of services together."/></>;
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
  return <><Intro eyebrow="MY PROCESS / HOW WE WORK" title="A thoughtful process. No guesswork." body="The work is easier to deliver well when expectations are clear from the beginning. For paid advertising, that includes agreeing on objectives, audiences, budget, creative, tracking and reporting before launch. My process keeps the business goal, campaign or technical scope and delivery steps connected."/><section className="section container process-full-list">{steps.map((s,i)=><Reveal key={s._id} delay={i*55}><article className="process-row"><span className="process-number">0{i+1}</span><div><h2>{s.title}</h2><p>{s.description}</p></div><span className="process-marker">PLUSWRLD / 0{i+1}</span></article></Reveal>)}</section><section className="section section-soft"><div className="container communication-block"><div><Eyebrow>COMMUNICATION</Eyebrow><h2>You will know where things stand.</h2></div><p>I keep project updates useful: what has been completed, what is currently in progress, what needs input and what comes next. If a dependency or issue affects delivery, I raise it clearly rather than leaving you guessing.</p></div></section><Cta title="A good project starts with clarity." body="Share what you have in mind. We can define the right first step together."/></>;
}
async function Work() {
  const projects = await getProjects();
  return <><Intro eyebrow="PAST WORK / SELECTED PROJECTS" title="A closer look at the work behind the build." body="Explore selected client projects across Shopify ecommerce and creator commerce. Each project is presented for the work involved, without inflated performance claims."/><section className="section container"><div className="work-intro-note"><span>PROJECT INDEX / {String(projects.length).padStart(2, "0")}</span><p>Storefront imagery is taken from the respective public websites and represents the project context, not a before-and-after result.</p></div><div className="project-grid project-grid-large">{projects.map((p,i)=><ProjectCard key={p._id} project={p} index={i}/>)}</div></section><Cta title="Have a project with a similar challenge?" body="Let's discuss the business need and work out what a good solution would involve."/></>;
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
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData).replace(/</g, "\\u003c") }} /><Intro eyebrow="FAQ / BEFORE WE START" title="A few useful answers before we talk." body="A project is easier to start when the practical questions are answered. Here are some things clients commonly ask about scope, platforms, timelines and working together."/><section className="section container faq-list">{items.map((item,i)=><Reveal key={item._id}><details className="faq-item"><summary><span>{String(i+1).padStart(2,"0")}</span><strong>{item.question}</strong><i>+</i></summary><TextParagraphs text={item.answer} className="faq-answer-copy"/></details></Reveal>)}</section><Cta title="Still have a question?" body="Send it over with a little context about your project. I would rather clarify it early than make assumptions."/></>;
}
function Contact({ settings }: { settings: Settings }) {
  const contactEmail = settings.email?.trim() || "timileyinpaul26@gmail.com";
  const emailHref = "mailto:" + contactEmail + "?subject=" + encodeURIComponent("Project enquiry");
  const gmailHref = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(contactEmail) + "&su=" + encodeURIComponent("Project enquiry");
  return <><Intro eyebrow="CONTACT / DISCUSS A PROJECT" title="Tell me what you are looking to make possible." body="Whether you are starting from scratch, improving something that already exists, connecting tools or planning a paid advertising campaign, this is a good place to begin."/><section className="section container contact-layout"><div className="contact-left"><Eyebrow>PROJECT ENQUIRY</Eyebrow><h2>Let&apos;s make the next step clear.</h2><p>Share the goal, the challenge, your current setup and any context you already have. If it is an advertising project, include the platform, offer and campaign objective if known. I will review it and respond with the most useful next step.</p><div className="contact-method"><span>EMAIL</span><a href={emailHref} aria-label={"Open an email to " + contactEmail}>{contactEmail} ↗</a><a className="contact-email-fallback" href={gmailHref} target="_blank" rel="noreferrer">Open Gmail compose ↗</a></div><div className="contact-method"><span>WHATSAPP</span><a href={settings.whatsappUrl} target="_blank" rel="noreferrer">{settings.whatsappNumber} ↗</a></div><div className="contact-method"><span>FREELANCE PROFILES</span><a href="https://www.fiverr.com/timi_p1" target="_blank" rel="noreferrer">Fiverr ↗</a><a href="https://www.upwork.com/freelancers/~016b078cb44626d3a3" target="_blank" rel="noreferrer">Upwork ↗</a></div></div><Reveal className="contact-form-panel"><EnquiryForm email={contactEmail} whatsappUrl={settings.whatsappUrl}/></Reveal></section></>;
}
export default async function Page({ params }: RouteProps) {
  const route = (await params).slug?.join("/") || "";
  const allowed = ["","about","how-i-can-help","services","process","work","testimonials","faq","contact", ...Object.keys(serviceLandingPages)];
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
    case "testimonials": return <Testimonials/>;
    case "faq": return <Faq/>;
    case "contact": return <Contact settings={settings}/>;
    default: return notFound();
  }
}