import gsap from "gsap";

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  innerStrength?: number;
}

export const makeMagnetic = (element: HTMLElement, options: MagneticOptions = {}): (() => void) => {
  const { strength = 0.4, radius = 100, innerStrength = 0.2 } = options;
  const innerElement = element.firstElementChild as HTMLElement;

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const deltaX = distanceX;
      const deltaY = distanceY;

      gsap.to(element, { x: deltaX * strength, y: deltaY * strength, duration: 0.4, ease: 'power3.out' });
      if (innerElement) {
        gsap.to(innerElement, { x: -deltaX * innerStrength, y: -deltaY * innerStrength, duration: 0.4, ease: 'power3.out' });
      }
    } else {
      gsap.to(element, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      if (innerElement) {
        gsap.to(innerElement, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      }
    }
  };

  window.addEventListener('mousemove', onMouseMove);

  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    gsap.set(element, { clearProps: 'x,y' });
    if (innerElement) gsap.set(innerElement, { clearProps: 'x,y' });
  };
};
