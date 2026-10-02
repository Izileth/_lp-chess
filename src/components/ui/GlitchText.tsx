type GlitchTone = "left" | "right";

interface GlitchTextProps {
    text: string;
    tone: GlitchTone;
    className?: string;
}

/**
 * The "verdict" line treatment used across the site: a base layer plus two
 * offset ghost layers (a colored one, a faint gray one) to read as a glitch.
 * tone="left" uses the red ghost, tone="right" uses the cyan ghost — matching
 * the two-column composition on the home page.
 */
export default function GlitchText({ text, tone, className = "" }: GlitchTextProps) {
    const ghostColorClass = tone === "left" ? "text-[#b0231f]" : "text-[#17b8c9]";

    return (
        <span className="relative inline-block isolate">
            <span
                aria-hidden="true"
                className={`absolute inset-0 translate-y-3 text-[#f2f1ee] opacity-20 ${className}`}
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                className={`absolute inset-0 -translate-x-1.5 mix-blend-screen opacity-75 ${ghostColorClass} ${className}`}
            >
                {text}
            </span>
            <span className={`relative z-[3] text-[#f2f1ee] ${className}`}>{text}</span>
        </span>
    );
}