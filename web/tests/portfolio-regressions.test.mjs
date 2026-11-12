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
  assert.match(about, /THE FACE BEHIND PLUSWRLD/);
  assert.match(about, /Practical digital work, with the business goal in view/);
  assert.match(about, /Shopify and ecommerce/i);
  assert.match(about, /Websites & no-code apps/);
  assert.match(about, /Memberships & communities/);
  assert.match(about, /AI & business automation/);
  assert.match(about, /Good implementation starts with good questions/);
  assert.match(about, /Explore my past work/);
  assert.doesNotMatch(about, /THE PERSON BEHIND PLUSWRLD|MY PROFESSIONAL JOURNEY|careerMilestones|careerStart|firstProjectDate|projects\\.map|ProjectCard/);
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
test("The same approved full wordmark is used in the header and footer", () => {
  assert.match(chrome, /settings\.logoUrl/);
  assert.match(chrome, /brand-image-lockup/);
  assert.match(content, /"logoUrl":logo\.asset->url/);
});

test("About social icons link only to approved profiles with valid URLs", () => {
  assert.match(content, /enabled == true && name in \["Instagram","Facebook","TikTok","LinkedIn","Threads"\]/);
  assert.match(page, /AboutSocialLinks links=\{socialLinks\}/);
  assert.match(page, /cdn\\.simpleicons\\.org/);
});

test("Old unapproved logo is not used as a default fallback", () => {
  assert.match(content, /logoUrl: ""/);
  assert.doesNotMatch(content, /98cba91b62b71c2bb3eef1129af6b63b7fab9095/);
});
