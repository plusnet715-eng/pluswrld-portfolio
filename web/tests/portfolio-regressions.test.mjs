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
const projectCard = read("components/project-card.tsx");

test("About page presents a scannable builder profile without duplicating the project gallery", () => {
  assert.match(about, /ABOUT PAUL \/ PLUSWRLD/);
  assert.match(about, /A builder who cares about what happens after launch\./);
  assert.match(about, /Ecommerce & websites/);
  assert.match(about, /No-code applications/);
  assert.match(about, /Memberships & communities/);
  assert.match(about, /AI & connected workflows/);
  assert.match(about, /WHO I WORK WITH/);
  assert.match(about, /SEARCH & SOCIAL VISIBILITY/);
  assert.match(about, /WHAT GOOD DELIVERY LOOKS LIKE/);
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
  assert.match(content, /logoUrl: "\/pluswrld-logo\.svg"/);
  assert.doesNotMatch(content, /98cba91b62b71c2bb3eef1129af6b63b7fab9095/);
});

test("Pluswrld positioning presents Paul as a digital builder with search and social visibility work", () => {
  assert.match(page, /DIGITAL BUILDER · SEARCH & SOCIAL VISIBILITY/);
  assert.match(page, /<span>\{settings\.role\}<\/span>/);
  assert.match(content, /role: "Digital Builder & Growth Systems Specialist"/);
  assert.match(content, /strengthen their visibility across social media and search engines/);
});
test("Approved vector logo has separate palettes for light and dark themes", () => {
  assert.match(chrome, /src="\/pluswrld-logo\.svg"/);
  assert.match(chrome, /src="\/pluswrld-logo-dark\.svg"/);
  assert.match(chrome, /width=\{1932\} height=\{814\}/);
  assert.match(content, /logoUrl: "\/pluswrld-logo\.svg"/);
  assert.match(css, /:root\[data-theme="dark"\] \.brand-logo-light/);
  assert.match(css, /:root\[data-theme="dark"\] \.brand-logo-dark/);
  assert.match(read("public/pluswrld-logo.svg"), /stop-color="#087b32"/);
  assert.match(read("public/pluswrld-logo-dark.svg"), /stop-color="#a1f238"/);
});


test("About page is split into concise visitor-led sections", () => {
  assert.match(about, /WHAT I BUILD/);
  assert.match(about, /WHO I WORK WITH/);
  assert.match(about, /SEARCH & SOCIAL VISIBILITY/);
  assert.match(about, /HOW I WORK/);
  assert.match(about, /WHAT GOOD DELIVERY LOOKS LIKE/);
  assert.doesNotMatch(about, /THE THINKING BEHIND THE WORK|principle-block|profile-facts/);
});

test("Social profile icons include a local vector LinkedIn mark", () => {
  assert.match(page, /className=\{"social-link social-link-" \+ slug\}/);
  assert.match(page, /slug === "linkedin"/);
  assert.match(page, /<svg className="social-link-icon-linkedin" viewBox="0 0 24 24"/);
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
