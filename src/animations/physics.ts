import gsap from "gsap";
import Draggable from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export const createVelocitySkewSystem = (elements: HTMLElement[]) => {
  return {
    update: (velocity: number) => {
      const skewAmount = gsap.utils.clamp(-12, 12, velocity / 250);
      gsap.to(elements, { 
        skewY: skewAmount, 
        x: skewAmount * 2, // Slight x translation
        duration: 0.4, 
        ease: 'power2.out',
        overwrite: 'auto'
      });
    },
    destroy: () => {
      gsap.killTweensOf(elements);
      gsap.set(elements, { skewY: 0, x: 0 });
    }
  };
};

export const applyDragPhysics = (element: HTMLElement, options: { bounds?: HTMLElement; returnDuration?: number } = {}) => {
  const draggables = Draggable.create(element, {
    bounds: options.bounds,
    type: "x,y",
    inertia: true,
    onDrag: function() {
      const velX = this.getVelocity ? this.getVelocity("x") : this.deltaX * 50; 
      const rotation = gsap.utils.clamp(-25, 25, velX / 50);
      gsap.to(element, { rotation: rotation, duration: 0.2, overwrite: 'auto' });
    },
    onRelease: function() {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: options.returnDuration || 0.8,
        ease: "elastic.out(1, 0.4)"
      });
    }
  });

  return {
    destroy: () => {
      draggables[0].kill();
      gsap.killTweensOf(element);
    }
  };
};
