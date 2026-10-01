import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const tracker = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        velocityRef.current = self.getVelocity();
        // Use a throttle or quickSetter if passing this directly to state becomes too heavy
        setVelocity(self.getVelocity());
      }
    });

    return () => {
      tracker.kill();
    };
  }, []);

  return velocity;
}
