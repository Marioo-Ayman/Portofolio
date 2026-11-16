"use client";
import { useEffect, useRef, useState } from "react";
const seenKey = "neon-ronin-intro-seen";
let seenInMemory = false;
export function IntroSequence() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let seen = seenInMemory;
    try { seen ||= Boolean(sessionStorage.getItem(seenKey)); } catch { /* Storage is optional. */ }
    if (media.matches || seen || window.location.hash) return;
    const start = window.setTimeout(() => {
      seenInMemory = true;
      try { sessionStorage.setItem(seenKey, "true"); } catch { /* In-memory fallback. */ }
      setVisible(true);
    }, 0);
    const beginExit = window.setTimeout(() => setExiting(true), 1000);
    const finish = window.setTimeout(() => setVisible(false), 1650);
    const onChange = () => { if (media.matches) setVisible(false); };
    media.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(start); window.clearTimeout(beginExit); window.clearTimeout(finish);
      media.removeEventListener("change", onChange);
    };
  }, []);
  useEffect(() => {
    if (!visible) return;
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    element?.showModal();
    return () => { element?.close(); previousFocus?.focus({ preventScroll: true }); };
  }, [visible]);
  if (!visible) return null;
  return <dialog ref={dialog} className={`intro-overlay ${exiting ? "is-exiting" : ""}`} aria-label="Portfolio introduction" onCancel={() => setVisible(false)}>
    <span className="intro-corner top-left" aria-hidden="true"/><span className="intro-corner bottom-right" aria-hidden="true"/>
    <div className="intro-content"><div className="intro-symbol" aria-hidden="true">忍</div><span className="intro-kicker">NEON / RONIN — INTRODUCTION</span><h2>CODE <span>MEETS</span> CULTURE</h2><div className="intro-meter" aria-hidden="true"><span/></div><p>A WORLD BUILT WITH INTENTION</p></div>
    <button className="intro-skip" type="button" onClick={() => setVisible(false)}>SKIP INTRO <span aria-hidden="true">↗</span></button><div className="intro-slash" aria-hidden="true"/>
  </dialog>;
}
