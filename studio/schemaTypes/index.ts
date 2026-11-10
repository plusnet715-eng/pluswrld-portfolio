import { defineType, defineField, defineArrayMember } from "sanity";

const heroSection = defineType({
  name: "heroSection", title: "Hero section", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "primaryLabel", title: "Primary button label", type: "string" }),
    defineField({ name: "primaryUrl", title: "Primary button URL", type: "string" }),
    defineField({ name: "secondaryLabel", title: "Secondary button label", type: "string" }),
    defineField({ name: "secondaryUrl", title: "Secondary button URL", type: "string" })
  ]
});
const textSection = defineType({
  name: "textSection", title: "Text section", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 5 })
  ]
});
const ctaSection = defineType({
  name: "ctaSection", title: "Call to action", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
    defineField({ name: "buttonUrl", title: "Button URL", type: "string" })
  ]
});
const listSection = (name: string, title: string) => defineType({
  name, title, type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "limit", title: "Items to show", type: "number" })
  ]
});
const contactSection = defineType({
  name: "contactSection", title: "Contact section", type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "body", title: "Body", type: "text", rows: 3 })
  ]
});

const siteSettings = defineType({
  name: "siteSettings", title: "Site settings", type: "document",
  fields: [
    defineField({ name: "name", title: "Brand name", type: "string" }),
    defineField({ name: "tagline", title: "Main tagline", type: "string" }),
    defineField({ name: "secondaryTagline", title: "Secondary tagline", type: "string" }),
    defineField({ name: "secondaryTaglineMeaning", title: "Secondary tagline meaning", type: "string" }),
    defineField({ name: "marketReach", title: "Client market reach", type: "string" }),
    defineField({ name: "freelancingSince", title: "Freelancing since", type: "date" }),
    defineField({ name: "firstClientDate", title: "First paid client date", type: "date" }),
    defineField({ name: "firstClientName", title: "First paid client", type: "string" }),
    defineField({ name: "fullName", title: "Full name", type: "string" }),
    defineField({ name: "role", title: "Professional role", type: "string" }),
    defineField({ name: "location", title: "Location / work region", type: "string" }),
    defineField({ name: "availability", title: "Availability", type: "string" }),
    defineField({ name: "email", title: "Contact email", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp number", type: "string" }),
    defineField({ name: "whatsappUrl", title: "WhatsApp link", type: "url" }),
    defineField({ name: "heroTitle", title: "Homepage heading", type: "string" }),
    defineField({ name: "heroDescription", title: "Homepage introduction", type: "text", rows: 4 }),
    defineField({ name: "aboutIntro", title: "About introduction", type: "text", rows: 3 }),
    defineField({ name: "aboutStory", title: "About story", type: "text", rows: 6 }),
    defineField({ name: "aboutPhilosophy", title: "Working philosophy", type: "text", rows: 4 }),
    defineField({ name: "logo", title: "Full wordmark logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "favicon", title: "Favicon mark", type: "image" }),
    defineField({ name: "portrait", title: "Enhanced portrait / Homepage feature", type: "image", options: { hotspot: true } }),
    defineField({ name: "originalPortrait", title: "Original portrait / About page", type: "image", options: { hotspot: true } })
  ]
});

const page = defineType({
  name: "page", title: "Website pages", type: "document",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "URL slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "sections", title: "Page sections", type: "array", of: [
      defineArrayMember({ type: "heroSection" }),
      defineArrayMember({ type: "textSection" }),
      defineArrayMember({ type: "servicesSection" }),
      defineArrayMember({ type: "projectsSection" }),
      defineArrayMember({ type: "processSection" }),
      defineArrayMember({ type: "faqSection" }),
      defineArrayMember({ type: "contactSection" }),
      defineArrayMember({ type: "ctaSection" }),
      defineArrayMember({ type: "testimonialsSection" })
    ] }),
    defineField({ name: "seo", title: "Search appearance", type: "object", fields: [
      defineField({ name: "title", title: "SEO title", type: "string" }),
      defineField({ name: "description", title: "SEO description", type: "text", rows: 2 })
    ] })
  ],
  preview: { select: { title: "title" } }
});

const service = defineType({
  name: "service", title: "Services", type: "document",
  fields: [
    defineField({ name: "title", title: "Service name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Description", type: "text", rows: 5 }),
    defineField({ name: "order", title: "Display order", type: "number" })
  ],
  preview: { select: { title: "title", subtitle: "description" } }
});

const project = defineType({
  name: "project", title: "Portfolio projects", type: "document",
  fields: [
    defineField({ name: "title", title: "Project / client name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "category", title: "Project category", type: "string" }),
    defineField({ name: "summary", title: "Short summary", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Case-study details", type: "text", rows: 6 }),
    defineField({ name: "liveUrl", title: "Live website URL", type: "url" }),
    defineField({ name: "status", title: "Project status", type: "string", options: { list: ["Completed client project", "Confirmed client project", "Active client project", "Pending scope confirmation"] } }),
    defineField({ name: "mainImage", title: "Main project image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featuredImage", title: "Featured image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number" })
  ],
  preview: { select: { title: "title", subtitle: "category", media: "mainImage" } }
});

const processStep = defineType({
  name: "processStep", title: "Process steps", type: "document",
  fields: [
    defineField({ name: "title", title: "Step title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Display order", type: "number" })
  ],
  preview: { select: { title: "title", subtitle: "description" } }
});

const faq = defineType({
  name: "faq", title: "Frequently asked questions", type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Answer", type: "text", rows: 5 }),
    defineField({ name: "order", title: "Display order", type: "number" })
  ],
  preview: { select: { title: "question", subtitle: "answer" } }
});

const onlinePresence = defineType({
  name: "onlinePresence", title: "Online presence & profiles", type: "document",
  fields: [
    defineField({ name: "name", title: "Platform / profile name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", title: "Profile URL", type: "url" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "enabled", title: "Show publicly", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display order", type: "number" })
  ],
  preview: { select: { title: "name", subtitle: "url" } }
});

const testimonial = defineType({
  name: "testimonial", title: "Client testimonials", type: "document",
  fields: [
    defineField({ name: "quote", title: "Original review wording", type: "text", rows: 6, validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Star rating", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "reviewerLabel", title: "Public attribution", type: "string" }),
    defineField({ name: "reviewerHandle", title: "Buyer handle / name as shown", type: "string" }),
    defineField({ name: "platform", title: "Source platform", type: "string" }),
    defineField({ name: "sourceUrl", title: "Source URL", type: "url" }),
    defineField({ name: "sourceLabel", title: "Source link label", type: "string" }),
    defineField({ name: "sourceDocument", title: "Original review source document", type: "file" }),
    defineField({ name: "reviewDate", title: "Review date", type: "date" }),
    defineField({ name: "reviewDateLabel", title: "Display date", type: "string", description: "Use month and year when the exact day was not supplied." }),
    defineField({ name: "reviewerCountry", title: "Buyer country", type: "string" }),
    defineField({ name: "repeatClient", title: "Repeat client", type: "boolean", initialValue: false }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false })
  ],
  preview: { select: { title: "reviewerHandle", subtitle: "platform" } }
});

export const schemaTypes = [
  siteSettings, page, service, project, processStep, faq, onlinePresence, testimonial,
  heroSection, textSection, ctaSection, contactSection,
  listSection("servicesSection", "Services listing"),
  listSection("projectsSection", "Projects listing"),
  listSection("processSection", "Process listing"),
  listSection("faqSection", "FAQ listing"),
  listSection("testimonialsSection", "Testimonials listing")
];