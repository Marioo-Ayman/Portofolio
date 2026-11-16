import type { ReactNode } from "react";

type Props = { index: string; eyebrow: string; title: ReactNode; description?: string; id?: string };
const japaneseLabels: Record<string, string> = { "02": "自己紹介", "03": "技術", "04": "作品", "05": "歩み" };
export function SectionHeading({ index, eyebrow, title, description, id }: Props) {
  return <div className="section-heading" id={id ?? ({ "02": "about-heading", "03": "arsenal-heading", "04": "projects-heading", "05": "journey-heading" } as Record<string, string>)[index]} data-reveal>
    <div className="section-eyebrow"><span className="eyebrow"><span className="eyebrow-slashes">{"//"}</span> {index} / {eyebrow}</span><span className="japanese-subtitle" lang="ja" aria-hidden="true">{japaneseLabels[index]}</span></div>
    <div className="section-heading-inner"><h2>{title}</h2>{description && <p>{description}</p>}</div>
  </div>;
}
