import gsap from "gsap";

export class CursorAnimation {
  xTo: Function;
  yTo: Function;

  constructor(cursorElement: HTMLElement) {
    // Utilize gsap.quickTo() para suavizar os movimentos.
    this.xTo = gsap.quickTo(cursorElement, "x", { duration: 0.4, ease: "power3" });
    this.yTo = gsap.quickTo(cursorElement, "y", { duration: 0.4, ease: "power3" });
  }

  update(x: number, y: number) {
    this.xTo(x);
    this.yTo(y);
  }
}
