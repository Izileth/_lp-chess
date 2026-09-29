import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

interface NavItem {
    label: string;
    to: string;
}

const NAV_LINKS: NavItem[] = [
    { label: "Início", to: "/" },
    { label: "Aprenda", to: "/aprenda" },
    { label: "Táticas", to: "/taticas" },
];

export default function Header() {
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
        <header className="w-full border-b border-black/5 relative z-50 bg-[#f2f1ee]">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-baseline gap-1.5 select-none">
                    <span className="font-serif italic text-base sm:text-lg text-[#17171a]">Fallen</span>
                    <span className="font-mono font-extrabold uppercase text-sm sm:text-base text-[#17171a]">
                        King
                    </span>
                </Link>

                <nav className="hidden sm:flex items-center gap-8 text-xs font-medium tracking-wide text-[#17171a]">
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.to}
                            end={link.to === "/"}
                            className={({ isActive }) =>
                                `transition-opacity ${isActive ? "opacity-100" : "opacity-70 hover:opacity-100"}`
                            }
                        >
                            {link.label}
                        </NavLink>
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
                            <NavLink
                                key={link.label}
                                to={link.to}
                                end={link.to === "/"}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `py-4 text-sm font-medium transition-all duration-300 ease-out motion-reduce:transition-none ${isActive ? "text-[#17171a]" : "text-[#17171a]/70"
                                    }`
                                }
                                style={{
                                    transitionDelay: isOpen ? `${60 + i * 60}ms` : "0ms",
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                                }}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}