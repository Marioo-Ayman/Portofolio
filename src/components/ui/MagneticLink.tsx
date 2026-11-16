"use client";

import type { ReactNode, PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

type Props = { href: string; className: string; children: ReactNode };

export function MagneticLink({ href, className, children }: Props) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 290, damping: 20, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 290, damping: 20, mass: 0.5 });

  function onMove(event: PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.14);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.14);
  }

  function onLeave() { x.set(0); y.set(0); }

  return <motion.a href={href} className={className} onPointerMove={onMove} onPointerLeave={onLeave} style={reduceMotion ? undefined : { x: smoothX, y: smoothY }}>
    {children}
  </motion.a>;
}
