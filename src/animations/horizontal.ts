import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const createHorizontalScrollSection = (container: HTMLElement, track: HTMLElement, cards: HTMLElement[]): (() => void) => {
  const ctx = gsap.context(() => {
    const scrollWidth = track.scrollWidth - window.innerWidth;
    
    const mainSt = gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`
      }
    });

    cards.forEach(card => {
      const image = card.querySelector('.card-image');
      const title = card.querySelector('.card-title');

      if (image) {
        gsap.to(image, {
          x: () => card.offsetWidth * 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainSt,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        });
      }

      if (title) {
        gsap.to(title, {
          x: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainSt,
            start: 'left right',
            end: 'right left',
            scrub: true
          }
        });
      }

      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: mainSt,
            start: 'left 80%',
          }
        }
      );
    });

    const progressBar = container.querySelector('.scroll-progress-bar');
    if (progressBar) {
      gsap.fromTo(progressBar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            scrub: 1
          }
        }
      );
    }
  }, container);

  return () => ctx.revert();
};
