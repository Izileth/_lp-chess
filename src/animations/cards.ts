import gsap from "gsap";

/**
 * 3D Card interaction system.
 *
 * Responds to mouse position over each card, creating:
 * - rotationX / rotationY tilt
 * - specular highlight movement
 * - dynamic drop shadow
 * - internal content parallax
 *
 * All movement is GSAP-driven (no CSS transitions).
 */

export interface Card3DOptions {
  /** Max rotation in degrees. Default: 12 */
  maxRotation?: number;
  /** Strength of the specular highlight movement. Default: 0.3 */
  highlightStrength?: number;
  /** GSAP ease for tilt. Default: 'power2.out' */
  ease?: string;
}

/**
 * Initializes 3D interaction on a single card element.
 *
 * @param card       The card root element (must have `perspective` set in CSS)
 * @param options    Optional config
 * @returns          Cleanup function that removes listeners and resets transforms
 */
export function init3DCard(
  card: HTMLElement,
  options: Card3DOptions = {}
): () => void {
  const { maxRotation = 12, highlightStrength = 0.3, ease = "power2.out" } =
    options;

  // Expected inner elements (optional — gracefully skip if absent)
  const highlight = card.querySelector<HTMLElement>(".card-highlight");
  const inner = card.querySelector<HTMLElement>(".card-inner");
  const shadow = card.querySelector<HTMLElement>(".card-shadow");

  // QuickTo setters for smooth, low-latency updates
  const setRotX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease });
  const setRotY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease });

  function onMouseMove(e: MouseEvent) {
    const rect = card.getBoundingClientRect();
    // Normalize mouse position to [-1, 1] within the card
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Tilt: invert Y so moving up tilts card forward
    setRotY(nx * maxRotation);
    setRotX(-ny * maxRotation);

    // Move specular highlight opposite to mouse
    if (highlight) {
      gsap.to(highlight, {
        x: -nx * 100 * highlightStrength,
        y: -ny * 100 * highlightStrength,
        opacity: 0.15 + Math.abs(nx * ny) * 0.25,
        duration: 0.4,
        ease,
      });
    }

    // Internal content parallax (moves slightly with mouse)
    if (inner) {
      gsap.to(inner, {
        x: nx * 8,
        y: ny * 8,
        duration: 0.5,
        ease,
      });
    }

    // Dynamic shadow: moves opposite to tilt
    if (shadow) {
      gsap.to(shadow, {
        x: nx * 20,
        y: ny * 20 + 20,
        opacity: 0.3 + Math.abs(nx + ny) * 0.1,
        blur: 24 + Math.abs(nx + ny) * 8,
        duration: 0.4,
        ease,
      });
    }
  }

  function onMouseLeave() {
    // Elastic return to flat
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });

    if (highlight) {
      gsap.to(highlight, {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    if (inner) {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    }

    if (shadow) {
      gsap.to(shadow, {
        x: 0,
        y: 20,
        opacity: 0.2,
        duration: 0.6,
        ease: "power3.out",
      });
    }
  }

  function onMouseEnter() {
    // Lift the card slightly on enter
    gsap.to(card, {
      z: 30,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  card.addEventListener("mousemove", onMouseMove);
  card.addEventListener("mouseleave", onMouseLeave);
  card.addEventListener("mouseenter", onMouseEnter);

  // Set perspective on card for 3D effect
  gsap.set(card, { transformPerspective: 800, transformStyle: "preserve-3d" });

  return () => {
    card.removeEventListener("mousemove", onMouseMove);
    card.removeEventListener("mouseleave", onMouseLeave);
    card.removeEventListener("mouseenter", onMouseEnter);
    gsap.set(card, {
      clearProps: "rotationX,rotationY,z,transformPerspective,transformStyle",
    });
    if (inner) gsap.set(inner, { clearProps: "x,y" });
    if (highlight) gsap.set(highlight, { clearProps: "x,y,opacity" });
  };
}

/**
 * Apply 3D interaction to multiple cards at once.
 * Returns a single cleanup function.
 */
export function initAll3DCards(
  cards: HTMLElement[],
  options?: Card3DOptions
): () => void {
  const cleanups = cards.map((card) => init3DCard(card, options));

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

/**
 * Hover depth effect for simpler card-like elements (no 3D tilt).
 * Adds a subtle lift + shadow on hover, driven by GSAP.
 */
export function initCardHoverDepth(element: HTMLElement): () => void {
  function onEnter() {
    gsap.to(element, {
      y: -6,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
      duration: 0.35,
      ease: "power2.out",
    });
  }

  function onLeave() {
    gsap.to(element, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }

  element.addEventListener("mouseenter", onEnter);
  element.addEventListener("mouseleave", onLeave);

  return () => {
    element.removeEventListener("mouseenter", onEnter);
    element.removeEventListener("mouseleave", onLeave);
    gsap.set(element, { clearProps: "y,scale,boxShadow" });
  };
}
