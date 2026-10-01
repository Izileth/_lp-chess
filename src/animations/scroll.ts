import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const createScrollAnimations = (scope: HTMLElement): (() => void) => {
  const ctx = gsap.context(() => {
    // A) Image reveals
    const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
    reveals.forEach(el => {
      const type = el.dataset.reveal;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });

      if (type === 'clip-polygon') {
        tl.fromTo(el, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, ease: 'power3.inOut' });
      } else if (type === 'scale-overflow') {
        const img = el.querySelector('img');
        if (img) tl.fromTo(img, { scale: 1.2 }, { scale: 1, duration: 1.2, ease: 'power2.out' });
      } else if (type === 'mask-h') {
        tl.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'left center' });
      } else if (type === 'mask-v') {
        tl.fromTo(el, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: 'power3.inOut', transformOrigin: 'bottom center' });
      } else if (type === 'zoom-out') {
        tl.fromTo(el, { scale: 1.3 }, { scale: 1, duration: 1.2, ease: 'power3.out' });
      } else if (type === 'overlay') {
        const overlay = el.querySelector('.reveal-overlay');
        if (overlay) {
          tl.fromTo(overlay, { xPercent: 0 }, { xPercent: 100, duration: 1, ease: 'power3.inOut' });
        }
      }
    });

    // B) Text reveals
    const textReveals = gsap.utils.toArray<HTMLElement>('[data-text-reveal]');
    textReveals.forEach(el => {
      const chars = Array.from(el.innerText).map(c => <span style="display:inline-block; overflow:hidden;"><span style="display:inline-block;"></span></span>).join('');
      el.innerHTML = chars;
      const spans = el.querySelectorAll('span > span');
      gsap.fromTo(spans, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.02, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }
      );
    });

    // C) Parallax
    const parallaxEls = gsap.utils.toArray<HTMLElement>('[data-parallax]');
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax || '0');
      gsap.to(el, {
        y: () => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // D) Counter
    const counters = gsap.utils.toArray<HTMLElement>('[data-counter]');
    counters.forEach(el => {
      const target = parseFloat(el.dataset.counter || '0');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
        onUpdate: () => { el.innerHTML = Math.floor(obj.val).toString(); }
      });
    });

  }, scope);

  return () => ctx.revert();
};
