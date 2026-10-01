import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates an SVG path as a narrative connector that draws itself
 * as the user scrolls through the page.
 *
 * @param path - The SVG <path> element to animate
 * @param trigger - The element or selector that triggers the animation
 */
export function animateNarrativePath(
  path: SVGPathElement,
  trigger: string | HTMLElement
): () => void {
  const length = path.getTotalLength();

  // Prime the path: hidden at start
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });

  const tween = gsap.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top 90%",
      end: "bottom 10%",
      scrub: 1.5,
    },
  });

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset,opacity" });
  };
}

/**
 * Ambient SVG decoration animation: continuously rotates/pulses
 * decorative SVG elements for an atmospheric effect.
 */
export function animateAmbientSVG(
  elements: SVGElement[],
  options: { baseRotation?: number; scalePulse?: number; duration?: number } = {}
): () => void {
  const { baseRotation = 360, scalePulse = 0.05, duration = 20 } = options;

  const tweens = elements.map((el, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(el, {
      rotation: baseRotation * dir,
      duration: duration + i * 4,
      ease: "none",
      repeat: -1,
    });

    // Subtle scale pulse on a different rhythm
    gsap.to(el, {
      scale: 1 + scalePulse,
      duration: 3 + i * 0.7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return tl;
  });

  return () => {
    tweens.forEach((t) => t.kill());
    elements.forEach((el) =>
      gsap.set(el, { clearProps: "rotation,scale" })
    );
  };
}

/**
 * Scroll-driven SVG icon reveal: draws the icon stroke on viewport entry.
 */
export function revealSVGIcon(
  icon: SVGElement,
  trigger?: string | HTMLElement
): () => void {
  const paths = icon.querySelectorAll<SVGPathElement>("path, circle, line, polyline, rect");

  paths.forEach((p) => {
    const len = p.getTotalLength ? p.getTotalLength() : 100;
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
  });

  const tl = gsap.timeline({
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      : undefined,
  });

  tl.to(paths, {
    strokeDashoffset: 0,
    stagger: 0.12,
    duration: 0.8,
    ease: "power2.inOut",
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
