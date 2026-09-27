import { useEffect, useRef, useState } from "react";

/**
 * FallenKingLanding
 * -------------------------------------------------------------------------
 * Setup needed in your project (not included here, since they live outside
 * a single component file):
 *
 * 1) Load the two display fonts in your document head (index.html, or via
 *    next/font if you're on Next.js):
 *      <link rel="preconnect" href="https://fonts.googleapis.com" />
 *      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
 *      <link
 *        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@500;700;800&display=swap"
 *        rel="stylesheet"
 *      />
 *
 * 2) Point Tailwind's `font-serif` / `font-mono` at them in tailwind.config:
 *      theme: {
 *        extend: {
 *          fontFamily: {
 *            serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
 *            mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
 *          },
 *        },
 *      }
 *
 * Everything else (layout, glitch effect, mobile menu) is plain Tailwind +
 * component state — no extra CSS files required.
 * -------------------------------------------------------------------------
 */

type GlitchTone = "left" | "right";

interface GlitchTextProps {
    text: string;
    tone: GlitchTone;
    className?: string;
}

/** The "verdict" line: base text + two offset ghost layers (color + faint). */
function GlitchText({ text, tone, className = "" }: GlitchTextProps) {
    const ghostColorClass = tone === "left" ? "text-[#b0231f]" : "text-[#17b8c9]";

    return (
        <span className="relative inline-block isolate">
            <span
                aria-hidden="true"
                className={`absolute inset-0 translate-y-3 text-[#b9b7b2] opacity-90 ${className}`}
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                className={`absolute inset-0 -translate-x-1.5 mix-blend-multiply opacity-75 ${ghostColorClass} ${className}`}
            >
                {text}
            </span>
            <span className={`relative z-[3] text-[#17171a] ${className}`}>{text}</span>
        </span>
    );
}

interface NavLink {
    label: string;
    href: string;
}

const NAV_LINKS: NavLink[] = [
    { label: "Sobre", href: "#" },
    { label: "A história", href: "#" },
    { label: "Contato", href: "#" },
];

const VERDICT_CLASS =
    "font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl";

interface FallenKingLandingProps {
    /** URL of the final chess-king image. Leave empty to show the placeholder. */
    kingImageSrc?: string;
}

export default function Index({ kingImageSrc = "" }: FallenKingLandingProps) {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);

    // Close on outside click / Escape
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (!isOpen) return;
            const target = e.target as Node;
            const clickedPanel = panelRef.current?.contains(target);
            const clickedToggle = toggleRef.current?.contains(target);
            if (!clickedPanel && !clickedToggle) setIsOpen(false);
        }

        function handleKeydown(e: KeyboardEvent) {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        }

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [isOpen]);

    // Close automatically if the viewport grows into the desktop breakpoint
    useEffect(() => {
        const mql = window.matchMedia("(min-width: 640px)");
        function handleChange(e: MediaQueryListEvent) {
            if (e.matches) setIsOpen(false);
        }
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);

    // Lock body scroll while the panel is open
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    return (
        <div className="min-h-screen flex flex-col bg-[#f2f1ee]">
            {/* HEADER */}
            <header className="w-full border-b border-black/5 relative z-50 bg-[#f2f1ee]">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
                    <a href="#" className="flex items-baseline gap-1.5 select-none">
                        <span className="font-serif italic text-base sm:text-lg text-[#17171a]">Fallen</span>
                        <span className="font-mono font-extrabold uppercase text-sm sm:text-base text-[#17171a]">
                            King
                        </span>
                    </a>

                    <nav className="hidden sm:flex items-center gap-8 text-xs font-medium tracking-wide text-[#17171a]">
                        {NAV_LINKS.map((link) => (
                            <a key={link.label} href={link.href} className="opacity-70 hover:opacity-100 transition-opacity">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile trigger: two bars that morph into an × */}
                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setIsOpen((v) => !v)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                        className="sm:hidden relative w-9 h-9 -mr-2 flex items-center justify-center"
                    >
                        <span
                            className={`absolute block w-5 h-[1.5px] rounded-full bg-[#17171a] transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "translate-y-0 rotate-45" : "-translate-y-1"
                                }`}
                        />
                        <span
                            className={`absolute block w-5 h-[1.5px] rounded-full bg-[#17171a] transition-transform duration-300 ease-out motion-reduce:transition-none ${isOpen ? "translate-y-0 -rotate-45" : "translate-y-1"
                                }`}
                        />
                    </button>
                </div>

                {/* Mobile panel: 0fr -> 1fr grid-template-rows for a natural height reveal */}
                <div
                    id="mobile-menu"
                    ref={panelRef}
                    className={`sm:hidden grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                >
                    <div className="overflow-hidden">
                        <nav className="flex flex-col divide-y divide-black/5 border-t border-black/5 px-6">
                            {NAV_LINKS.map((link, i) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="py-4 text-sm font-medium text-[#17171a] transition-all duration-300 ease-out motion-reduce:transition-none"
                                    style={{
                                        transitionDelay: isOpen ? `${60 + i * 60}ms` : "0ms",
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                                    }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <main className="flex-1 flex items-center justify-center px-6 sm:px-10 py-16 sm:py-24">
                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-10 md:gap-4">
                    {/* LEFT TEXT */}
                    <div className="text-center md:text-right order-2 md:order-1">
                        <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em]">
                            Every king
                        </p>
                        <div className="mt-1">
                            <GlitchText text="CAN FALL" tone="left" className={VERDICT_CLASS} />
                        </div>
                    </div>

                    {/* CENTER IMAGE */}
                    <div className="order-1 md:order-2 flex flex-col items-center justify-self-center">
                        <div className="relative w-[220px] h-[280px] sm:w-[260px] sm:h-[330px] flex items-center justify-center">
                            {kingImageSrc ? (
                                <img
                                    src={kingImageSrc}
                                    alt="Rei de xadrez caindo"
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 border border-dashed border-black/15 rounded-lg text-black/30">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
                                        <path d="M12 2l1.5 3L17 4l-1 3.5 3 1.5-2.5 2.5.5 3.5H7l.5-3.5L5 9l3-1.5L7 4l3.5 1z" />
                                    </svg>
                                    <span className="text-[11px] tracking-wide uppercase">Imagem do rei entra aqui</span>
                                </div>
                            )}
                        </div>
                        <div
                            className="w-40 h-6 sm:w-48 sm:h-7 -mt-3 rounded-full"
                            style={{
                                background:
                                    "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.12) 45%, rgba(0,0,0,0) 75%)",
                            }}
                        />
                        <p className="font-mono tracking-wider text-[11px] sm:text-xs mt-4 opacity-45 text-[#17171a]">
                            Kxf7#
                        </p>
                    </div>

                    {/* RIGHT TEXT */}
                    <div className="text-center md:text-left order-3">
                        <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em]">
                            Every fall
                        </p>
                        <div className="mt-1">
                            <GlitchText text="CREATES" tone="right" className={VERDICT_CLASS} />
                        </div>
                        <div className="mt-0.5">
                            <GlitchText text="A LEGEND" tone="right" className={VERDICT_CLASS} />
                        </div>
                    </div>
                </div>
            </main>

            {/* FOOTER */}
            <footer className="w-full border-t border-black/5">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs opacity-60 text-[#17171a]">
                        &copy; 2026 Fallen King. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-6 text-xs font-medium tracking-wide opacity-70 text-[#17171a]">
                        <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">X</a>
                        <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}