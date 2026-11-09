"use client";
import { useState, type FormEvent } from "react";
export function EnquiryForm({ email }: { email: string }) {
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = ["name", "email", "project", "message"].map((k) => String(form.get(k) || "").trim());
    const subject = encodeURIComponent("Project enquiry from " + fields[0]);
    const body = encodeURIComponent("Name: " + fields[0] + "\nEmail: " + fields[1] + "\nProject type: " + fields[2] + "\n\nProject details:\n" + fields[3]);
    window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
    setPrepared(true);
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="How should I address you?" required /></label><label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label></div>
    <label>What are you looking to work on?<select name="project" defaultValue=""><option value="" disabled>Select a project area</option><option>Shopify / ecommerce</option><option>Website / no-code application</option><option>AI automation / integrations</option><option>Whop / Skool / creator commerce</option><option>Not sure yet — need guidance</option><option>Something else</option></select></label>
    <label>Tell me a little about the project<textarea name="message" rows={6} placeholder="What are you trying to build, improve or connect? Include any relevant context." required /></label>
    <div className="form-submit-row"><button className="button" type="submit">Prepare enquiry <span>↗</span></button><span className="form-note">Opens your email app with the details filled in. Nothing is stored on this website.</span></div>
    {prepared && <p className="form-success" role="status">Your email app should open with the enquiry ready to send.</p>}
  </form>;
}