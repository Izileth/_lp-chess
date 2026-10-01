import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollVelocity() {
  const [velocityData, setVelocityData] = useState<{ velocity: number; direction: 1 | -1 | 0 }>({ velocity: 0, direction: 0 });
  const smoothedVelocity = useRef(0);

  useEffect(() => {
    const setSmoothed = gsap.quickSetter(smoothedVelocity, "current");

    const tracker = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const rawVel = self.getVelocity();
        const clampedVel = gsap.utils.clamp(-3000, 3000, rawVel);
        
        // Simple lerp for smoothing
        smoothedVelocity.current = gsap.utils.interpolate(smoothedVelocity.current, clampedVel, 0.2);
        
        setVelocityData({
          velocity: smoothedVelocity.current,
          direction: self.direction as 1 | -1 | 0
        });
      }
    });

    return () => {
      tracker.kill();
    };
  }, []);

  return velocityData;
}
