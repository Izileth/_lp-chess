import gsap from "gsap";

/**
 * Page transition system for React Router.
 *
 * Usage:
 *   // On route change, call `transitionOut` first, then navigate,
 *   // then call `transitionIn` on the new page.
 *
 * The overlay is a full-screen div that must be rendered at the app root
 * (above all content), e.g.:
 *   <div id="page-transition-overlay" />
 */

export interface TransitionConfig {
  /** Duration of each half (out + in), in seconds. Default: 0.6 */
  duration?: number;
  /** Color of the overlay. Default: '#17171a' */
  color?: string;
  /** Easing for the overlay entry. Default: 'power4.inOut' */
  ease?: string;
}

/**
 * Slides the overlay in (covering the current page).
 * Call this BEFORE changing the route.
 * Returns a Promise that resolves when the cover animation is complete.
 */
export function transitionOut(
  overlay: HTMLElement,
  config: TransitionConfig = {}
): Promise<void> {
  const {
    duration = 0.6,
    color = "#17171a",
    ease = "power4.inOut",
  } = config;

  return new Promise((resolve) => {
    // Reset: overlay is off-screen to the left
    gsap.set(overlay, {
      display: "block",
      backgroundColor: color,
      x: "-100%",
      y: 0,
    });

    gsap.to(overlay, {
      x: "0%",
      duration,
      ease,
      onComplete: resolve,
    });
  });
}

/**
 * Slides the overlay out (revealing the new page).
 * Call this AFTER the new page has mounted and its entry animations are ready.
 * Returns a Promise that resolves when the reveal is complete.
 */
export function transitionIn(
  overlay: HTMLElement,
  config: TransitionConfig = {}
): Promise<void> {
  const { duration = 0.6, ease = "power4.inOut" } = config;

  return new Promise((resolve) => {
    gsap.to(overlay, {
      x: "100%",
      duration,
      ease,
      onComplete: () => {
        // Hide overlay completely after animation
        gsap.set(overlay, { display: "none", x: "-100%" });
        resolve();
      },
    });
  });
}

/**
 * Full transition controller: orchestrates out → route change → in.
 *
 * @param overlay     The #page-transition-overlay element
 * @param navigate    Function to change the route (e.g., React Router's navigate)
 * @param config      Optional timing/style config
 */
export async function performPageTransition(
  overlay: HTMLElement,
  navigate: () => void,
  config: TransitionConfig = {}
): Promise<void> {
  await transitionOut(overlay, config);
  navigate();

  // Small buffer for React to commit the new page's DOM
  await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));

  await transitionIn(overlay, config);
}

/**
 * Creates a reusable stagger-enter animation for newly mounted page content.
 * Call this inside `useLayoutEffect` of each page component.
 *
 * @param elements  Array of DOM elements to animate in (in order)
 */
export function animatePageEnter(elements: HTMLElement[]): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  gsap.set(elements, { opacity: 0, y: 24 });

  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.08,
  });

  return tl;
}
