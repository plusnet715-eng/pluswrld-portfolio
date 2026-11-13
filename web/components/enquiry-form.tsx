"use client";
import { useState, type FormEvent } from "react";

type PreparedEnquiry = { whatsapp: string; mailto: string };

export function EnquiryForm({ email, whatsappUrl }: { email: string; whatsappUrl: string }) {
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
    const whatsapp = whatsappUrl + (whatsappUrl.includes("?") ? "&" : "?") + "text=" + body;

    setPrepared({ whatsapp, mailto });
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
        <option>Merchant Center / social commerce setup</option>
        <option>Not sure yet — need guidance</option>
        <option>Something else</option>
      </select>
    </label>
    <label>Tell me a little about the project<textarea name="message" rows={6} placeholder="What are you trying to build, improve or connect? Include any relevant context." required /></label>
    <div className="form-submit-row">
      <button className="button" type="submit">Prepare WhatsApp enquiry <span>↗</span></button>
      <span className="form-note">Your message opens in WhatsApp for you to review and send. Nothing is stored on this website.</span>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {prepared && <div className="form-success form-email-fallback" role="status">
      <strong>Your enquiry is ready.</strong>
      <span>Review the message in WhatsApp, then send it when you are ready.</span>
      <div>
        <a className="button button-small" href={prepared.whatsapp} target="_blank" rel="noreferrer">Continue to WhatsApp <span>↗</span></a>
        <a className="text-link" href={prepared.mailto}>Use email instead ↗</a>
      </div>
    </div>}
  </form>;
}
