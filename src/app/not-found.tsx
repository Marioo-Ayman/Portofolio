import Link from "next/link";
export default function NotFound() { return <main className="not-found"><span className="eyebrow">{"// LOST IN THE SYSTEM"}</span><h1>404<span>.</span></h1><p>This route doesn&apos;t exist in this world.</p><Link href="/" className="button button-red">Return to home ↗</Link></main>; }
