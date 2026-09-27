import Header from "../layout/Header";
import Footer from "../layout/Footer";
import GlitchText from "./GlitchText";

/**
 * FallenKingLanding
 * -------------------------------------------------------------------------
 * Setup needed in your project:
 *
 * 1) react-router-dom, since Header uses <Link>/<NavLink> for routing
 *    between this page and /aprenda.
 *
 * 2) Load the two display fonts in your document head (index.html, or via
 *    next/font if you're on Next.js):
 *      <link rel="preconnect" href="https://fonts.googleapis.com" />
 *      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
 *      <link
 *        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400;1,9..144,500&family=JetBrains+Mono:wght@500;700;800&display=swap"
 *        rel="stylesheet"
 *      />
 *
 * 3) Point Tailwind's `font-serif` / `font-mono` at them in tailwind.config:
 *      theme: {
 *        extend: {
 *          fontFamily: {
 *            serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
 *            mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
 *          },
 *        },
 *      }
 * -------------------------------------------------------------------------
 */

const VERDICT_CLASS =
    "font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl";

interface FallenKingLandingProps {
    /** URL of the final chess-king image. Leave empty to show the placeholder. */
    kingImageSrc?: string;
}

export default function FallenKingLanding({ kingImageSrc = "" }: FallenKingLandingProps) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f2f1ee]">
            <Header />

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

            <Footer />
        </div>
    );
}