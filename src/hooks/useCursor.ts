import { useEffect, useRef, useCallback } from "react";
import { CursorSystem, type CursorHoverType } from "../animations/cursor";

/**
 * useCursor
 *
 * Initializes and manages the global CursorSystem.
 * Attach `cursorRef`, `dotRef`, `haloRef` to your cursor DOM elements.
 * The hook handles:
 *  - Mounting the CursorSystem
 *  - Global mousemove tracking
 *  - mousedown/mouseup click states
 *  - Delegated hover detection via data-cursor attributes on any element
 *  - Cleanup on unmount
 *
 * To mark an element as a special cursor zone, add:
 *   data-cursor="button"   → CTA / button hover state
 *   data-cursor="link"     → Anchor hover state
 *   data-cursor="image"    → Image hover state
 *   data-cursor="draggable"→ Draggable element state
 */
export function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  // Stable reference to the CursorSystem instance
  const systemRef = useRef<CursorSystem | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    systemRef.current?.update(e.clientX, e.clientY);
  }, []);

  const handleMouseDown = useCallback(() => {
    systemRef.current?.setClickState(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    systemRef.current?.setClickState(false);
  }, []);

  // Delegated hover detection: walk up from the event target to find a
  // [data-cursor] attribute without attaching listeners to every element.
  const handlePointerOver = useCallback((e: PointerEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
    const type: CursorHoverType = (target?.dataset.cursor as CursorHoverType) ?? "default";
    systemRef.current?.setHoverState(type);
  }, []);

  useEffect(() => {
    if (!cursorRef.current || !dotRef.current || !haloRef.current) return;

    systemRef.current = new CursorSystem({
      cursor: cursorRef.current,
      dot: dotRef.current,
      halo: haloRef.current,
    });

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("pointerover", handlePointerOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("pointerover", handlePointerOver);
      systemRef.current?.destroy();
      systemRef.current = null;
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handlePointerOver]);

  return { cursorRef, dotRef, haloRef };
}
