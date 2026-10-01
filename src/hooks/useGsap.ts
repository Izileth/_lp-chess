import { useLayoutEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Observer from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

export function useGsap(
  callback: (context: gsap.Context) => void,
  dependencies: any[] = [],
  scope?: RefObject<HTMLElement> | HTMLElement
) {
  const ctx = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    ctx.current = gsap.context((self) => {
      callback(self);
    }, scope || undefined);

    return () => {
      ctx.current?.revert();
    };
  }, dependencies);

  return ctx;
}
