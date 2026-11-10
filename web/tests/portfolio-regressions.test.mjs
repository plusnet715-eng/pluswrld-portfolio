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

test("About page presents the full digital systems consultant identity", () => {
  assert.match(about, /THE FACE BEHIND PLUSWRLD/);
  assert.match(about, /Shopify and ecommerce/i);
  assert.match(about, /no-code applications/i);
  assert.match(about, /creator and community commerce/i);
  assert.match(about, /AI-powered automation/i);
  assert.match(about, /Understand first\. Build with purpose\./);
  assert.doesNotMatch(about, /THE PERSON BEHIND PLUSWRLD|Shopify stores built for customers and business owners|FREELANCE EXPERIENCE|MY PROFESSIONAL JOURNEY|experienceDuration|careerMilestones|careerStart|firstProjectDate/);
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
