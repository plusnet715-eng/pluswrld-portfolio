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
const projectCard = read("components/project-card.tsx");

test("About page positions Pluswrld around Shopify and excludes freelance experience", () => {
  assert.match(about, /Shopify/i);
  assert.doesNotMatch(about, /FREELANCE EXPERIENCE|MY PROFESSIONAL JOURNEY|experienceDuration|careerMilestones|careerStart|firstProjectDate/);
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

test("CTA eyebrow and its rule use high-contrast colours on the dark banner", () => {
  assert.match(css, /\.cta-band \.eyebrow\s*\{[^}]*color:#f[0-9a-f]{5}/i);
  assert.match(css, /\.cta-band \.eyebrow-line\s*\{[^}]*background:#[a-f0-9]{6}/i);
});
