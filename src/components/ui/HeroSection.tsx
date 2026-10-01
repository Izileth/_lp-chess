import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { createHeroTimeline } from "../../animations/hero";

interface HeroSectionProps {
  kingImageSrc: string;
}

/**
 * HeroSection
 *
 * The cinematic hero experience. Structure mirrors the HeroElements interface
 * expected by createHeroTimeline:
 *
 *  container        → outermost div (opacity gate)
 *  mask             → clip-path mask that opens vertically
 *  image            → king chess image (scale 1.15 → 1)
 *  headline         → array of word <span> elements
 *  decorativeLine   → horizontal rule that draws across
 *  subheadline      → secondary text
 *  cta              → call-to-action button
 *  backgroundLayers → [bg, midground, foreground] for ambient float
 */
export default function HeroSection({ kingImageSrc }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const decorativeLineRef = useRef<HTMLHRElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  // Array of word span refs, collected via callback ref pattern
  const wordSpansRef = useRef<HTMLSpanElement[]>([]);
  wordSpansRef.current = [];
  const addWordRef = (el: HTMLSpanElement | null) => {
    if (el && !wordSpansRef.current.includes(el)) {
      wordSpansRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    if (
      !containerRef.current ||
      !maskRef.current ||
      !imageRef.current ||
      !decorativeLineRef.current ||
      !subheadlineRef.current ||
      !ctaRef.current ||
      !bgRef.current ||
      !midRef.current ||
      !fgRef.current ||
      wordSpansRef.current.length === 0
    )
      return;

    const ctx = gsap.context(() => {
      createHeroTimeline({
        container: containerRef.current!,
        mask: maskRef.current!,
        image: imageRef.current!,
        headline: wordSpansRef.current,
        decorativeLine: decorativeLineRef.current!,
        subheadline: subheadlineRef.current!,
        cta: ctaRef.current!,
        backgroundLayers: [bgRef.current!, midRef.current!, fgRef.current!],
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Parallax layers respond to mouse movement
  useLayoutEffect(() => {
    const layers = [
      { el: bgRef.current, factor: 0.012 },
      { el: midRef.current, factor: 0.025 },
      { el: fgRef.current, factor: 0.045 },
    ];

    const quickSetters = layers
      .filter((l) => l.el !== null)
      .map(({ el, factor }) => ({
        xTo: gsap.quickTo(el!, "x", { duration: 1.2, ease: "power2.out" }),
        yTo: gsap.quickTo(el!, "y", { duration: 1.2, ease: "power2.out" }),
        factor,
      }));

    function onMouseMove(e: MouseEvent) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      quickSetters.forEach(({ xTo, yTo, factor }) => {
        xTo(dx * factor);
        yTo(dy * factor);
      });
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // The headline words — some come from left, some from right
  const words = ["Every", "king", "can", "fall."];
  const wordDirections = [1, -1, 0, 1]; // 1=right, -1=left, 0=straight

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0d0d0f] flex items-center justify-center"
      style={{ opacity: 0 }}
    >
      {/* ── Depth layers ────────────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(176,35,31,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Midground: subtle grid texture */}
      <div
        ref={midRef}
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Foreground: decorative accent dots */}
      <div
        ref={fgRef}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#17b8c9]"
            style={{
              width: 3 + (i % 3) * 2,
              height: 3 + (i % 3) * 2,
              top: `${15 + i * 13}%`,
              left: `${8 + i * 14}%`,
              opacity: 0.12 + (i % 3) * 0.06,
            }}
          />
        ))}
      </div>

      {/* ── Mask + Image ─────────────────────────────────────────────── */}
      <div
        ref={maskRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <img
          ref={imageRef}
          src={kingImageSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain object-center"
          style={{ scale: "1.15", opacity: 0.08 }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 sm:px-10 max-w-4xl mx-auto">
        {/* Headline */}
        <div ref={headlineRef} className="overflow-hidden mb-6">
          <h1 className="font-serif italic text-[clamp(3.5rem,10vw,8rem)] leading-none text-[#f2f1ee] tracking-[-0.02em]">
            {words.map((word, i) => (
              <span
                key={word}
                ref={addWordRef}
                className="inline-block mr-[0.2em]"
                style={{
                  opacity: 0,
                  transform: `translateY(60px) translateX(${wordDirections[i] * 30}px)`,
                }}
                data-direction={wordDirections[i]}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Decorative line */}
        <hr
          ref={decorativeLineRef}
          className="border-none h-px bg-gradient-to-r from-transparent via-[#f2f1ee]/30 to-transparent mb-6"
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        />

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="font-mono text-xs sm:text-sm tracking-[0.25em] uppercase text-[#f2f1ee]/50 mb-10"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          Aprenda. Falhe. Evolua. — O xadrez que te desafia de verdade.
        </p>

        {/* CTA */}
        <Link
          ref={ctaRef}
          to="/aprenda"
          data-cursor="button"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#f2f1ee] text-[#17171a] font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors duration-200"
          style={{ opacity: 0, transform: "translateY(16px) scale(0.95)" }}
        >
          <span>Começar a aprender</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Chess piece notation — ambient atmosphere */}
      <div className="absolute bottom-8 right-8 font-mono text-[10px] tracking-widest text-[#f2f1ee]/20 select-none pointer-events-none">
        Kxf7#
      </div>
      <div className="absolute bottom-8 left-8 font-mono text-[10px] tracking-widest text-[#f2f1ee]/20 select-none pointer-events-none">
        e4 · e5 · Nf3
      </div>
    </div>
  );
}
