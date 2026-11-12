import { createClient } from "@sanity/client";

const projectId = "a8mywjme";
const dataset = "production";
const client = createClient({ projectId, dataset, apiVersion: "2025-02-19", useCdn: true, perspective: "published" });
const cdn = (assetId: string) => "https://cdn.sanity.io/images/" + projectId + "/" + dataset + "/" + assetId;

export type Settings = {
  name: string; fullName: string; role: string; location: string; marketReach: string; availability: string;
  email: string; whatsappNumber: string; whatsappUrl: string; logoUrl: string; heroTitle: string;
  heroDescription: string; aboutIntro: string; aboutStory: string; aboutPhilosophy: string;
  tagline: string; secondaryTagline: string; secondaryTaglineMeaning: string; portraitUrl: string; originalPortraitUrl: string;
};
export type Service = { _id: string; title: string; description: string; order?: number };
export type Project = { _id: string; title: string; category: string; summary: string; liveUrl?: string; status: string; imageUrl: string };
export type ProcessStep = { _id: string; title: string; description: string; order?: number };
export type Faq = { _id: string; question: string; answer: string; order?: number };
export type Testimonial = { _id: string; quote: string; rating: number; reviewDate: string; reviewDateLabel?: string; reviewerHandle: string; reviewerLabel: string; reviewerCountry?: string; platform: string; sourceUrl?: string; sourceLabel?: string; featured?: boolean; repeatClient?: boolean };
export type PresenceLink = { _id: string; name: string; url: string; order?: number };

const defaults: Settings = {
  name: "Pluswrld", fullName: "Paul Oloruntobi",
  role: "Digital Builder & Growth Systems Specialist",
  location: "", marketReach: "Worldwide",
  availability: "Available for selected projects", email: "timileyinpaul26@gmail.com",
  whatsappNumber: "+234 916 161 2746", whatsappUrl: "https://wa.me/2349161612746",
  heroTitle: "I build digital systems that move your business forward.",
  heroDescription: "I design, build and improve Shopify stores, websites, no-code applications and AI-powered workflows. I also help businesses strengthen their visibility across social media and search engines—with practical digital solutions built around real business goals.",
  aboutIntro: "I’m Paul Oloruntobi, the face behind Pluswrld. I work at the intersection of business, customer experience and technology—helping businesses turn ideas and operational challenges into practical digital solutions. My work spans ecommerce, websites and no-code applications, creator-commerce platforms, and AI-powered workflows. I’m interested in what the technology makes possible, how well people can use it, and whether it genuinely supports the business behind it.",
  aboutStory: "Most projects begin with a gap between what a business wants to do and what its current tools allow it to do. A store may be difficult to navigate or manage. A service business may have too many manual steps. A creator may need a better way to present offers, manage memberships or give customers access. I enjoy understanding those situations and working out a practical way forward.\n\nThat perspective shapes the range of my work. In ecommerce, I build and improve Shopify stores, including theme customisation, redesign, product and variant organisation, product-page usability and the operational details owners work with every day. I also build websites and no-code applications, and help structure digital products, memberships and communities through platforms such as Whop, Skool and Discord. Where repetitive processes or disconnected tools slow things down, I look at workflow automation and integrations—including AI where it genuinely helps.\n\nWhat ties these areas together is not a particular tool. It is the goal of making a system clearer for the people using it and more useful for the business running it.",
  aboutPhilosophy: "I start with the business question: what needs to happen, who needs to use the system, and what is currently getting in the way? That gives us a basis for choosing the right platform and agreeing on a realistic scope.\n\nFrom there, I care about the details—how a customer moves through a store, how a user finds their way around an app, how information is organised, and how connected tools behave together. I prefer to keep the solution as simple as it can be while still doing the job properly.\n\nGood delivery also includes communication, testing and a clear handover. The system should make sense after the build, not just look finished on launch day.",
  tagline: "Build • Automate • Grow", secondaryTagline: "Knowledge comes from sensory ideas", logoUrl: "",
  secondaryTaglineMeaning: "",
  portraitUrl: cdn("b4fa13154bf4e4fd6a2f4fee1fed00ade36bd022-1254x1254.png"),
  originalPortraitUrl: ""
};

function normalizeCmsText(value: string | undefined | null): string {
  return (value || "")
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\n")
    .replace(/\r\n?/g, "\n");
}

function normalizeObjectStrings<T extends object>(record: T): T {
  const normalized = { ...record } as unknown as Record<string, unknown>;
  for (const [key, value] of Object.entries(normalized)) {
    if (typeof value === "string") normalized[key] = normalizeCmsText(value);
  }
  return normalized as unknown as T;
}

const projectAssets: Record<string, string> = {
  "51741e8d-461a-43be-8465-4e3dc442cc20": cdn("ba70bc4fa271bfeb5654a807ca69fdf82faf9183-1024x1536.png"),
  "04d61980-cdaf-4e6b-905c-6c3684e0adfb": cdn("8c5e318b53beafb7af5422d09f1f220b52c86d67-1840x1040.png"),
  "caabcd06-a2eb-458a-8fd9-22112edd6b87": cdn("522d7b1be6fcdc5f4f2995ad50817b1e32288fd5-1080x1080.jpg"),
  "f5cce44c-447f-4d6b-a4b7-f3aced0bc5c0": cdn("e3293b61cf118fb40e9b8724be05d7931a372f9a-3022x3698.jpg"),
  "pluswrld-project-whiskerwise": "https://www.whiskerwise.com.co/cdn/shop/files/whiskerwise_banner_1.png?v=1759926608&width=3840",
  "c25caa1f-4d7d-4db1-a5ca-8439fa456d52": "/soulvibevault-project.svg"
};

export async function getSettings(): Promise<Settings> {
  try {
    const data = await client.fetch<Partial<Settings>>('*[_type == "siteSettings"][0]{name,fullName,role,location,marketReach,availability,email,whatsappNumber,whatsappUrl,heroTitle,heroDescription,aboutIntro,aboutStory,aboutPhilosophy,tagline,secondaryTagline,secondaryTaglineMeaning,"logoUrl":logo.asset->url,"portraitUrl":portrait.asset->url,"originalPortraitUrl":originalPortrait.asset->url}');
    const normalized = data ? normalizeObjectStrings(data) : null;
    return { ...defaults, ...(normalized ?? {}), logoUrl: normalized?.logoUrl || defaults.logoUrl, portraitUrl: normalized?.portraitUrl || defaults.portraitUrl, originalPortraitUrl: normalized?.originalPortraitUrl || defaults.originalPortraitUrl };
  } catch { return defaults; }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[]>('*[_type == "service"] | order(order asc){_id,title,description,order}');
    if (data?.length) return data.map(normalizeObjectStrings);
  } catch {}
  return [
    { _id: "shopify", title: "Shopify & Ecommerce Systems", description: "Build, redesign and improve Shopify stores, product experiences and connected ecommerce operations." },
    { _id: "web", title: "Websites & No-Code Applications", description: "Design and build useful digital experiences, websites, customer portals and no-code applications." },
    { _id: "automation", title: "AI & Business Automation", description: "Map workflows, connect business tools and simplify repeatable processes with carefully scoped automation." }
  ];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch<(Omit<Project, "imageUrl"> & { cmsImageUrl?: string })[]>('*[_type == "project" && status != "Pending scope confirmation"] | order(order asc){_id,title,category,summary,liveUrl,status,"cmsImageUrl":coalesce(coverImage.asset->url,mainImage.asset->url)}');
    return (data ?? []).map((item) => { const p = normalizeObjectStrings(item); return { ...p, imageUrl: projectAssets[p._id] || p.cmsImageUrl || "" }; });
  } catch { return []; }
}

export async function getProcess(): Promise<ProcessStep[]> {
  try { const data = await client.fetch<ProcessStep[]>('*[_type == "processStep"] | order(order asc){_id,title,description,order}'); return (data ?? []).map(normalizeObjectStrings); }
  catch { return []; }
}
export async function getFaqs(): Promise<Faq[]> {
  try { const data = await client.fetch<Faq[]>('*[_type == "faq"] | order(order asc){_id,question,answer,order}'); return (data ?? []).map(normalizeObjectStrings); }
  catch { return []; }
}
export async function getTestimonials(): Promise<Testimonial[]> {
  try { const data = await client.fetch<Testimonial[]>('*[_type == "testimonial" && defined(quote)] | order(reviewDate desc){_id,quote,rating,reviewDate,reviewDateLabel,reviewerHandle,reviewerLabel,reviewerCountry,platform,sourceUrl,sourceLabel,featured,repeatClient}'); return (data ?? []).map(normalizeObjectStrings); }
  catch { return []; }
}


export async function getSocialLinks(): Promise<PresenceLink[]> {
  try {
    return await client.fetch<PresenceLink[]>(
      '*[_type == "onlinePresence" && defined(url) && enabled == true && name in ["Instagram","Facebook","TikTok","LinkedIn","Threads"]] | order(order asc){_id,name,url,order}'
    );
  } catch { return []; }
}

export async function getPresenceLinks(): Promise<PresenceLink[]> {
  try {
    return await client.fetch<PresenceLink[]>(
      '*[_type == "onlinePresence" && defined(url) && name in ["Fiverr profile","Upwork profile","Instagram","Facebook","TikTok","LinkedIn","Threads","WhatsApp"] && (enabled != false)] | order(order asc){_id,name,url,order}'
    );
  } catch {
    return [
      { _id: "fiverr", name: "Fiverr profile", url: "https://www.fiverr.com/timi_p1", order: 1 },
      { _id: "upwork", name: "Upwork profile", url: "https://www.upwork.com/freelancers/~016b078cb44626d3a3", order: 6 },
      { _id: "whatsapp", name: "WhatsApp", url: "https://wa.me/2349161612746", order: 7 }
    ];
  }
}
