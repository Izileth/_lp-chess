import gsap from "gsap";

export const createHeroAnimation = (container: HTMLElement | string) => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  // 1. Background começa completamente oculto.
  // 2. Uma máscara vertical abre lentamente.
  // 3. Imagem principal aparece através de clip-path.
  // 4. Imagem realiza um pequeno scale de 1.15 -> 1.
  // ... and so on
  
  return tl;
};
