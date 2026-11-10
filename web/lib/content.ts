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
  role: "Digital Systems Consultant",
  location: "", marketReach: "Worldwide",
  availability: "Available for selected projects", email: "timileyinpaul26@gmail.com",
  whatsappNumber: "+234 916 161 2746", whatsappUrl: "https://wa.me/2349161612746",
  heroTitle: "I build digital systems that move your business forward.",
  heroDescription: "I help businesses build, improve and connect ecommerce stores, websites, no-code applications and AI-powered workflows. Practical solutions, clearly scoped and built around the business.",
  aboutIntro: "I’m Paul Oloruntobi, the person behind Pluswrld. I work where business needs meet digital solutions—understanding what needs to happen, then shaping the tools and workflows to make it happen. My work spans ecommerce, websites and no-code applications, creator platforms, and AI-powered automation. Across all of it, the focus is the same: make technology useful, well-structured, and easier to work with.",
  aboutStory: "I enjoy getting beneath the surface of a project. Before choosing a platform or starting a build, I want to understand the business, the people who will use the system, what needs to happen, and where the friction is. That context shapes the solution.",
  aboutPhilosophy: "I value clear thinking, useful design, and careful execution. I ask the questions that make the scope clearer, pay attention to the details people interact with, and build with a clean handover in mind. The goal is not to add technology for its own sake; it is to make the business easier to run and the experience easier to use.",
  tagline: "Build • Automate • Grow", secondaryTagline: "Knowledge comes from sensory ideas", logoUrl: "https://cdn.sanity.io/images/a8mywjme/production/98cba91b62b71c2bb3eef1129af6b63b7fab9095-1087x204.png",
  secondaryTaglineMeaning: "",
  portraitUrl: cdn("b4fa13154bf4e4fd6a2f4fee1fed00ade36bd022-1254x1254.png"),
  originalPortraitUrl: ""
};

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
    return { ...defaults, ...(data ?? {}), logoUrl: data?.logoUrl || defaults.logoUrl, portraitUrl: data?.portraitUrl || defaults.portraitUrl, originalPortraitUrl: data?.originalPortraitUrl || defaults.originalPortraitUrl };
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
