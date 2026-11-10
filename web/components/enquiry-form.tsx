"use client";
import { useState, type FormEvent } from "react";

type PreparedEnquiry = { mailto: string; gmail: string };

export function EnquiryForm({ email }: { email: string }) {
  const [prepared, setPrepared] = useState<PreparedEnquiry | null>(null);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const sender = String(formData.get("email") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const recipient = email.trim();

    if (!recipient) {
      setError("The contact email is not available right now. Please use the WhatsApp contact link instead.");
      return;
    }

    const subjectText = "Project enquiry from " + name;
    const bodyText = [
      "Name: " + name,
      "Email: " + sender,
      "Project type: " + project,
      "",
      "Project details:",
      message
    ].join("\n");
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);
    const mailto = "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
    const gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(recipient) + "&su=" + subject + "&body=" + body;

    setPrepared({ mailto, gmail });

    // Keep this navigation in the submit gesture so browsers can hand it to
    // the visitor's configured mail application.
    window.location.assign(mailto);
  }

  return <form className="enquiry-form" onSubmit={submit}>
    <div className="form-row">
      <label>Your name<input name="name" autoComplete="name" placeholder="How should I address you?" required /></label>
      <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required /></label>
    </div>
    <label>What are you looking to work on?
      <select name="project" defaultValue="" required>
        <option value="" disabled>Select a project area</option>
        <option>Shopify / ecommerce</option>
        <option>Website / no-code application</option>
        <option>AI automation / integrations</option>
        <option>Whop / Skool / creator commerce</option>
        <option>Paid advertising</option>
        <option>Not sure yet — need guidance</option>
        <option>Something else</option>
      </select>
    </label>
    <label>Tell me a little about the project<textarea name="message" rows={6} placeholder="What are you trying to build, improve or connect? Include any relevant context." required /></label>
    <div className="form-submit-row">
      <button className="button" type="submit">Prepare enquiry <span>↗</span></button>
      <span className="form-note">Prepares an email with your details. Nothing is stored on this website.</span>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {prepared && <div className="form-success form-email-fallback" role="status">
      <strong>Your enquiry draft is ready.</strong>
      <span>If your email app did not open automatically, choose an option below.</span>
      <div>
        <a className="button button-small" href={prepared.mailto}>Open email app <span>↗</span></a>
        <a className="text-link" href={prepared.gmail} target="_blank" rel="noreferrer">Open Gmail compose ↗</a>
      </div>
    </div>}
  </form>;
}
