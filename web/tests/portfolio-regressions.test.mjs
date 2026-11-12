import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import test from "node:test";

const here = dirname(fileURLToPath(import.meta.url));
const read = (path) => readFileSync(resolve(here, "..", path), "utf8");
const page = read("app/[[...slug]]/page.tsx");
const aboutStart = page.indexOf("async function About");
const aboutEnd = page.indexOf("function Help", aboutStart);
const about = page.slice(aboutStart, aboutEnd);
const chrome = read("components/site-chrome.tsx");
const css = read("app/globals.css");
const content = read("lib/content.ts");
const projectCard = read("components/project-card.tsx");

test("About page is a detailed personal profile, not a project gallery", () => {
  assert.match(about, /ABOUT PAUL \/ PLUSWRLD/);
  assert.match(about, /Builder by practice\. Problem-solver by approach\./);
  assert.match(about, /Ecommerce & websites/);
  assert.match(about, /No-code applications/);
  assert.match(about, /Memberships & communities/);
  assert.match(about, /AI & connected workflows/);
  assert.match(about, /Explore my past work/);
  assert.doesNotMatch(about, /THE PERSON BEHIND PLUSWRLD|MY PROFESSIONAL JOURNEY|careerMilestones|careerStart|firstProjectDate|projects\.map|ProjectCard/);
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
test("Header and footer use the CMS wordmark when available and avoid an outdated fallback", () => {
  assert.match(chrome, /settings\.logoUrl/);
  assert.match(chrome, /brand-image-lockup/);
  assert.match(content, /"logoUrl":logo\.asset->url/);
});

test("About social icons link only to approved profiles with valid URLs", () => {
  assert.match(content, /enabled == true && name in \["Instagram","Facebook","TikTok","LinkedIn","Threads"\]/);
  assert.match(page, /AboutSocialLinks links=\{socialLinks\}/);
  assert.match(page, /cdn\.simpleicons\.org/);
});

test("Old unapproved logo is not used as a default fallback", () => {
  assert.match(content, /logoUrl: ""/);
  assert.doesNotMatch(content, /98cba91b62b71c2bb3eef1129af6b63b7fab9095/);
});

test("Pluswrld positioning presents Paul as a digital builder with search and social visibility work", () => {
  assert.match(page, /DIGITAL BUILDER · SEARCH & SOCIAL VISIBILITY/);
  assert.match(page, /<span>\{settings\.role\}<\/span>/);
  assert.match(content, /role: "Digital Builder & Growth Systems Specialist"/);
  assert.match(content, /strengthen their visibility across social media and search engines/);
});
test("Approved transparent logo adapts to both light and dark themes", () => {
  assert.match(chrome, /width=\{1932\} height=\{814\}/);
  assert.match(chrome, /unoptimized/);
  assert.match(css, /\.brand-logo-image\{filter:saturate\(1\.18\) contrast\(1\.06\)/);
  assert.match(css, /:root\[data-theme="dark"\] \.brand-logo-image\{filter:brightness\(1\.68\)/);
});


test("About page is split into concise visitor-led sections", () => {
  assert.match(about, /WHAT I BUILD/);
  assert.match(about, /SEARCH & SOCIAL VISIBILITY/);
  assert.match(about, /HOW I WORK/);
  assert.match(about, /WHAT GUIDES THE WORK/);
  assert.doesNotMatch(about, /THE THINKING BEHIND THE WORK|principle-block|profile-facts/);
});

test("Social profile icons include a local vector LinkedIn mark", () => {
  assert.match(page, /className=\{"social-link social-link-" \+ slug\}/);
  assert.match(page, /slug === "linkedin"/);
  assert.match(page, /<svg viewBox="0 0 24 24"/);
});

test("CMS plain text normalises escaped newline sequences across content types", () => {
  assert.match(content, /function normalizeCmsText/);
  assert.match(content, /function normalizeObjectStrings/);
  assert.match(content, /map\(normalizeObjectStrings\)/);
  assert.match(page, /function TextParagraphs/);
  assert.match(page, /TextParagraphs text=\{item\.answer\}/);
});
