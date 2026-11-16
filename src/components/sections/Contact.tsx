"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";
import { isExternalUrl } from "@/lib/utils";
import { MagneticLink } from "@/components/ui/MagneticLink";
import type { ReactNode } from "react";

export function Contact({ resume }: { resume?: ReactNode }) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copyError, setCopyError] = useState(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  const [copied, setCopied] = useState(false);
  const isEmailReady = Boolean(site.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.email));
  async function copyEmail() {
    if (!isEmailReady) return;
    if (!navigator.clipboard) { setCopyError(true); return; }
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    } catch { setCopied(false); setCopyError(true); }
  }
  return <section className="contact-section" id="contact" aria-labelledby="contact-heading">
    <div className="contact-glow" aria-hidden="true"/>
    <div className="shell contact-shell">
      <span className="eyebrow" data-reveal><span className="eyebrow-slashes">{"//"}</span> 06 / FINAL MISSION</span>
      <div className="contact-layout">
        <div data-reveal><p className="contact-pretitle">HAVE SOMETHING IN MIND?</p><h2 id="contact-heading">LET&apos;S BUILD<br/><em>SOMETHING</em><br/>REAL<span>.</span></h2><p className="contact-subtitle">The best projects start with a conversation. Let&apos;s make something worth remembering.</p></div>
        <div className="contact-action" data-reveal>
          <div className="contact-orbit"><Mail size={34}/></div>
          <span>OPEN CHANNEL / CONTACT</span>
          {isEmailReady ? <><MagneticLink href={`mailto:${site.email}`} className="contact-email">{site.email}<ArrowUpRight size={21}/></MagneticLink><button type="button" onClick={copyEmail} className="copy-button">{copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? "Copied" : "Copy email"}</button></> : <><p className="contact-email placeholder">Contact details coming soon</p><p className="contact-setup">A direct contact channel will be available here soon.</p></>}
          <p className="contact-location">{site.location}</p>
          <p role="status" className="contact-setup">{copied ? "Email copied." : copyError ? "Copy unavailable. Select the email address or use the email link." : ""}</p><div className="social-links">{isExternalUrl(site.github) && <a href={site.github} target="_blank" rel="noopener noreferrer"><Github size={18}/> GitHub <ArrowUpRight size={14}/></a>}{isExternalUrl(site.linkedin) && <a href={site.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={14}/></a>}</div>
          {resume}
        </div>
      </div>
      <div className="contact-footer"><span>© {new Date().getFullYear()} {site.name}. CRAFTED WITH INTENTION.</span><a href="#home">BACK TO THE TOP ↑</a><span>侍 / CODE MEETS CULTURE</span></div>
    </div>
  </section>;
}
