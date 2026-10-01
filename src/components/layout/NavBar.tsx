import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { initNavAnimation } from "../../animations/navigation";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  label: string;
  to: string;
}

const NAV_LINKS: NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Aprenda", to: "/aprenda" },
  { label: "Táticas", to: "/taticas" },
];

/**
 * NavBar
 *
 * Cinematographic navigation:
 * - Starts transparent / no backdrop
 * - On scroll: blur + semi-transparent bg (driven by initNavAnimation)
 * - Hides when scrolling down fast, reveals on scroll up
 * - Mobile menu: staggered link reveal via GSAP (not CSS transition)
 * - All link hovers: animated underline drawn left-to-right
 */
export default function NavBar() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);
  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  linkRefs.current = [];

  const addLinkRef = (el: HTMLAnchorElement | null) => {
    if (el && !linkRefs.current.includes(el)) linkRefs.current.push(el);
  };

  // Init scroll-driven nav animation
  useEffect(() => {
    if (!navRef.current) return;
    const cleanup = initNavAnimation(navRef.current);
    return cleanup;
  }, []);

  // Build mobile menu GSAP timeline once on mount
  useEffect(() => {
    if (!menuRef.current || linkRefs.current.length === 0) return;

    // Initial state: menu hidden
    gsap.set(menuRef.current, { autoAlpha: 0, y: -8 });
    gsap.set(linkRefs.current, { opacity: 0, x: 20 });

    menuTlRef.current = gsap
      .timeline({ paused: true })
      .to(menuRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
        ease: "power3.out",
      })
      .to(
        linkRefs.current,
        {
          opacity: 1,
          x: 0,
          stagger: 0.07,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.1"
      );

    return () => {
      menuTlRef.current?.kill();
    };
  }, []);

  function toggleMenu() {
    if (!menuTlRef.current) return;
    if (isOpenRef.current) {
      menuTlRef.current.reverse();
    } else {
      menuTlRef.current.play();
    }
    isOpenRef.current = !isOpenRef.current;
  }

  function closeMenu() {
    if (isOpenRef.current) {
      menuTlRef.current?.reverse();
      isOpenRef.current = false;
    }
  }

  // Animated underline on desktop links
  function handleLinkEnter(e: React.MouseEvent<HTMLAnchorElement>) {
    const underline = e.currentTarget.querySelector<HTMLSpanElement>(".nav-underline");
    if (!underline) return;
    gsap.fromTo(underline, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.35, ease: "power3.out" });
  }

  function handleLinkLeave(e: React.MouseEvent<HTMLAnchorElement>) {
    const underline = e.currentTarget.querySelector<HTMLSpanElement>(".nav-underline");
    if (!underline) return;
    gsap.to(underline, { scaleX: 0, transformOrigin: "right center", duration: 0.25, ease: "power2.in" });
  }

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
        style={{ backdropFilter: "blur(0px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            data-cursor="link"
            className="flex items-baseline gap-1.5 select-none"
          >
            <span className="font-serif italic text-base sm:text-lg text-[#f2f1ee]">
              Fallen
            </span>
            <span className="font-mono font-extrabold uppercase text-sm sm:text-base text-[#f2f1ee]">
              King
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.to}
                data-cursor="link"
                className="relative font-mono text-xs tracking-widest uppercase text-[#f2f1ee]/70 hover:text-[#f2f1ee] transition-colors duration-200"
                onMouseEnter={handleLinkEnter}
                onMouseLeave={handleLinkLeave}
              >
                {link.label}
                <span
                  className="nav-underline absolute left-0 bottom-0 w-full h-px bg-[#f2f1ee] block"
                  style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
                />
              </a>
            ))}
          </nav>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label="Abrir menu"
            className="sm:hidden relative w-9 h-9 -mr-2 flex flex-col items-center justify-center gap-[5px]"
            onClick={toggleMenu}
          >
            <span className="block w-5 h-[1.5px] rounded-full bg-[#f2f1ee] transition-transform" />
            <span className="block w-5 h-[1.5px] rounded-full bg-[#f2f1ee] transition-transform" />
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      <div
        ref={menuRef}
        className="sm:hidden fixed top-16 left-0 right-0 z-40 bg-[#0d0d0f]/95 border-b border-[#f2f1ee]/10"
        style={{ visibility: "hidden" }}
      >
        <nav className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              ref={addLinkRef}
              href={link.to}
              onClick={closeMenu}
              className="py-4 font-mono text-sm uppercase tracking-widest text-[#f2f1ee]/70 hover:text-[#f2f1ee] transition-colors border-b border-[#f2f1ee]/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
