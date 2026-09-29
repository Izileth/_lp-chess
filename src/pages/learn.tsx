import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import GlitchText from "../components/ui/GlitchText";

/**
 * ChessBasics ("/aprenda")
 * -------------------------------------------------------------------------
 * Routed from the FallenKingLanding page via the shared <Header /> nav
 * ("Aprenda" link) — see Header.tsx for the route table. Needs the same
 * font + tailwind.config setup described at the top of FallenKingLanding.tsx.
 * -------------------------------------------------------------------------
 */

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

interface Piece {
    symbol: string;
    code: string;
    name: string;
    desc: string;
}

const PIECES: Piece[] = [
    {
        symbol: "♟",
        code: "P",
        name: "Peão",
        desc: "Anda uma casa à frente (duas no primeiro lance) e captura na diagonal. É o único que ataca diferente de como se move.",
    },
    {
        symbol: "♞",
        code: "N",
        name: "Cavalo",
        desc: "Move-se em L: duas casas numa direção e uma perpendicular. É a única peça que pula por cima das outras.",
    },
    {
        symbol: "♝",
        code: "B",
        name: "Bispo",
        desc: "Desliza pelas diagonais, sempre preso à cor de casa em que começou a partida.",
    },
    {
        symbol: "♜",
        code: "R",
        name: "Torre",
        desc: "Desliza em linha reta, na horizontal ou vertical, por quantas casas o caminho permitir.",
    },
    {
        symbol: "♛",
        code: "Q",
        name: "Dama",
        desc: "Combina torre e bispo: anda em qualquer direção, quantas casas quiser. A peça mais poderosa do tabuleiro.",
    },
    {
        symbol: "♚",
        code: "K",
        name: "Rei",
        desc: "Anda uma casa em qualquer direção. Perdê-lo em xeque-mate encerra a partida — é a queda que dá nome a este site.",
    },
];

interface Rule {
    code: string;
    name: string;
    desc: string;
}

const SPECIAL_MOVES: Rule[] = [
    {
        code: "O-O",
        name: "Roque pequeno",
        desc: "O rei anda duas casas em direção à torre mais próxima, e ela salta para o lado oposto dele. Exige que nenhum dos dois tenha se movido antes.",
    },
    {
        code: "O-O-O",
        name: "Roque grande",
        desc: "A mesma ideia, só que na direção da torre mais distante — o rei se move duas casas, a torre salta por cima dele.",
    },
    {
        code: "e.p.",
        name: "En passant",
        desc: "Se um peão adversário avança duas casas de uma vez e passa ao lado do seu, você pode capturá-lo como se ele tivesse andado só uma — mas só no lance imediatamente seguinte.",
    },
    {
        code: "=Q",
        name: "Promoção",
        desc: "Um peão que chega até a última fileira vira outra peça, quase sempre uma dama. Um soldado raso virando general.",
    },
];

const END_STATES: Rule[] = [
    {
        code: "+",
        name: "Xeque",
        desc: "O rei está sob ataque direto. É obrigatório sair do xeque no lance seguinte — mover o rei, bloquear o ataque ou capturar quem ataca.",
    },
    {
        code: "#",
        name: "Xeque-mate",
        desc: "O rei está em xeque e não existe nenhum lance legal para escapar. A partida termina ali.",
    },
    {
        code: "½–½",
        name: "Empate",
        desc: "Por afogamento (sem xeque, mas sem lance legal), repetição de posição três vezes, ou material insuficiente para dar mate.",
    },
];

function ChessBoard() {
    return (
        <div className="inline-flex flex-col select-none" aria-hidden="true">
            <div className="flex">
                <div className="flex flex-col justify-between pr-2 py-0.5 font-mono text-[10px] text-[#17171a]/40">
                    {RANKS.map((rank) => (
                        <span key={rank} className="h-8 flex items-center sm:h-9">
                            {rank}
                        </span>
                    ))}
                </div>
                <svg
                    viewBox="0 0 320 320"
                    className="w-64 h-64 sm:w-72 sm:h-72 shrink-0"
                    role="img"
                    aria-label="Tabuleiro de xadrez de 8 por 8 casas"
                >
                    {RANKS.map((rank, r) =>
                        FILES.map((file, f) => {
                            const isLight = (r + f) % 2 === 0;
                            return (
                                <rect
                                    key={`${file}${rank}`}
                                    x={f * 40}
                                    y={r * 40}
                                    width={40}
                                    height={40}
                                    fill={isLight ? "#e9e7e1" : "#17171a"}
                                />
                            );
                        })
                    )}
                </svg>
            </div>
            <div className="flex pl-6 pt-1 font-mono text-[10px] text-[#17171a]/40">
                {FILES.map((file) => (
                    <span key={file} className="w-8 text-center sm:w-9">
                        {file}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function Learn() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f2f1ee]">
            <Header />

            <main className="flex-1">
                {/* HERO */}
                <section className="px-6 sm:px-10 py-16 sm:py-24 border-b border-black/5">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="font-serif italic text-lg sm:text-xl text-[#17171a] tracking-[-0.01em]">
                            Antes de qualquer queda,
                        </p>
                        <div className="mt-1 flex justify-center">
                            <GlitchText
                                text="APRENDA AS REGRAS"
                                tone="left"
                                className="font-mono font-extrabold uppercase tracking-wide leading-none text-3xl sm:text-5xl"
                            />
                        </div>
                        <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#17171a]/70 max-w-xl mx-auto">
                            O xadrez moderno tomou a forma que conhecemos por volta do século XV, quando a
                            dama e o bispo ganharam os movimentos de longo alcance que usamos até hoje. As
                            regras abaixo são a base sobre a qual toda partida — e toda queda de um rei — se
                            constrói.
                        </p>
                    </div>
                </section>

                {/* BOARD */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-center">
                        <div className="flex justify-center">
                            <ChessBoard />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em]">
                                O tabuleiro
                            </p>
                            <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1">
                                64 casas, 8 fileiras
                            </p>
                            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#17171a]/70 max-w-md mx-auto md:mx-0">
                                O tabuleiro tem 64 casas alternadas entre claras e escuras, organizadas em 8
                                colunas e 8 fileiras. Cada jogador começa com a casa clara no canto direito.
                            </p>
                            <p className="font-mono text-xs tracking-wider text-[#17171a]/60 mt-4 leading-relaxed max-w-md mx-auto md:mx-0">
                                Cada casa tem um endereço: a letra da coluna (a–h) mais o número da fileira
                                (1–8). "e4" é sempre a mesma casa, em qualquer partida do mundo — é assim que os
                                lances são registrados.
                            </p>
                        </div>
                    </div>
                </section>

                {/* PIECES */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center">
                            <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em]">
                                Seis peças,
                            </p>
                            <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-3xl sm:text-5xl text-[#17171a] mt-1">
                                seis destinos
                            </p>
                        </div>

                        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
                            {PIECES.map((piece) => (
                                <div key={piece.code} className="bg-[#f2f1ee] p-6 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-4xl leading-none text-[#17171a]" aria-hidden="true">
                                            {piece.symbol}
                                        </span>
                                        <span className="font-mono text-xs tracking-wider text-[#17171a]/40">
                                            {piece.code}
                                        </span>
                                    </div>
                                    <p className="font-serif italic text-lg text-[#17171a]">{piece.name}</p>
                                    <p className="text-sm leading-relaxed text-[#17171a]/70">{piece.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SPECIAL MOVES */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-3xl mx-auto">
                        <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em] text-center">
                            Quatro exceções
                        </p>
                        <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1 text-center">
                            que valem a regra
                        </p>

                        <dl className="mt-12 divide-y divide-black/10 border-t border-b border-black/10">
                            {SPECIAL_MOVES.map((rule) => (
                                <div key={rule.code} className="py-6 grid sm:grid-cols-[100px_1fr] gap-2 sm:gap-6">
                                    <dt className="font-mono font-bold text-sm text-[#17171a]">{rule.code}</dt>
                                    <dd>
                                        <p className="font-serif italic text-base text-[#17171a]">{rule.name}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-[#17171a]/70">{rule.desc}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* END OF GAME */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-3xl mx-auto">
                        <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em] text-center">
                            Como uma partida
                        </p>
                        <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1 text-center">
                            chega ao fim
                        </p>

                        <dl className="mt-12 divide-y divide-black/10 border-t border-b border-black/10">
                            {END_STATES.map((rule) => (
                                <div key={rule.code} className="py-6 grid sm:grid-cols-[100px_1fr] gap-2 sm:gap-6">
                                    <dt className="font-mono font-bold text-sm text-[#17171a]">{rule.code}</dt>
                                    <dd>
                                        <p className="font-serif italic text-base text-[#17171a]">{rule.name}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-[#17171a]/70">{rule.desc}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 sm:px-10 py-16 sm:py-24 text-center">
                    <p className="font-serif italic text-lg sm:text-xl text-[#17171a]">Regras aprendidas.</p>
                    <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1">
                        Hora do primeiro lance
                    </p>
                    <Link
                        to="/"
                        className="inline-block mt-8 font-mono text-xs tracking-wider uppercase border border-[#17171a]/20 px-6 py-3 text-[#17171a] hover:bg-[#17171a] hover:text-[#f2f1ee] transition-colors"
                    >
                        Voltar para o início
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}