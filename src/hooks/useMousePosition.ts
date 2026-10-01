import { useState, useEffect } from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const nx = (x / window.innerWidth) * 2 - 1;
      const ny = (y / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y, nx, ny });
    };

    const handleMouseEnter = () => setIsOnScreen(true);
    const handleMouseLeave = () => setIsOnScreen(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { ...mousePosition, isOnScreen };
}
