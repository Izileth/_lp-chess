import { useEffect, useRef, useState } from "react";

export interface MousePosition {
  /** Raw pixel X from the left of the viewport */
  x: number;
  /** Raw pixel Y from the top of the viewport */
  y: number;
  /** Normalized X: -1 (left edge) → 0 (centre) → +1 (right edge) */
  nx: number;
  /** Normalized Y: -1 (top edge) → 0 (centre) → +1 (bottom edge) */
  ny: number;
  /** True while the cursor is anywhere inside the viewport */
  isOnScreen: boolean;
}

const INITIAL: MousePosition = {
  x: 0,
  y: 0,
  nx: 0,
  ny: 0,
  isOnScreen: false,
};

/**
 * useMousePosition — tracks raw pixel and normalized (-1 → +1) cursor position
 * relative to the viewport centre, plus an `isOnScreen` boolean.
 *
 * A single `mousemove` listener drives all values; `mouseleave` / `mouseenter`
 * toggle `isOnScreen`. Batched through rAF. Cleaned up on unmount.
 */
export function useMousePosition(): Readonly<MousePosition> {
  const [position, setPosition] = useState<MousePosition>(INITIAL);

  // Keep the latest position in a ref so the listener closure is always fresh
  // without needing to re-register on every state change.
  const posRef = useRef<MousePosition>(INITIAL);

  useEffect(() => {
    let rafId: number | null = null;

    const flush = () => {
      rafId = null;
      setPosition({ ...posRef.current });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const hw = window.innerWidth / 2;
      const hh = window.innerHeight / 2;

      posRef.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX - hw) / hw,
        ny: (e.clientY - hh) / hh,
        isOnScreen: true,
      };

      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    const handleMouseEnter = () => {
      posRef.current = { ...posRef.current, isOnScreen: true };
      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    const handleMouseLeave = () => {
      posRef.current = { ...posRef.current, isOnScreen: false };
      if (rafId === null) {
        rafId = requestAnimationFrame(flush);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}
