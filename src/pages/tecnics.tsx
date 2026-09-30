import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import GlitchText from "../components/ui/GlitchText";
import MiniBoard from "../components/layout/Miniboard";

/**
 * ChessTactics ("/taticas")
 * -------------------------------------------------------------------------
 * Routed from the shared <Header /> nav ("Táticas" link — see Header.tsx).
 * Sits after /aprenda in the learning path: rules first, patterns second.
 * Needs the same font + tailwind.config setup described at the top of
 * FallenKingLanding.tsx.
 * -------------------------------------------------------------------------
 */

interface Principle {
    step: string;
    title: string;
    desc: string;
}

const PRINCIPLES: Principle[] = [
    {
        step: "01",
        title: "Controle o centro",
        desc: "Ocupe ou pressione e4, d4, e5 e d5 com peões e peças. Quem domina o centro tem mais espaço para manobrar.",
    },
    {
        step: "02",
        title: "Desenvolva antes de atacar",
        desc: "Tire cavalos e bispos de suas casas iniciais antes de mover a mesma peça duas vezes.",
    },
    {
        step: "03",
        title: "Proteja o rei cedo",
        desc: "O roque costuma acontecer antes do décimo lance — um rei no centro é um rei em perigo.",
    },
    {
        step: "04",
        title: "Não traga a dama cedo demais",
        desc: "Ela vira alvo fácil de peças menores, e cada ataque a ela custa um tempo de desenvolvimento.",
    },
];

interface OpeningPiece {
    square: string;
    symbol: string;
    white: boolean;
}

interface Opening {
    name: string;
    moves: string;
    idea: string;
    pieces: OpeningPiece[];
    highlight?: string[];
}

const OPENINGS: Opening[] = [
    {
        name: "Italiana",
        moves: "1.e4 e5 2.Nf3 Nc6 3.Bc4",
        idea: "O bispo sai direto para c4, mirando f7 — o ponto mais frágil do adversário logo no início da partida.",
        pieces: [
            { square: "e4", symbol: "♟", white: true },
            { square: "e5", symbol: "♟", white: false },
            { square: "f3", symbol: "♞", white: true },
            { square: "c6", symbol: "♞", white: false },
            { square: "c4", symbol: "♝", white: true },
        ],
        highlight: ["f7"],
    },
    {
        name: "Espanhola",
        moves: "1.e4 e5 2.Nf3 Nc6 3.Bb5",
        idea: "O bispo em b5 pressiona o cavalo que defende o peão e5 — uma das aberturas mais estudadas da história do xadrez.",
        pieces: [
            { square: "e4", symbol: "♟", white: true },
            { square: "e5", symbol: "♟", white: false },
            { square: "f3", symbol: "♞", white: true },
            { square: "c6", symbol: "♞", white: false },
            { square: "b5", symbol: "♝", white: true },
        ],
        highlight: ["c6"],
    },
    {
        name: "Siciliana",
        moves: "1.e4 c5",
        idea: "A resposta mais jogada contra 1.e4 em nível de elite: luta assimétrica pelo centro desde o primeiro lance.",
        pieces: [
            { square: "e4", symbol: "♟", white: true },
            { square: "c5", symbol: "♟", white: false },
        ],
    },
    {
        name: "Francesa",
        moves: "1.e4 e6",
        idea: "Estrutura sólida, mas o bispo de casas claras fica preso atrás dos próprios peões por um bom tempo.",
        pieces: [
            { square: "e4", symbol: "♟", white: true },
            { square: "e6", symbol: "♟", white: false },
        ],
        highlight: ["c8"],
    },
    {
        name: "Caro-Kann",
        moves: "1.e4 c6",
        idea: "Ideia parecida com a Francesa, só que liberta o bispo de casas claras antes de fechar o centro.",
        pieces: [
            { square: "e4", symbol: "♟", white: true },
            { square: "c6", symbol: "♟", white: false },
        ],
    },
    {
        name: "Gambito da Dama",
        moves: "1.d4 d5 2.c4",
        idea: "Oferece um peão em troca de espaço e controle do centro — aceito ou recusado, define o resto da partida.",
        pieces: [
            { square: "d4", symbol: "♟", white: true },
            { square: "d5", symbol: "♟", white: false },
            { square: "c4", symbol: "♟", white: true },
        ],
        highlight: ["d5"],
    },
];

interface Tactic {
    code: string;
    name: string;
    desc: string;
}

const TACTICS: Tactic[] = [
    {
        code: "GF",
        name: "Garfo",
        desc: "Uma peça ataca duas ou mais peças adversárias ao mesmo tempo — o cavalo é o especialista nisso. Só dá para salvar uma.",
    },
    {
        code: "CR",
        name: "Cravada",
        desc: "Uma peça não pode se mover sem expor outra mais valiosa — ou o próprio rei — a um ataque logo atrás dela.",
    },
    {
        code: "ES",
        name: "Espeto",
        desc: "O inverso da cravada: a peça mais valiosa é atacada primeiro e, ao fugir, expõe a peça que estava escondida atrás dela.",
    },
    {
        code: "XD",
        name: "Xeque duplo",
        desc: "Duas peças dão xeque ao mesmo tempo, geralmente por um lance de descoberta. O rei é a única peça que pode se mexer.",
    },
    {
        code: "AD",
        name: "Ataque descoberto",
        desc: "Uma peça se move e revela o ataque de outra que estava atrás dela, criando duas ameaças com um único lance.",
    },
    {
        code: "DF",
        name: "Deflexão",
        desc: "Um sacrifício ou uma ameaça força uma peça defensora a abandonar seu posto, abrindo caminho para outro ataque.",
    },
];

export default function ChessTactics() {
    return (
        <div className="min-h-screen flex flex-col bg-[#f2f1ee]">
            <Header />

            <main className="flex-1">
                {/* HERO */}
                <section className="px-6 sm:px-10 py-16 sm:py-24 border-b border-black/5">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="font-serif italic text-lg sm:text-xl text-[#17171a] tracking-[-0.01em]">
                            Regras dominadas.
                        </p>
                        <div className="mt-1 flex justify-center">
                            <GlitchText
                                text="AGORA, OS PADRÕES"
                                tone="right"
                                className="font-mono font-extrabold uppercase tracking-wide leading-none text-3xl sm:text-5xl"
                            />
                        </div>
                        <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#17171a]/70 max-w-xl mx-auto">
                            Saber como as peças se movem é só o começo. O que decide a maioria das partidas são
                            aberturas bem escolhidas e a capacidade de enxergar os mesmos padrões táticos que
                            se repetem, com pequenas variações, em milhões de tabuleiros diferentes.
                        </p>
                    </div>
                </section>

                {/* OPENING PRINCIPLES */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-4xl mx-auto">
                        <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em] text-center">
                            Antes de decorar aberturas,
                        </p>
                        <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1 text-center">
                            entenda os princípios
                        </p>

                        <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-8">
                            {PRINCIPLES.map((p) => (
                                <div key={p.step} className="flex gap-4">
                                    <span className="font-mono text-xs tracking-wider text-[#17171a]/40 pt-1 shrink-0">
                                        {p.step}
                                    </span>
                                    <div>
                                        <p className="font-serif italic text-lg text-[#17171a]">{p.title}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-[#17171a]/70">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* OPENINGS — one entry at a time, alternating sides, each with its own diagram */}
                <section className="px-6 sm:px-10 py-16 sm:py-24 border-b border-black/5">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center">
                            <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em]">
                                Seis entradas
                            </p>
                            <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-3xl sm:text-5xl text-[#17171a] mt-1">
                                que todo jogador conhece
                            </p>
                        </div>

                        <div className="mt-16 flex flex-col">
                            {OPENINGS.map((o, i) => {
                                const isEven = i % 2 === 0;
                                return (
                                    <div
                                        key={o.name}
                                        className={`py-10 sm:py-12 grid sm:grid-cols-[auto_1fr] gap-8 sm:gap-14 items-center border-t border-black/10 ${
                                            i === OPENINGS.length - 1 ? "border-b" : ""
                                        }`}
                                    >
                                        <div
                                            className={`flex flex-col items-center gap-4 ${
                                                isEven ? "sm:order-1" : "sm:order-2"
                                            }`}
                                        >
                                            <span className="font-mono text-xs tracking-wider text-[#17171a]/30">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <MiniBoard
                                                pieces={o.pieces}
                                                highlight={o.highlight}
                                                accent={isEven ? "left" : "right"}
                                            />
                                        </div>

                                        <div
                                            className={`text-center sm:text-left ${
                                                isEven ? "sm:order-2" : "sm:order-1"
                                            }`}
                                        >
                                            <p className="font-serif italic text-2xl sm:text-3xl text-[#17171a]">
                                                {o.name}
                                            </p>
                                            <p className="font-mono text-xs sm:text-sm tracking-wide text-[#17171a]/50 mt-2">
                                                {o.moves}
                                            </p>
                                            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#17171a]/70 max-w-md mx-auto sm:mx-0">
                                                {o.idea}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* TACTICAL PATTERNS */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-3xl mx-auto">
                        <p className="font-serif italic text-xl sm:text-2xl text-[#17171a] tracking-[-0.01em] text-center">
                            Seis padrões
                        </p>
                        <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1 text-center">
                            que decidem partidas
                        </p>

                        <dl className="mt-12 divide-y divide-black/10 border-t border-b border-black/10">
                            {TACTICS.map((t) => (
                                <div key={t.code} className="py-6 grid sm:grid-cols-[100px_1fr] gap-2 sm:gap-6">
                                    <dt className="font-mono font-bold text-sm text-[#17171a]">{t.code}</dt>
                                    <dd>
                                        <p className="font-serif italic text-base text-[#17171a]">{t.name}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-[#17171a]/70">{t.desc}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* CLASSIC TRAP */}
                <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-black/5">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="font-serif italic text-lg sm:text-xl text-[#17171a] tracking-[-0.01em]">
                            Uma queda em quatro lances
                        </p>
                        <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1">
                            o mate do pastor
                        </p>

                        <div className="mt-8 inline-flex flex-wrap justify-center gap-x-4 gap-y-2 font-mono text-sm sm:text-base text-[#17171a] bg-black/[0.03] border border-black/10 px-6 py-4">
                            <span>1. e4 e5</span>
                            <span>2. Bc4 Bc5</span>
                            <span>3. Qh5 Nf6??</span>
                            <span className="text-[#b0231f] font-bold">4. Qxf7#</span>
                        </div>

                        <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#17171a]/70 max-w-lg mx-auto">
                            As pretas desenvolvem naturalmente, mas ignoram que a dama branca e o bispo já miram
                            a mesma casa: f7. No lance 3, a dama ameaça mate — e o cavalo em f6, por mais que
                            pareça uma boa jogada, não defende. É um rei caindo antes mesmo de o meio-jogo
                            começar.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="px-6 sm:px-10 py-16 sm:py-24 text-center">
                    <p className="font-serif italic text-lg sm:text-xl text-[#17171a]">Padrões reconhecidos.</p>
                    <p className="font-mono font-extrabold uppercase tracking-wide leading-none text-2xl sm:text-4xl text-[#17171a] mt-1">
                        Agora é praticar
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            to="/aprenda"
                            className="inline-block font-mono text-xs tracking-wider uppercase border border-[#17171a]/20 px-6 py-3 text-[#17171a] hover:bg-[#17171a] hover:text-[#f2f1ee] transition-colors"
                        >
                            Rever a base
                        </Link>
                        <Link
                            to="/"
                            className="inline-block font-mono text-xs tracking-wider uppercase border border-transparent px-6 py-3 text-[#17171a]/60 hover:text-[#17171a] transition-colors"
                        >
                            Voltar para o início
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}