import { createClient } from "@sanity/client";

const projectId = "a8mywjme";
const dataset = "production";
const client = createClient({ projectId, dataset, apiVersion: "2025-02-19", useCdn: true, perspective: "published" });
const cdn = (assetId: string) => "https://cdn.sanity.io/images/" + projectId + "/" + dataset + "/" + assetId;

export type Settings = {
  name: string; fullName: string; role: string; location: string; marketReach: string; availability: string;
  email: string; whatsappNumber: string; whatsappUrl: string; heroTitle: string;
  heroDescription: string; aboutIntro: string; aboutStory: string; aboutPhilosophy: string;
  tagline: string; secondaryTagline: string; secondaryTaglineMeaning: string; portraitUrl: string; originalPortraitUrl: string; freelancingSince: string; firstClientDate: string; firstClientName: string;
};
export type Service = { _id: string; title: string; description: string; order?: number };
export type Project = { _id: string; title: string; category: string; summary: string; liveUrl?: string; status: string; imageUrl: string };
export type ProcessStep = { _id: string; title: string; description: string; order?: number };
export type Faq = { _id: string; question: string; answer: string; order?: number };
export type Testimonial = { _id: string; quote: string; rating: number; reviewDate: string; reviewDateLabel?: string; reviewerHandle: string; reviewerLabel: string; reviewerCountry?: string; platform: string; sourceUrl?: string; sourceLabel?: string; featured?: boolean; repeatClient?: boolean };
export type PresenceLink = { _id: string; name: string; url: string; order?: number };

const defaults: Settings = {
  name: "Pluswrld", fullName: "Paul Oloruntobi",
  role: "AI Automation Consultant · Shopify & Digital Systems Specialist",
  location: "", marketReach: "Worldwide",
  availability: "Available for selected projects", email: "timileyinpaul26@gmail.com",
  whatsappNumber: "+234 916 161 2746", whatsappUrl: "https://wa.me/2349161612746",
  heroTitle: "I build digital systems that move your business forward.",
  heroDescription: "I help businesses build, improve and connect ecommerce stores, websites, no-code applications and AI-powered workflows. Practical solutions, clearly scoped and built around the business.",
  aboutIntro: "I’m Paul Oloruntobi, the consultant behind Pluswrld. I help businesses make their digital storefronts, websites and connected workflows work better for the people who use them.",
  aboutStory: "My client work has included Shopify storefront builds and redesigns, a WooCommerce-to-Shopify migration, product catalogue and variant management, SKU setup, product-page usability improvements and connected digital workflows. I work across the business goal and the technical details, so the finished system is not just online — it is practical to operate and clear for customers to use.",
  aboutPhilosophy: "I start by understanding the problem, not by pushing a particular tool. I value clear scope, thoughtful implementation, practical usability and honest communication. I would rather recommend a simpler system that works than add complexity that the business does not need.",
  tagline: "Build • Automate • Grow", secondaryTagline: "Knowledge comes from sensory ideas",
  secondaryTaglineMeaning: "",
  freelancingSince: "2025-05-01", firstClientDate: "2025-06-01", firstClientName: "Ricardo Stewart",
  originalPortraitUrl: "",
  portraitUrl: cdn("b4fa13154bf4e4fd6a2f4fee1fed00ade36bd022-1254x1254.png")
};

const projectAssets: Record<string, string> = {
  "51741e8d-461a-43be-8465-4e3dc442cc20": cdn("ba70bc4fa271bfeb5654a807ca69fdf82faf9183-1024x1536.png"),
  "04d61980-cdaf-4e6b-905c-6c3684e0adfb": cdn("8c5e318b53beafb7af5422d09f1f220b52c86d67-1840x1040.png"),
  "caabcd06-a2eb-458a-8fd9-22112edd6b87": cdn("522d7b1be6fcdc5f4f2995ad50817b1e32288fd5-1080x1080.jpg"),
  "f5cce44c-447f-4d6b-a4b7-f3aced0bc5c0": cdn("e3293b61cf118fb40e9b8724be05d7931a372f9a-3022x3698.jpg"),
  "pluswrld-project-whiskerwise": "https://www.whiskerwise.com.co/cdn/shop/files/b37e7d00-2179-4064-b4ac-e9b0c84ded82.jpg?v=1763041293&width=533",
  "c25caa1f-4d7d-4db1-a5ca-8439fa456d52": "/soulvibevault-project.svg"
};

export async function getSettings(): Promise<Settings> {
  try {
    const data = await client.fetch<Partial<Settings>>('*[_type == "siteSettings"][0]{name,fullName,role,location,marketReach,freelancingSince,firstClientDate,firstClientName,availability,email,whatsappNumber,whatsappUrl,heroTitle,heroDescription,aboutIntro,aboutStory,aboutPhilosophy,tagline,secondaryTagline,secondaryTaglineMeaning,"portraitUrl":portrait.asset->url,"originalPortraitUrl":originalPortrait.asset->url}');
    return { ...defaults, ...(data ?? {}), portraitUrl: data?.portraitUrl || defaults.portraitUrl, originalPortraitUrl: data?.originalPortraitUrl || defaults.originalPortraitUrl };
  } catch { return defaults; }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await client.fetch<Service[]>('*[_type == "service"] | order(order asc){_id,title,description,order}');
    if (data?.length) return data;
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
    return (data ?? []).map((p) => ({ ...p, imageUrl: projectAssets[p._id] || p.cmsImageUrl || "" }));
  } catch { return []; }
}

export async function getProcess(): Promise<ProcessStep[]> {
  try { return await client.fetch<ProcessStep[]>('*[_type == "processStep"] | order(order asc){_id,title,description,order}'); }
  catch { return []; }
}
export async function getFaqs(): Promise<Faq[]> {
  try { return await client.fetch<Faq[]>('*[_type == "faq"] | order(order asc){_id,question,answer,order}'); }
  catch { return []; }
}
export async function getTestimonials(): Promise<Testimonial[]> {
  try { return await client.fetch<Testimonial[]>('*[_type == "testimonial" && defined(quote)] | order(reviewDate desc){_id,quote,rating,reviewDate,reviewDateLabel,reviewerHandle,reviewerLabel,reviewerCountry,platform,sourceUrl,sourceLabel,featured,repeatClient}'); }
  catch { return []; }
}

export async function getPresenceLinks(): Promise<PresenceLink[]> {
  try {
    return await client.fetch<PresenceLink[]>(
      '*[_type == "onlinePresence" && defined(url) && name in ["Fiverr profile","Upwork profile","Instagram","LinkedIn","Facebook","Threads","WhatsApp"] && (enabled != false)] | order(order asc){_id,name,url,order}'
    );
  } catch {
    return [
      { _id: "fiverr", name: "Fiverr profile", url: "https://www.fiverr.com/timi_p1", order: 1 },
      { _id: "upwork", name: "Upwork profile", url: "https://www.upwork.com/freelancers/~016b078cb44626d3a3", order: 6 },
      { _id: "whatsapp", name: "WhatsApp", url: "https://wa.me/2349161612746", order: 7 }
    ];
  }
}
