interface MiniBoardPiece {
    /** Algebraic square, e.g. "e4" */
    square: string;
    /** Unicode chess glyph (shape only — color/side is set via `white`) */
    symbol: string;
    /** true = white piece, false = black piece */
    white: boolean;
}

interface MiniBoardProps {
    /** Only the pieces relevant to the idea being illustrated — not a full 32-piece setup. */
    pieces: MiniBoardPiece[];
    /** Squares to tint with the accent color, e.g. the square an opening targets. */
    highlight?: string[];
    /** Picks which accent color the highlight uses — mirrors the page's red/cyan glitch tones. */
    accent?: "left" | "right";
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function MiniBoard({ pieces, highlight = [], accent = "left" }: MiniBoardProps) {
    const pieceMap = new Map(pieces.map((p) => [p.square, p]));
    const accentColor = accent === "left" ? "#b0231f" : "#17b8c9";

    const cells = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const file = FILES[col];
            const rank = 8 - row;
            const square = `${file}${rank}`;
            const isLight = (row + col) % 2 === 0;
            const piece = pieceMap.get(square);
            const isHighlighted = highlight.includes(square);

            cells.push(
                <div
                    key={square}
                    className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center"
                    style={{ background: isLight ? "#e9e7e1" : "#17171a" }}
                >
                    {isHighlighted && (
                        <span
                            aria-hidden="true"
                            className="absolute inset-0.5 rounded-sm"
                            style={{ background: accentColor, opacity: 0.35 }}
                        />
                    )}
                    {piece && (
                        <span
                            className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs leading-none"
                            style={{
                                background: piece.white ? "#f2f1ee" : "#17171a",
                                color: piece.white ? "#17171a" : "#f2f1ee",
                                border: piece.white ? "1px solid rgba(23,23,26,0.25)" : "none",
                            }}
                        >
                            {piece.symbol}
                        </span>
                    )}
                </div>
            );
        }
    }

    return (
        <div
            role="img"
            aria-label="Diagrama simplificado da posição, com apenas as peças relevantes para a ideia da abertura"
            className="inline-grid grid-cols-8 border border-black/10 shrink-0"
        >
            {cells}
        </div>
    );
}