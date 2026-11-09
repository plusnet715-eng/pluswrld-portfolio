import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnquiryForm } from "../../components/enquiry-form";
import { ProjectCard } from "../../components/project-card";
import { Reveal } from "../../components/reveal";
import { getFaqs, getProcess, getProjects, getServices, getSettings, getTestimonials, type Settings } from "../../lib/content";

const pageTitles: Record<string, string> = { "": "Build. Automate. Grow.", about: "About me", "how-i-can-help": "How I can help you", services: "Services", process: "My process", work: "Selected work", testimonials: "Reviews & testimonials", faq: "Frequently asked questions", contact: "Discuss a project" };
const pageDescriptions: Record<string, string> = { "": "Practical digital systems, clearly scoped and built around your business.", about: "Meet Paul Oloruntobi, the consultant behind Pluswrld.", "how-i-can-help": "Start with the business challenge. We will map a practical solution.", services: "Shopify, ecommerce, websites, no-code applications, AI automation and creator-commerce systems.", process: "A clear process from discovery through implementation and handover.", work: "Selected client projects across Shopify ecommerce and digital systems.", testimonials: "Feedback shared by clients through Fiverr.", faq: "Answers about scope, platforms and delivery.", contact: "Share what you are building, improving or trying to connect." };
type RouteProps = { params: Promise<{ slug?: string[] }> };
export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const route = (await params).slug?.join("/") || "";
  return { title: pageTitles[route] || "Page not found", description: pageDescriptions[route] || "Pluswrld — independent digital systems consultancy." };
}
function Eyebrow({ children }: { children: React.ReactNode }) { return <span className="eyebrow"><i className="eyebrow-line" />{children}</span>; }
function Intro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <section className="page-intro container"><Reveal><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1><p>{body}</p></Reveal></section>;
}
function Cta({ title, body }: { title: string; body: string }) {
  return <section className="cta-band"><div className="container cta-band-inner"><div><Eyebrow>THE NEXT STEP</Eyebrow><h2>{title}</h2><p>{body}</p></div><Link href="/contact" className="button button-light">Discuss a project <span>↗</span></Link></div></section>;
}
function Arrow({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href} className="text-link">{children} <span>↗</span></Link>; }
function ServiceIcon({ index }: { index: number }) {
  const icons = [<><path d="M4 7h16v12H4z" /><path d="M8 4h16v12" /><path d="M8 11h8M8 15h5" /></>, <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M9 9h6M9 13h6M9 17h3" /></>, <><path d="M12 3v5M12 16v5M3 12h5M16 12h5" /><circle cx="12" cy="12" r="4" /></>];
  return <span className="service-icon"><svg viewBox="0 0 24 24" aria-hidden="true">{icons[index % 3]}</svg></span>;
}
function Hero({ settings }: { settings: Settings }) {
  return <section className="home-hero"><div className="container home-hero-grid">
    <div className="hero-copy"><Reveal><Eyebrow>INDEPENDENT DIGITAL SYSTEMS CONSULTANT</Eyebrow><h1>{settings.heroTitle}</h1><p className="hero-description">{settings.heroDescription}</p>
      <div className="hero-actions"><Link href="/contact" className="button">Discuss a project <span>↗</span></Link><Link href="/work" className="button button-outline">Explore my work <span>↗</span></Link></div>
      <div className="hero-caption"><i className="availability-dot" />{settings.availability}<span className="caption-separator">/</span>{settings.location}</div></Reveal></div>
    <Reveal className="hero-portrait-wrap" delay={120}><div className="portrait-orbit" /><div className="portrait-frame"><Image src={settings.portraitUrl} alt="Paul Oloruntobi, founder of Pluswrld" fill priority sizes="(max-width: 800px) 80vw, 42vw" /></div><div className="portrait-note"><b>PAUL OLORUNTOBI</b><span>BUILD · AUTOMATE · GROW</span></div><div className="portrait-index">01 / PLUSWRLD</div></Reveal>
  </div><div className="container hero-bottom-line"><span>STRATEGY WITH PRACTICAL IMPLEMENTATION</span><span>ECOMMERCE · AUTOMATION · DIGITAL SYSTEMS</span></div></section>;
}
function ExpertiseStrip() {
  return <div className="expertise-strip"><div className="container expertise-track">{["Shopify & ecommerce","AI workflows","No-code applications","Creator commerce","Connected systems"].map((x,i)=><span key={x}><i>0{i+1}</i>{x}</span>)}</div></div>;
}
async function Home({ settings }: { settings: Settings }) {
  const [services, projects, steps] = await Promise.all([getServices(), getProjects(), getProcess()]);
  return <>
    <Hero settings={settings} /><ExpertiseStrip />
    <section className="section container"><div className="section-heading"><div><Eyebrow>WHAT I DO</Eyebrow><h2>One partner.<br /><span className="heading-muted">Connected solutions.</span></h2></div><div className="section-heading-aside"><p>I work across the tools businesses use to reach customers, deliver services and run day-to-day operations. The aim is to make the right technology work together.</p><Arrow href="/services">Explore all services</Arrow></div></div>
      <div className="service-grid">{services.slice(0,3).map((service,i)=><Reveal key={service._id} delay={i*70}><article className="service-card"><ServiceIcon index={i}/><span className="card-number">0{i+1} / CAPABILITY</span><h3>{service.title}</h3><p>{service.description}</p><Arrow href="/services">Explore service</Arrow></article></Reveal>)}</div>
    </section>
    <section className="section section-soft"><div className="container"><div className="section-heading"><div><Eyebrow>SELECTED WORK</Eyebrow><h2>Built around<br /><span className="heading-muted">real business needs.</span></h2></div><div className="section-heading-aside"><p>Each project reflects a specific piece of work delivered. No invented performance figures or generic case-study claims.</p><Arrow href="/work">View all projects</Arrow></div></div><div className="project-grid">{projects.slice(0,4).map((p,i)=><ProjectCard key={p._id} project={p} index={i}/>)}</div></div></section>
    <section className="section container"><div className="section-heading"><div><Eyebrow>HOW I WORK</Eyebrow><h2>Clear thinking.<br /><span className="heading-muted">Careful execution.</span></h2></div><div className="section-heading-aside"><p>Good delivery starts before implementation. The business goal, scope, technical decisions and handover all need to connect.</p><Arrow href="/process">See my process</Arrow></div></div><div className="process-preview-list">{steps.slice(0,4).map((s,i)=><Reveal key={s._id} delay={i*50} className="preview-step"><span>0{i+1}</span><h3>{s.title}</h3><p>{s.description}</p></Reveal>)}</div></section>
    <Cta title="Have something worth building?" body="Share the idea, the challenge or the system you want to improve. We can work out a practical next step." />
  </>;
}
function About({ settings }: { settings: Settings }) {
  return <><Intro eyebrow="ABOUT ME / THE PERSON BEHIND PLUSWRLD" title="Business thinking meets hands-on implementation." body={settings.aboutIntro}/>
    <section className="section container about-layout"><Reveal className="about-image"><Image src={settings.portraitUrl} alt="Paul Oloruntobi" fill sizes="(max-width: 760px) 85vw, 42vw"/></Reveal><div className="about-copy"><Reveal><Eyebrow>MY BACKGROUND</Eyebrow><h2>I care about the system behind the experience.</h2><p>{settings.aboutStory}</p></Reveal><Reveal delay={90}><div className="principle-block"><span>HOW I THINK</span><h3>Technology should solve a real business problem.</h3><p>{settings.aboutPhilosophy}</p></div></Reveal><Reveal delay={150}><div className="profile-facts"><div><span>FOCUS</span><strong>Build · Automate · Grow</strong></div><div><span>BASED IN</span><strong>{settings.location}</strong></div><div><span>WORKING STYLE</span><strong>Clear scope. Practical delivery.</strong></div></div></Reveal></div></section>
    <Cta title="The right solution starts with the right question." body="Tell me what you are trying to make possible. We can clarify the work before deciding how to build it."/></>;
}
function Help() {
  const items = [
    ["01 / STARTING SOMETHING NEW","You have an idea but need a digital foundation.","I help shape the scope, choose a practical platform and build the first working version around your business needs — a Shopify store, website, customer portal or no-code application."],
    ["02 / IMPROVING WHAT EXISTS","Your current setup is holding you back.","I review the existing store or website, identify the most important usability or operational issues and implement agreed improvements in a controlled scope."],
    ["03 / CONNECTING YOUR TOOLS","Your tools do not work well together.","I map the workflow and connect suitable tools through integrations and automation, with testing and a clear handover."],
    ["04 / CREATOR COMMERCE","You want to sell services, memberships or digital products.","I help organise storefronts, service listings, tiers and access workflows using platforms such as Whop, Skool and Discord."]
  ];
  return <><Intro eyebrow="HOW I CAN HELP YOU" title="Bring me the challenge. We will map the solution." body="You do not need to arrive with a technical specification or know which platform to use. Start with what your business is trying to do, what feels difficult or what you want to make possible."/><section className="section container situation-list">{items.map((x,i)=><Reveal key={x[0]} delay={i*50}><article className="situation-row"><span>{x[0]}</span><div><h2>{x[1]}</h2><p>{x[2]}</p></div><span className="situation-arrow">↗</span></article></Reveal>)}</section><Cta title="You bring the context. I bring the structure." body="Tell me what is happening in your business. We can identify the right next step before implementation begins."/></>;
}
function Services() {
  const cards = [
    {title:"Shopify & Ecommerce Systems",intro:"Build, improve and operate an ecommerce experience that is ready for real customers and day-to-day management.",items:["Shopify store setup and builds from scratch","Theme customisation, redesign and responsive layouts","Product uploads, collections, variants and SKU setup","Store management and ecommerce VA support","On-page SEO, technical hygiene and CRO improvements","Google Merchant Center and social-commerce setup"],tools:"Shopify · Google Merchant Center · TikTok Shop · Pinterest · Marketplace Connect"},
    {title:"Websites & No-Code Applications",intro:"Create useful websites and applications that make it easier for customers, teams or communities to get things done.",items:["Business and service websites","Customer portals and internal tools","No-code MVPs and SaaS concepts","Workflow and interface configuration","Responsive layouts and usability improvements"],tools:"Webflow · Bubble · FlutterFlow · Glide · Adalo"},
    {title:"AI & Business Automation",intro:"Reduce repetitive work by mapping the process first, then connecting the tools and automations that genuinely help.",items:["Workflow discovery and process mapping","AI-assisted workflows and business operations","CRM and application integrations","Email automation and customer journeys","Testing, documentation and handover"],tools:"AI tools · Klaviyo · Brevo · APIs · No-code automation platforms"},
    {title:"Creator & Community Commerce",intro:"Structure the experience behind digital products, paid communities, memberships and service-led creator businesses.",items:["Digital storefront and offer setup","Courses, memberships and subscription tiers","Discord roles and paid-access workflows","Community platform configuration","Customer journey and onboarding setup"],tools:"Whop · Skool · Discord · Kajabi · Circle"}
  ];
  return <><Intro eyebrow="SERVICES / WHAT I DO" title="Practical digital solutions, thoughtfully built." body="I help businesses plan and implement the digital tools behind their customer experience and operations. Choose a service area to explore, or bring me the problem and we can work out the right combination."/><section className="section container service-detail-list">{cards.map((c,i)=><Reveal key={c.title}><article className="service-detail-card"><div className="service-detail-number">0{i+1}</div><div className="service-detail-main"><Eyebrow>{c.title.toUpperCase()}</Eyebrow><h2>{c.title}</h2><p className="service-detail-intro">{c.intro}</p><ul className="check-list">{c.items.map((item)=><li key={item}>{item}</li>)}</ul><div className="tools-line"><span>PLATFORMS & TOOLS</span><p>{c.tools}</p></div></div></article></Reveal>)}</section><section className="scope-note container"><div><Eyebrow>CLEAR SCOPE</Eyebrow><h2>Implementation, not vague promises.</h2></div><p>Deliverables, exclusions, dependencies and handover expectations are clarified before work begins. Paid advertising campaign management and ongoing social posting are outside my service scope.</p></section><Cta title="Not sure which service fits?" body="Start with the outcome you need. We can clarify the right combination of services together."/></>;
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
  return <><Intro eyebrow="MY PROCESS / HOW WE WORK" title="A thoughtful process. No guesswork." body="The work is easier to deliver well when expectations are clear from the beginning. My process keeps the business goal, technical scope and delivery steps connected."/><section className="section container process-full-list">{steps.map((s,i)=><Reveal key={s._id} delay={i*55}><article className="process-row"><span className="process-number">0{i+1}</span><div><h2>{s.title}</h2><p>{s.description}</p></div><span className="process-marker">PLUSWRLD / 0{i+1}</span></article></Reveal>)}</section><section className="section section-soft"><div className="container communication-block"><div><Eyebrow>COMMUNICATION</Eyebrow><h2>You will know where things stand.</h2></div><p>I keep project updates useful: what has been completed, what is currently in progress, what needs input and what comes next. If a dependency or issue affects delivery, I raise it clearly rather than leaving you guessing.</p></div></section><Cta title="A good project starts with clarity." body="Share what you have in mind. We can define the right first step together."/></>;
}
async function Work() {
  const projects = await getProjects();
  return <><Intro eyebrow="PAST WORK / SELECTED PROJECTS" title="A closer look at the work behind the build." body="A selection of client engagements across ecommerce and creator commerce. Each project reflects the work contributed, without overstating the scope or claiming results that have not been measured."/><section className="section container"><div className="work-intro-note"><span>PROJECT INDEX / 04</span><p>Storefront imagery is taken from the respective public websites and represents the project context, not a before-and-after result.</p></div><div className="project-grid project-grid-large">{projects.map((p,i)=><ProjectCard key={p._id} project={p} index={i}/>)}</div></section><Cta title="Have a project with a similar challenge?" body="Let's discuss the business need and work out what a good solution would involve."/></>;
}
async function Testimonials() {
  const reviews = await getTestimonials();
  return <><Intro eyebrow="REVIEWS & TESTIMONIALS" title="Good work is remembered. Good experiences are shared." body="Feedback shared by buyers and clients. The original wording, attribution and source are kept intact."/><section className="section container testimonial-list">
    {reviews.length ? reviews.map((r,i)=><Reveal key={r._id} delay={i*60}><article className="testimonial-card"><div className="testimonial-top"><span className="testimonial-stars" aria-label={r.rating+" out of 5 stars"}>{"★".repeat(Math.max(0,Math.min(5,r.rating)))+"☆".repeat(Math.max(0,5-r.rating))}</span><span>{r.platform} · {r.reviewDate}</span></div><blockquote>“{r.quote}”</blockquote><div className="testimonial-bottom"><div><strong>{r.reviewerLabel || "Client review"}</strong><span>{r.reviewerHandle ? "@"+r.reviewerHandle : "Verified source"}</span></div><a href={r.sourceUrl || "https://www.fiverr.com/timi_p1"} target="_blank" rel="noreferrer">View source ↗</a></div></article></Reveal>)
    : <div className="empty-reviews"><span>CLIENT FEEDBACK</span><h2>More client feedback will be added here.</h2><p>Reviews from the additional reference document will be added once the original wording and buyer names are ready.</p></div>}
  </section><Cta title="A good working relationship starts with a conversation." body="Tell me what you are building or improving and what a successful project would need to achieve."/></>;
}
async function Faq() {
  const items = await getFaqs();
  return <><Intro eyebrow="FAQ / BEFORE WE START" title="A few useful answers before we talk." body="A project is easier to start when the practical questions are answered. Here are some things clients commonly ask about scope, platforms, timelines and working together."/><section className="section container faq-list">{items.map((item,i)=><Reveal key={item._id}><details className="faq-item"><summary><span>{String(i+1).padStart(2,"0")}</span><strong>{item.question}</strong><i>+</i></summary><p>{item.answer}</p></details></Reveal>)}</section><Cta title="Still have a question?" body="Send it over with a little context about your project. I would rather clarify it early than make assumptions."/></>;
}
function Contact({ settings }: { settings: Settings }) {
  return <><Intro eyebrow="CONTACT / DISCUSS A PROJECT" title="Tell me what you are looking to make possible." body="Whether you are starting from scratch, improving something that already exists or connecting tools that do not currently work together, this is a good place to begin."/><section className="section container contact-layout"><div className="contact-left"><Eyebrow>PROJECT ENQUIRY</Eyebrow><h2>Let&apos;s make the next step clear.</h2><p>Share the goal, the challenge and any context you already have. I will review it and respond with the most useful next step.</p><div className="contact-method"><span>EMAIL</span><a href={"mailto:"+settings.email}>{settings.email} ↗</a></div><div className="contact-method"><span>WHATSAPP</span><a href={settings.whatsappUrl} target="_blank" rel="noreferrer">{settings.whatsappNumber} ↗</a></div><div className="contact-method"><span>FREELANCE PROFILES</span><a href="https://www.fiverr.com/timi_p1" target="_blank" rel="noreferrer">Fiverr ↗</a><a href="https://www.upwork.com/freelancers/~016b078cb44626d3a3" target="_blank" rel="noreferrer">Upwork ↗</a></div></div><Reveal className="contact-form-panel"><EnquiryForm email={settings.email}/></Reveal></section></>;
}
export default async function Page({ params }: RouteProps) {
  const route = (await params).slug?.join("/") || "";
  const allowed = ["","about","how-i-can-help","services","process","work","testimonials","faq","contact"];
  if (!allowed.includes(route)) notFound();
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