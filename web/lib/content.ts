import { createClient } from "@sanity/client";

const projectId = "a8mywjme";
const dataset = "production";
const client = createClient({ projectId, dataset, apiVersion: "2025-02-19", useCdn: true, perspective: "published" });
const cdn = (assetId: string) => "https://cdn.sanity.io/images/" + projectId + "/" + dataset + "/" + assetId;

export type Settings = {
  name: string; fullName: string; role: string; location: string; availability: string;
  email: string; whatsappNumber: string; whatsappUrl: string; heroTitle: string;
  heroDescription: string; aboutIntro: string; aboutStory: string; aboutPhilosophy: string;
  tagline: string; secondaryTagline: string; secondaryTaglineMeaning: string; portraitUrl: string;
};
export type Service = { _id: string; title: string; description: string; order?: number };
export type Project = { _id: string; title: string; category: string; summary: string; liveUrl: string; status: string; imageUrl: string };
export type ProcessStep = { _id: string; title: string; description: string; order?: number };
export type Faq = { _id: string; question: string; answer: string; order?: number };
export type Testimonial = { _id: string; quote: string; rating: number; reviewDate: string; reviewerHandle: string; reviewerLabel: string; platform: string; sourceUrl: string };

const defaults: Settings = {
  name: "Pluswrld", fullName: "Paul Oloruntobi",
  role: "AI Automation Consultant · Shopify & Digital Systems Specialist",
  location: "Nigeria · Working remotely with businesses worldwide",
  availability: "Available for selected projects", email: "timileyinpaul26@gmail.com",
  whatsappNumber: "+234 916 161 2746", whatsappUrl: "https://wa.me/2349161612746",
  heroTitle: "I build digital systems that move your business forward.",
  heroDescription: "I help businesses build, improve and connect ecommerce stores, websites, no-code applications and AI-powered workflows. Practical solutions, clearly scoped and built around the business.",
  aboutIntro: "I am a digital systems consultant working across Shopify ecommerce, web development, no-code applications and AI-driven business automation.",
  aboutStory: "My work sits at the intersection of ecommerce, digital products and business operations. I approach projects as a consultant: understand the business objective, identify the real problem, define a workable scope and then implement the right solution.",
  aboutPhilosophy: "Technology should solve a real business problem. I value clear scope, sound implementation, practical usability and honest communication.",
  tagline: "Build · Automate · Grow", secondaryTagline: "EMMPIRISISSO",
  secondaryTaglineMeaning: "Knowledge comes from sensory ideas.",
  portraitUrl: cdn("b4fa13154bf4e4fd6a2f4fee1fed00ade36bd022-1254x1254.png")
};

const projectAssets: Record<string, string> = {
  "51741e8d-461a-43be-8465-4e3dc442cc20": cdn("ba70bc4fa271bfeb5654a807ca69fdf82faf9183-1024x1536.png"),
  "04d61980-cdaf-4e6b-905c-6c3684e0adfb": cdn("8c5e318b53beafb7af5422d09f1f220b52c86d67-1840x1040.png"),
  "caabcd06-a2eb-458a-8fd9-22112edd6b87": cdn("522d7b1be6fcdc5f4f2995ad50817b1e32288fd5-1080x1080.jpg"),
  "f5cce44c-447f-4d6b-a4b7-f3aced0bc5c0": cdn("e3293b61cf118fb40e9b8724be05d7931a372f9a-3022x3698.jpg")
};

export async function getSettings(): Promise<Settings> {
  try {
    const data = await client.fetch<Partial<Settings>>('*[_type == "siteSettings"][0]{name,fullName,role,location,availability,email,whatsappNumber,whatsappUrl,heroTitle,heroDescription,aboutIntro,aboutStory,aboutPhilosophy,tagline,secondaryTagline,secondaryTaglineMeaning,"portraitUrl":portrait.asset->url}');
    return { ...defaults, ...(data ?? {}), portraitUrl: data?.portraitUrl || defaults.portraitUrl };
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
    const data = await client.fetch<Omit<Project, "imageUrl">[]>('*[_type == "project" && defined(liveUrl) && status != "Pending scope confirmation"] | order(order asc){_id,title,category,summary,liveUrl,status}');
    return (data ?? []).map((p) => ({ ...p, imageUrl: projectAssets[p._id] || "" }));
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
  try { return await client.fetch<Testimonial[]>('*[_type == "testimonial" && defined(quote)] | order(reviewDate desc){_id,quote,rating,reviewDate,reviewerHandle,reviewerLabel,platform,sourceUrl}'); }
  catch { return []; }
}