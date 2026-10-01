import gsap from "gsap";

export interface HeroElements {
  container: HTMLElement;
  mask: HTMLElement;
  image: HTMLElement;
  headline: HTMLElement[];
  decorativeLine: HTMLElement;
  subheadline: HTMLElement;
  cta: HTMLElement;
  backgroundLayers: HTMLElement[];
}

export const createHeroTimeline = (els: HeroElements): gsap.core.Timeline => {
  const masterTimeline = gsap.timeline();

  // 1. Start with container at opacity 0, then fade to 1 instantly
  masterTimeline.set(els.container, { opacity: 1 });

  // 2. Open vertical mask
  masterTimeline.fromTo(els.mask, 
    { clipPath: 'inset(0 0 100% 0)' },
    { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut' },
    "start"
  );

  // 3. Image scale
  masterTimeline.fromTo(els.image,
    { scale: 1.15, opacity: 0.08 },
    { scale: 1, opacity: 0.8, duration: 1.8, ease: 'power3.out' },
    "start+=0.2"
  );

  // 4. Headline words
  els.headline.forEach((word, index) => {
    const dir = word.dataset.direction ? parseInt(word.dataset.direction) : (index % 2 === 0 ? 1 : -1);
    masterTimeline.fromTo(word,
      { y: 60, opacity: 0, rotationX: -40, x: dir * 30 },
      { y: 0, opacity: 1, rotationX: 0, x: 0, duration: 0.8, ease: 'power3.out' },
      start+=
    );
  });

  // 5. Decorative line
  masterTimeline.fromTo(els.decorativeLine,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
    "start+=1.0"
  );

  // 6. Subheadline
  masterTimeline.fromTo(els.subheadline,
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
    "start+=1.2"
  );

  // 7. CTA
  masterTimeline.fromTo(els.cta,
    { y: 16, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
    "start+=1.4"
  );

  // 8. Ambient floating
  masterTimeline.add(() => {
    els.backgroundLayers.forEach((layer, i) => {
      gsap.to(layer, {
        y: () => (i + 1) * 10,
        x: () => (i + 1) * 5,
        rotation: () => (i % 2 === 0 ? 1 : -1) * 2,
        duration: 8 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  });

  return masterTimeline;
};
