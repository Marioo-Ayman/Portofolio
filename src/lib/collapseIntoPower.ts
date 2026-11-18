import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

type Find = (selector: string) => Element[];

// The shared storyboard move starts with the complete 390 × 1210 emblem.
// The original I/O center (194, 1035) is the destination for every layer.
export function addCollapseIntoPower(
  timeline: gsap.core.Timeline,
  find: Find,
  start = 0,
  embellishments = false,
) {
  ["M", "A", "R"].forEach((name, i) => {
    const centerY = [155, 405, 715][i];
    timeline.to(find(`[data-letter="${name}"]`), {
      svgOrigin: `194 ${centerY}`,
      motionPath: { path: [{ x: 0, y: 0 }, { x: [-130, 110, -85][i], y: 150 }, { x: 0, y: 1035 - centerY }], curviness: 1.4 },
      rotation: [30, -24, 20][i], scale: .04, duration: .65, ease: "power2.in",
    }, start + i * .045).to(find(`[data-letter="${name}"]`), { opacity: 0, duration: .13 }, start + .51 + i * .045);
  });

  timeline.to(find("[data-seal]"), { svgOrigin: "194 1035", scaleX: .6, scaleY: .02, y: 0, duration: .65, ease: "power3.in" }, start + .01)
    .to(find("[data-seal]"), { opacity: 0, duration: .16 }, start + .49)
    .fromTo(find("[data-circle]"), { scale: .12, svgOrigin: "194 1035" }, { scale: 1, opacity: 1, duration: .42, ease: "power2.out" }, start + .30)
    // The I/O layers travel as one unit and remain legible throughout.
    .to(find("[data-camera]"), { y: -435, duration: .5, ease: "power2.inOut" }, start + .34);

  if (embellishments) {
    timeline.to(find("[data-energy]"), { opacity: .55, strokeDashoffset: 0, autoRound: false, duration: .4, stagger: .035 }, start + .06)
      .to(find("[data-energy]"), { opacity: 0, strokeDashoffset: -1, autoRound: false, duration: .3 }, start + .41);
    find("[data-fragment]").forEach((node, i) => {
      timeline.fromTo(node, { x: (i % 2 ? 1 : -1) * (80 + i * 11), y: -230 - (i % 3) * 130, opacity: 0 },
        { x: 0, y: 0, opacity: .85, duration: .25, ease: "power2.in" }, start + .37 + (i % 5) * .025)
        .to(node, { opacity: 0, duration: .1 }, start + .64 + (i % 5) * .025);
    });
  }
  return timeline;
}
