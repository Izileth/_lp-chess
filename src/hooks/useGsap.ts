import { useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

/**
 * useGsap — wraps gsap.context() + useLayoutEffect for scoped, auto-cleaned animations.
 *
 * @param callback  Receives the live gsap.Context so callers can call ctx.add() for named functions.
 * @param scope     Optional ref to an HTMLElement that scopes GSAP selector queries.
 * @param deps      Dependency array — mirrors useLayoutEffect deps.
 * @returns         The stable gsap.Context ref so callers can invoke named functions.
 */
export function useGsap(
  callback: (context: gsap.Context) => void,
  scope?: RefObject<HTMLElement | null>,
  deps: DependencyList = [],
): Readonly<React.MutableRefObject<gsap.Context | null>> {
  const ctx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Respect prefers-reduced-motion at the hook level.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scopeEl = scope?.current ?? undefined;
    ctx.current = gsap.context(() => {}, scopeEl);

    if (!prefersReduced) {
      // Run inside the existing context so all tweens/timelines are tracked.
      ctx.current.add(() => {
        callback(ctx.current!);
      });
    }

    return () => {
      ctx.current?.revert();
      ctx.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctx as Readonly<React.MutableRefObject<gsap.Context | null>>;
}
