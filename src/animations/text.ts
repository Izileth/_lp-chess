import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealOptions {
  type?: 'words' | 'chars';
  stagger?: number;
  delay?: number;
  fromY?: number;
  blur?: boolean;
  scrollTrigger?: ScrollTrigger.Vars;
}

export const splitAndRevealText = (element: HTMLElement, options: TextRevealOptions = {}): gsap.core.Timeline => {
  const { type = 'words', stagger = 0.05, delay = 0, fromY = 40, blur = false, scrollTrigger } = options;
  
  const text = element.innerText;
  const parts = type === 'words' ? text.split(' ') : text.split('');
  
  const html = parts.map(p => <span style="display:inline-block; overflow:hidden;"><span style="display:inline-block;"></span></span>).join(type === 'words' ? ' ' : '');
  element.innerHTML = html;

  const innerSpans = element.querySelectorAll('span > span');
  
  const tl = gsap.timeline({ scrollTrigger });
  tl.fromTo(innerSpans, 
    { y: fromY, opacity: 0, filter: blur ? 'blur(8px)' : 'none' },
    { y: 0, opacity: 1, filter: 'blur(0px)', stagger, delay, duration: 0.6, ease: 'power3.out' }
  );

  return tl;
};

export const animateTrackingExpand = (element: HTMLElement, from: number, to: number): gsap.core.Tween => {
  const proxy = { letterSpacing: from };
  return gsap.to(proxy, {
    letterSpacing: to,
    duration: 1,
    ease: 'power2.out',
    onUpdate: () => {
      element.style.letterSpacing = ${proxy.letterSpacing}em;
    }
  });
};

export const createScrambleEffect = (element: HTMLElement, finalText: string, duration = 1): gsap.core.Timeline => {
  const tl = gsap.timeline();
  const chars = '♔♕♖♗♘♙♚♛♜♝♞♟';
  const proxy = { progress: 0 };
  
  tl.to(proxy, {
    progress: 1,
    duration,
    ease: 'none',
    onUpdate: () => {
      const length = finalText.length;
      const revealCount = Math.floor(proxy.progress * length);
      let newStr = '';
      for (let i = 0; i < length; i++) {
        if (i < revealCount) {
          newStr += finalText[i];
        } else {
          newStr += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      element.innerText = newStr;
    }
  });

  return tl;
};

export const createHorizontalTextDrift = (element: HTMLElement, speedMultiplier = 1) => {
  return {
    update: (velocity: number) => {
      const xAmount = gsap.utils.clamp(-30, 30, velocity * speedMultiplier);
      gsap.to(element, { x: xAmount, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    },
    destroy: () => {
      gsap.killTweensOf(element);
      gsap.set(element, { x: 0 });
    }
  };
};
