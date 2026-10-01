
import { useCursor } from "../../hooks/useCursor";

/**
 * CustomCursor
 *
 * Global cursor overlay — render this ONCE at the app root (e.g., inside App.tsx),
 * outside any scrollable container so it's always fixed to the viewport.
 *
 * Anatomy:
 *  ┌──────────────── halo (large, slow trailing ring) ───────────────┐
 *  │   ┌────────── cursor ring (medium, main follower) ──────────┐   │
 *  │   │   ● dot (tiny, fast, precisely on pointer)              │   │
 *  │   └─────────────────────────────────────────────────────────┘   │
 *  └─────────────────────────────────────────────────────────────────┘
 *
 * The native cursor is hidden via `cursor: none` on `html` (set in index.css).
 *
 * Hover states are driven by [data-cursor="button|link|image|draggable"] attributes
 * on any element — useCursor handles delegation automatically.
 */
export default function CustomCursor() {
  const { cursorRef, dotRef, haloRef } = useCursor();

  return (
    <>
      {/* Halo: large, very slow trailing circle */}
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#17171a]/20"
        style={{ width: 64, height: 64 }}
      />

      {/* Cursor ring: medium follower */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#17171a]/60 mix-blend-multiply"
        style={{ width: 32, height: 32 }}
      />

      {/* Dot: fast, precise center point */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#17171a]"
        style={{ width: 4, height: 4 }}
      />
    </>
  );
}
