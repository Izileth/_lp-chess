import gsap from "gsap";

export type CursorHoverType = 'button' | 'link' | 'image' | 'draggable' | 'default';

export class CursorSystem {
  cursor: HTMLElement;
  dot: HTMLElement;
  halo: HTMLElement;
  xTo: Function;
  yTo: Function;
  xToHalo: Function;
  yToHalo: Function;
  xToDot: Function;
  yToDot: Function;

  constructor(els: { cursor: HTMLElement, dot: HTMLElement, halo: HTMLElement }) {
    this.cursor = els.cursor;
    this.dot = els.dot;
    this.halo = els.halo;

    this.xTo = gsap.quickTo(this.cursor, 'x', { duration: 0.5, ease: 'power3' });
    this.yTo = gsap.quickTo(this.cursor, 'y', { duration: 0.5, ease: 'power3' });
    
    this.xToHalo = gsap.quickTo(this.halo, 'x', { duration: 0.8, ease: 'power3' });
    this.yToHalo = gsap.quickTo(this.halo, 'y', { duration: 0.8, ease: 'power3' });

    this.xToDot = gsap.quickTo(this.dot, 'x', { duration: 0.1, ease: 'none' });
    this.yToDot = gsap.quickTo(this.dot, 'y', { duration: 0.1, ease: 'none' });
  }

  update(x: number, y: number) {
    this.xTo(x);
    this.yTo(y);
    this.xToHalo(x);
    this.yToHalo(y);
    this.xToDot(x);
    this.yToDot(y);
  }

  setHoverState(type: CursorHoverType) {
    switch (type) {
      case 'button':
        gsap.to(this.cursor, { scale: 2.5, duration: 0.3 });
        gsap.to(this.halo, { opacity: 0, duration: 0.3 });
        break;
      case 'link':
        gsap.to(this.cursor, { scale: 1.5, duration: 0.3 });
        gsap.to(this.halo, { opacity: 0.5, scale: 1, duration: 0.3 });
        break;
      case 'image':
        gsap.to(this.cursor, { scale: 1, scaleX: 1.4, duration: 0.3 });
        gsap.to(this.halo, { opacity: 0.2, scale: 0.8, duration: 0.3 });
        break;
      case 'draggable':
        gsap.to(this.cursor, { scale: 1.2, duration: 0.3 });
        gsap.to(this.halo, { rotation: 90, scale: 1.2, opacity: 0.8, duration: 0.3 });
        break;
      default:
        gsap.to(this.cursor, { scale: 1, scaleX: 1, duration: 0.3 });
        gsap.to(this.halo, { opacity: 1, scale: 1, rotation: 0, duration: 0.3 });
        break;
    }
  }

  setClickState(isDown: boolean) {
    gsap.to(this.cursor, { scale: isDown ? 0.8 : 1, duration: 0.15 });
  }

  destroy() {
    gsap.killTweensOf(this.cursor);
    gsap.killTweensOf(this.dot);
    gsap.killTweensOf(this.halo);
  }
}
