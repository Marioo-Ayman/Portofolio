import type { ReactNode } from "react";

type Props = { index: string; eyebrow: string; title: ReactNode; description?: string; id?: string };
export function SectionHeading({ index, eyebrow, title, description, id }: Props) {
  return <div className="section-heading" id={id ?? ({ "02": "about-heading", "03": "arsenal-heading", "04": "projects-heading", "05": "journey-heading" } as Record<string, string>)[index]} data-reveal>
    <span className="eyebrow"><span className="eyebrow-slashes">{"//"}</span> {index} / {eyebrow}</span>
    <div className="section-heading-inner"><h2>{title}</h2>{description && <p>{description}</p>}</div>
  </div>;
}
