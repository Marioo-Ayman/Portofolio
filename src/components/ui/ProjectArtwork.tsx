import type { ProjectArt } from "@/content/site";
import { Activity, CheckCircle2, CircleUserRound, Code2, Headphones, Radio, TrendingUp, Workflow, MapPin, Stethoscope, ClipboardCheck } from "lucide-react";

export function ProjectArtwork({ art }: { art: ProjectArt }) {
  const concepts = {
    tasks: { Icon: Workflow, title: "From input to action", label: "TASKS / INTELLIGENCE", stages: ["CAPTURE", "EXTRACT", "ASSIGN"] },
    travel: { Icon: MapPin, title: "Every journey connected", label: "TRAVEL / DISCOVERY", stages: ["EXPLORE", "SELECT", "BOOK"] },
    healthcare: { Icon: Stethoscope, title: "Closer to better care", label: "HEALTHCARE / ACCESS", stages: ["DISCOVER", "LOCATE", "BOOK"] },
    quiz: { Icon: ClipboardCheck, title: "A structure for learning", label: "EDUCATION / ASSESSMENT", stages: ["CREATE", "SCHEDULE", "ASSESS"] },
  };
  if (art in concepts) {
    const { Icon, title, label, stages } = concepts[art as keyof typeof concepts];
    return <div className={`artwork artwork-concept artwork-${art}`} role="img" aria-label={`Concept illustration: ${title}. Not a product screenshot.`}>
      <div className="art-grid"/><div className="concept-orbit" aria-hidden="true"/>
      <div className="concept-content" aria-hidden="true"><span className="concept-label">{label}</span><div className="concept-icon"><Icon size={42} strokeWidth={1.2}/></div><strong>{title}</strong><div className="concept-stages">{stages.map((stage, index) => <span key={stage}><i>0{index + 1}</i>{stage}</span>)}</div></div>
    </div>;
  }
  if (art === "support") return <div className="artwork artwork-support" aria-label="Illustrative preview of support software">
    <div className="art-grid"/>
    <div className="mock-app support-app">
      <div className="mock-topbar"><span className="mock-lights"><i/><i/><i/></span><span>CONSOLE / LIVE SUPPORT</span><Radio size={12}/></div>
      <div className="support-content">
        <div className="support-sidebar"><Headphones size={20} /><span/><span/><span/><span className="selected"/><span/></div>
        <div className="support-messages">
          <div className="mock-heading"><div><small>ACTIVE SESSION</small><strong>Customer conversation</strong></div><span className="online-pill">● Online</span></div>
          <div className="mock-chat them"><span className="avatar">C</span><p>Hi! I need help with my account.</p></div>
          <div className="mock-chat us"><p>Of course — let&apos;s get this sorted.</p><span className="avatar">A</span></div>
          <div className="mock-chat them"><span className="avatar">C</span><p>Thank you! That solved it.</p></div>
          <div className="mock-input">Write a reply… <span>↗</span></div>
        </div>
      </div>
    </div>
    <span className="art-side-label">REALTIME / CONNECTED</span>
  </div>;

  if (art === "investment") return <div className="artwork artwork-investment" aria-label="Illustrative preview of an investment platform">
    <div className="art-grid"/>
    <div className="invest-ring ring-one"/><div className="invest-ring ring-two"/>
    <div className="mock-app invest-app">
      <div className="mock-topbar"><span className="mock-lights"><i/><i/><i/></span><span>INVESTMENT / OVERVIEW</span><TrendingUp size={12}/></div>
      <div className="invest-content"><span className="invest-kicker">PORTFOLIO PERFORMANCE</span><h3>Building tomorrow<span>.</span></h3><p>Designed for clarity. Built for trust.</p>
        <div className="invest-metrics"><div><small>PORTFOLIO VALUE</small><strong>— — —</strong></div><div><small>GROWTH</small><strong className="up">+ 12.8%</strong></div></div>
        <svg viewBox="0 0 450 130" role="img" aria-label="Decorative growth chart"><defs><linearGradient id="investFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff446a" stopOpacity=".27"/><stop offset="100%" stopColor="#ff446a" stopOpacity="0"/></linearGradient></defs><path d="M0 108 C40 107 52 92 88 98 S144 85 178 77 S240 82 268 55 S318 69 354 38 S404 42 450 6 L450 130 L0 130Z" fill="url(#investFade)"/><path d="M0 108 C40 107 52 92 88 98 S144 85 178 77 S240 82 268 55 S318 69 354 38 S404 42 450 6" stroke="#ff315d" strokeWidth="3" fill="none"/></svg>
      </div>
    </div>
    <span className="art-side-label">ROLE-BASED / RESPONSIVE</span>
  </div>;

  return <div className="artwork artwork-market" aria-label="Illustrative preview of a stock market simulator">
    <div className="art-grid"/>
    <div className="market-orbit"/>
    <div className="mock-app market-app">
      <div className="mock-topbar"><span className="mock-lights"><i/><i/><i/></span><span>MARKET / SIMULATION</span><Activity size={12}/></div>
      <div className="market-content"><div className="market-stats"><div><small>VIRTUAL BALANCE</small><strong>$ 24,750<span>.00</span></strong></div><span className="online-pill">● MARKET LIVE</span></div>
        <div className="market-chart"><svg viewBox="0 0 460 140" role="img" aria-label="Decorative stock price curve"><defs><linearGradient id="marketFade" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#7364ff" stopOpacity=".4"/><stop offset="100%" stopColor="#7364ff" stopOpacity="0"/></linearGradient></defs><path d="M0 96 L40 78 L70 99 L100 61 L137 73 L171 40 L205 68 L239 54 L268 84 L303 48 L339 53 L373 20 L410 42 L460 5 L460 140 L0 140Z" fill="url(#marketFade)"/><path d="M0 96 L40 78 L70 99 L100 61 L137 73 L171 40 L205 68 L239 54 L268 84 L303 48 L339 53 L373 20 L410 42 L460 5" fill="none" stroke="#9587ff" strokeWidth="3"/></svg></div>
        <div className="market-tickers"><span><Code2 size={12}/> AAPL <b>↗ 1.43%</b></span><span><CircleUserRound size={12}/> TSLA <b>↗ 2.08%</b></span><span><CheckCircle2 size={12}/> MSFT <b>↗ 0.88%</b></span></div>
      </div>
    </div>
    <span className="art-side-label">REALTIME / PORTFOLIO</span>
  </div>;
}
