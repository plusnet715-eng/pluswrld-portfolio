import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { runInNewContext } from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const read = (path) => readFileSync(resolve(here, "..", path), "utf8");
const page = read("app/[[...slug]]/page.tsx");
const aboutStart = page.indexOf("async function About");
const aboutEnd = page.indexOf("function Help", aboutStart);
const about = page.slice(aboutStart, aboutEnd);
const chrome = read("components/site-chrome.tsx");
const css = read("app/globals.css");
const content = read("lib/content.ts");
const layout = read("app/layout.tsx");
const schema = readFileSync(resolve(here, "../../studio/schemaTypes/index.ts"), "utf8");
const projectCard = read("components/project-card.tsx");

test("About page presents a scannable builder profile without duplicating the project gallery", () => {
  assert.match(about, /INTRODUCTION/);
  assert.match(about, /I build digital experiences that help businesses grow\./);
  assert.match(about, /I stay involved from the first idea to the working solution\./);
  assert.match(about, /MEET THE BUILDER/);
  assert.match(about, /Ecommerce stores/);
  assert.match(about, /Websites and no-code apps/);
  assert.match(about, /Memberships and communities/);
  assert.match(about, /Connected business workflows/);
  assert.match(about, /WHO I WORK WITH/);
  assert.match(about, /SEARCH & SOCIAL VISIBILITY/);
  assert.match(about, /WHAT GOOD DELIVERY LOOKS LIKE/);
  const order = ["INTRODUCTION", "MEET THE BUILDER", "WHAT I BUILD", "WHO I WORK WITH", "SEARCH & SOCIAL VISIBILITY", "HOW I WORK", "WHAT GOOD DELIVERY LOOKS LIKE", "PAST WORK"];
  const positions = order.map((label) => about.indexOf(label));
  assert.ok(positions.every((position) => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(about, /Explore my past work/);
  assert.doesNotMatch(about, /MY PROFESSIONAL JOURNEY|careerMilestones|careerStart|firstProjectDate|projects\.map|ProjectCard/);
});

test("Explore dropdown closes from state and supports Escape and outside clicks", () => {
  assert.match(chrome, /setExploreOpen\(false\)/);
  assert.match(chrome, /Escape/);
  assert.match(chrome, /pointerdown/);
  assert.doesNotMatch(css, /\.nav-dropdown:focus-within \.nav-dropdown-panel/);
});

test("Selected work cards do not render client project status badges", () => {
  assert.doesNotMatch(projectCard, /project-status|isActive|Ongoing|Client project/);
});

test("Ecommerce and social commerce lists Microsoft but not Bing", () => {
  const start = page.indexOf('title: "Ecommerce, search & social commerce"');
  const end = page.indexOf('title: "Websites & no-code"', start);
  const group = page.slice(start, end);
  assert.match(group, /name:"Microsoft"/);
  assert.match(group, /src:"\/platform\/microsoft\.svg"/);
  assert.doesNotMatch(group, /Bing/);
});

test("CTA label is dark green while the existing band container stays unchanged", () => {
  assert.match(css, /\.cta-band \.eyebrow\s*\{[^}]*color:#0b3d1b/i);
  assert.match(css, /\.cta-band\{[^}]*background:linear-gradient\(110deg,#0b2b16,#0a401c 52%,#087329\)/i);
});
test("Header and footer use the approved local vector wordmarks", () => {
  assert.match(chrome, /settings\.logoUrl/);
  assert.match(chrome, /brand-image-lockup/);
  assert.match(content, /logoUrl: defaults\.logoUrl, logoDarkUrl: defaults\.logoDarkUrl/);
  assert.match(schema, /name: "logoDark"/);
  assert.match(schema, /name: "logoDark"/);
});

test("About social icons link only to approved profiles with valid URLs", () => {
  assert.match(content, /link.enabled === true && \["Instagram", "Facebook", "TikTok", "LinkedIn", "Threads", "WhatsApp", "X", "Twitter"\].includes\(link.name\)/);
  assert.match(content, /name in \["Fiverr profile","Upwork profile","Instagram","Facebook","TikTok","LinkedIn","Threads","WhatsApp","X","Twitter"\]/);
  assert.match(page, /AboutSocialLinks links=\{socialLinks\}/);
  assert.match(page, /cdn\.simpleicons\.org/);
});

test("Old unapproved logo is not used as a default fallback", () => {
  assert.match(content, /logoUrl: "\/pluswrld-logo\.svg", logoDarkUrl: "\/pluswrld-logo-dark\.svg"/);
  assert.doesNotMatch(content, /98cba91b62b71c2bb3eef1129af6b63b7fab9095/);
});

test("Pluswrld positioning presents Paul as a digital builder with search and social visibility work", () => {
  assert.match(page, /eyebrow="INTRODUCTION"/);
  assert.match(content, /I’m Paul Oloruntobi, a digital builder working under the name Pluswrld/);
  assert.match(layout, /lang="en-NG"/);
  assert.match(page, /<span>\{settings\.role\}<\/span>/);
  assert.match(content, /role: "Digital Builder \\| Ecommerce, Automation & Visibility"/);
  assert.match(content, /I’m Paul Oloruntobi, a digital builder working under the name Pluswrld/);
});
test("Approved vector logo has separate palettes for light and dark themes", () => {
  assert.match(chrome, /src=\{settings\.logoUrl \|\| "\/pluswrld-logo\.svg"\}/);
  assert.match(chrome, /src=\{settings\.logoDarkUrl \|\| "\/pluswrld-logo-dark\.svg"\}/);
  assert.match(chrome, /appearance="dark"/);
  assert.match(chrome, /brand-logo-footer-fixed/);
  assert.match(chrome, /width=\{1932\} height=\{814\}/);
  assert.match(content, /logoUrl: "\/pluswrld-logo\.svg", logoDarkUrl: "\/pluswrld-logo-dark\.svg"/);
  assert.match(css, /:root\[data-theme="dark"\] \.brand-logo-light/);
  assert.match(css, /:root\[data-theme="dark"\] \.brand-logo-dark/);
  assert.match(css, /brand-logo-footer-fixed/);
  assert.match(schema, /Full wordmark logo — light theme/);
  assert.match(schema, /Full wordmark logo — dark theme/);
  assert.match(read("public/pluswrld-logo.svg"), /stop-color="#36bd2d"/);
  assert.match(read("public/pluswrld-logo-dark.svg"), /stop-color="#c3f35a"/);
});


test("About page is split into concise visitor-led sections", () => {
  assert.match(about, /WHAT I BUILD/);
  assert.match(about, /WHO I WORK WITH/);
  assert.match(about, /SEARCH & SOCIAL VISIBILITY/);
  assert.match(about, /HOW I WORK/);
  assert.match(about, /WHAT GOOD DELIVERY LOOKS LIKE/);
  assert.doesNotMatch(about, /THE THINKING BEHIND THE WORK|principle-block|profile-facts/);
});

test("Social profile icons use original brand colours and LinkedIn renders locally", () => {
  assert.match(page, /icon\.slug === "linkedin"/);
  assert.match(page, /className="social-link-icon-linkedin"/);
  assert.match(page, /<path fill="#0A66C2"/);
  assert.match(page, /cdn\.simpleicons\.org/);
  assert.match(page, /colour: "E4405F"/);
  assert.match(page, /colour: "0866FF"/);
  assert.match(page, /colour: "0A66C2"/);
  assert.match(css, /width:18px!important;height:18px!important/);
  assert.match(css, /background:#fff/);
  assert.match(css, /:root\[data-theme="dark"\] \.about-social-links \.social-link/);
  assert.match(css, /filter:none!important/);
});

test("CMS text normaliser converts escaped newline sequences into paragraph breaks", () => {
  const match = content.match(/function normalizeCmsText\(value: string \| undefined \| null\): string \{[\s\S]*?\n\}/);
  assert.ok(match, "normalizer function is present");
  const executable = match[0].replace("value: string | undefined | null", "value").replace("): string {", ") {");
  const normalizeCmsText = runInNewContext("(" + executable + ")");
  assert.equal(normalizeCmsText("First\\n\\nSecond"), "First\n\nSecond");
  assert.equal(normalizeCmsText("First\r\n\r\nSecond"), "First\n\nSecond");
  assert.match(content, /function normalizeObjectStrings/);
  assert.match(page, /function TextParagraphs/);
  assert.match(page, /TextParagraphs text=\{item\.answer\}/);
});


test("WhiskerWise selected-work card uses its current official store image", () => {
  assert.match(content, /"pluswrld-project-whiskerwise": "https:\/\/www\.whiskerwise\.com\.co\/cdn\/shop\/files\/e6290b16-ff40-479d-ac98-c11544ecd517\.jpg\?v=1763041494&width=1000"/);
});

test("CMS-uploaded project imagery overrides legacy static project images", () => {
  assert.match(content, /imageUrl: p\.cmsImageUrl \|\| projectAssets\[p\._id\] \|\| ""/);
});

test("Both Pluswrld theme logos are transparent vector assets", () => {
  const light = read("public/pluswrld-logo.svg");
  const dark = read("public/pluswrld-logo-dark.svg");
  for (const svg of [light, dark]) {
    assert.match(svg, /<svg[^>]+viewBox="0 0 1932 814"/);
    assert.match(svg, /<linearGradient/);
    assert.doesNotMatch(svg, /<rect|<image/);
  }
  assert.match(chrome, /unoptimized/);
});


test("Wordmark is proportionally reduced while supporting logo lines remain full scale", () => {
  for (const path of ["public/pluswrld-logo.svg", "public/pluswrld-logo-dark.svg"]) {
    const svg = read(path);
    assert.match(svg, /translate\(295 65\) scale\(0.70\)/);
    assert.match(svg, /Knowledge comes from sensory ideas/);
    assert.match(svg, /Build, Automate, Grow/);
  }
  assert.match(css, /\.site-header \.brand-image-lockup\{width:180px\}/);
});

test("Logo wordmark is reduced independently of the supporting logo copy", () => {\n  for (const path of ["public/pluswrld-logo.svg", "public/pluswrld-logo-dark.svg"]) {\n    assert.match(read(path), /translate\\(295 65\\) scale\\(0\\.70\\)/);\n  }\n});\n\ntest("Enquiry form uses WhatsApp with an email fallback and no paid-advertising option", () => {\n  const form = read("components/enquiry-form.tsx");\n  assert.match(form, /Continue to WhatsApp/);\n  assert.match(form, /Use email instead/);\n  assert.match(form, /Merchant Center \/ social commerce setup/);\n  assert.doesNotMatch(form, /<option>Paid advertising<\\/option>/);\n});\n\ntest("Testimonials prioritise the detailed Edison review and higher-rated feedback", () => {\n  assert.match(content, /order\\(\\(reviewerHandle == "edison_tim"\\) desc, rating desc, reviewDate desc\\)/);\n});\n\ntest("Primary metadata describes the real Pluswrld services", () => {
  assert.match(layout, /Shopify Store Setup, Websites & Automation \| Pluswrld/);
  assert.match(layout, /Build or improve your Shopify store, business website or no-code app/);
  assert.doesNotMatch(layout, /knowledge comes from sensory ideas/i);
});
