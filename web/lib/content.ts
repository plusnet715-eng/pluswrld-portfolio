import { createClient } from "@sanity/client";
import { cache } from "react";

const projectId = "a8mywjme";
const dataset = "production";
const client = createClient({ projectId, dataset, apiVersion: "2025-02-19", useCdn: true, perspective: "published" });
const cdn = (assetId: string) => "https://cdn.sanity.io/images/" + projectId + "/" + dataset + "/" + assetId;

export type Settings = {
  name: string; fullName: string; role: string; location: string; marketReach: string; availability: string;
  email: string; whatsappNumber: string; whatsappUrl: string; logoUrl: string; logoDarkUrl: string; heroTitle: string;
  heroDescription: string; aboutIntro: string; aboutStory: string; aboutPhilosophy: string;
  tagline: string; secondaryTagline: string; secondaryTaglineMeaning: string; portraitUrl: string; originalPortraitUrl: string;
};
export type Service = { _id: string; title: string; description: string; order?: number };
export type Project = { _id: string; title: string; category: string; summary: string; liveUrl?: string; status: string; imageUrl: string };
export type ProcessStep = { _id: string; title: string; description: string; order?: number };
export type Faq = { _id: string; question: string; answer: string; order?: number };
export type Testimonial = { _id: string; quote: string; rating: number; reviewDate: string; reviewDateLabel?: string; reviewerHandle: string; reviewerLabel: string; reviewerCountry?: string; platform: string; sourceUrl?: string; sourceLabel?: string; featured?: boolean; repeatClient?: boolean };
export type PresenceLink = { _id: string; name: string; url: string; order?: number; enabled?: boolean };

const defaults: Settings = {
  name: "Pluswrld", fullName: "Paul Oloruntobi",
  role: "Digital Builder | Ecommerce, Automation & Visibility",
  location: "", marketReach: "Worldwide",
  availability: "Available for selected projects", email: "timileyinpaul26@gmail.com",
  whatsappNumber: "+234 916 161 2746", whatsappUrl: "https://wa.me/2349161612746",
  heroTitle: "I build the digital side of your business.",
  heroDescription: "From Shopify stores and business websites to no-code applications, AI automation and connected digital systems, I turn ideas and disconnected tools into practical experiences that work together. I also help creators and businesses build the storefronts, memberships and online communities around their offers.",
  aboutIntro: "I’m Paul Oloruntobi, the digital builder behind Pluswrld. I build and improve Shopify stores, websites, no-code applications and business automations. I also manage paid advertising campaigns, helping businesses reach relevant audiences, bring qualified traffic to their offers and make better use of their marketing budgets.",
  aboutStory: "I’m a hands-on builder. I take time to understand what a business needs, then help plan and implement a practical solution. That might be a Shopify store, a website, a no-code application, a membership setup, an automation that connects tools or a paid advertising campaign built around a clear business objective.\n\nI pay attention to how the finished system works for real people: how customers move through a store, how products and information are organised, how a team manages the setup and what happens after launch. For advertising projects, I look at the offer, audience, campaign structure, budget, tracking and performance so the work is guided by the business goal rather than clicks alone.\n\nI also help businesses become more discoverable through website SEO, social profile optimisation, social-commerce connections and paid campaigns. The aim is to connect the right foundations with a practical route to reach potential customers.",
  aboutPhilosophy: "I want every project to be useful for the business and clear for the people using it. I start with the goal, choose tools and channels that fit the job and keep the experience straightforward.\n\nFor paid advertising, that means agreeing on the objective, audience, budget, creative requirements, tracking and reporting before launch. I monitor performance and make optimisation decisions against the agreed goals, while keeping advertising spend and third-party costs separate from my service fee.\n\nI stay involved from planning through implementation, testing and handover. I communicate clearly, check the important journeys and explain what has been delivered so you can move forward with confidence.",
  tagline: "Build • Automate • Grow", secondaryTagline: "Knowledge comes from sensory ideas", logoUrl: "/pluswrld-logo.svg", logoDarkUrl: "/pluswrld-logo-dark.svg",
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
  "pluswrld-project-whiskerwise": "https://www.whiskerwise.com.co/cdn/shop/files/e6290b16-ff40-479d-ac98-c11544ecd517.jpg?v=1763041494&width=1000",
  "c25caa1f-4d7d-4db1-a5ca-8439fa456d52": "/soulvibevault-project.svg"
};

export const getSettings = cache(async (): Promise<Settings> => {
  try {
    const data = await client.fetch<Partial<Settings>>('*[_type == "siteSettings"][0]{name,fullName,role,location,marketReach,availability,email,whatsappNumber,whatsappUrl,heroTitle,heroDescription,aboutIntro,aboutStory,aboutPhilosophy,tagline,secondaryTagline,secondaryTaglineMeaning,"portraitUrl":portrait.asset->url,"originalPortraitUrl":originalPortrait.asset->url}');
    const normalized = data ? normalizeObjectStrings(data) : null;
    return { ...defaults, ...(normalized ?? {}), logoUrl: defaults.logoUrl, logoDarkUrl: defaults.logoDarkUrl, portraitUrl: normalized?.portraitUrl || defaults.portraitUrl, originalPortraitUrl: normalized?.originalPortraitUrl || defaults.originalPortraitUrl };
  } catch { return defaults; }
});

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[]>('*[_type == "service"] | order(order asc){_id,title,description,order}');
    if (data?.length) return data.map(normalizeObjectStrings);
  } catch {}
  return [
    { _id: "shopify", title: "Shopify & Ecommerce Systems", description: "Build, redesign and improve Shopify stores, product experiences and connected ecommerce operations." },
    { _id: "web", title: "Websites & No-Code Applications", description: "Design and build useful digital experiences, websites, customer portals and no-code applications." },
    { _id: "automation", title: "AI & Business Automation", description: "Map workflows, connect business tools and simplify repeatable processes with carefully scoped automation." },
    { _id: "advertising", title: "Paid Advertising Campaign Management", description: "Plan, launch, manage and optimise paid advertising campaigns around your offer, target audience and business objectives, with clear tracking and performance reporting." }
  ];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await client.fetch<(Omit<Project, "imageUrl"> & { cmsImageUrl?: string })[]>('*[_type == "project" && status != "Pending scope confirmation"] | order(order asc){_id,title,category,summary,liveUrl,status,"cmsImageUrl":coalesce(coverImage.asset->url,mainImage.asset->url)}');
    return (data ?? []).map((item) => { const p = normalizeObjectStrings(item); return { ...p, imageUrl: p.cmsImageUrl || projectAssets[p._id] || "" }; });
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
  try { const data = await client.fetch<Testimonial[]>('*[_type == "testimonial" && defined(quote)] | order((reviewerHandle == "edison_tim") desc, rating desc, reviewDate desc){_id,quote,rating,reviewDate,reviewDateLabel,reviewerHandle,reviewerLabel,reviewerCountry,platform,sourceUrl,sourceLabel,featured,repeatClient}'); return (data ?? []).map(normalizeObjectStrings); }
  catch { return []; }
}


export const getSocialLinks = cache(async (): Promise<PresenceLink[]> => {
  const links = await getPresenceLinks();
  return links.filter((link) =>
    link.enabled === true && ["Instagram", "Facebook", "TikTok", "LinkedIn", "Threads", "WhatsApp", "X", "Twitter"].includes(link.name)
  );
});

export const getPresenceLinks = cache(async (): Promise<PresenceLink[]> => {
  try {
    return await client.fetch<PresenceLink[]>(
      '*[_type == "onlinePresence" && defined(url) && name in ["Fiverr profile","Upwork profile","Instagram","Facebook","TikTok","LinkedIn","Threads","WhatsApp","X","Twitter"] && (enabled != false)] | order(order asc){_id,name,url,order,enabled}'
    );
  } catch {
    return [
      { _id: "fiverr", name: "Fiverr profile", url: "https://www.fiverr.com/timi_p1", order: 1 },
      { _id: "upwork", name: "Upwork profile", url: "https://www.upwork.com/freelancers/~016b078cb44626d3a3", order: 6 },
      { _id: "whatsapp", name: "WhatsApp", url: "https://wa.me/2349161612746", order: 7 }
    ];
  }
});
