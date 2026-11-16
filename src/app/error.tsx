"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="not-found"><span className="eyebrow">CONNECTION INTERRUPTED</span><h1 className="error-title">A brief detour<span>.</span></h1><p>This page couldn’t load. Try again to continue.</p><button className="button button-red" onClick={reset}>Try again</button><Link className="text-link" href="/">Return home</Link></main>;
}
