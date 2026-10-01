import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initNavAnimation = (nav: HTMLElement): (() => void) => {
  const st = ScrollTrigger.create({
    start: 'top -80',
    onEnter: () => {
      gsap.to(nav, { 
        backdropFilter: 'blur(12px)', 
        backgroundColor: 'rgba(242,241,238,0.85)', 
        borderBottomColor: 'rgba(0,0,0,0.08)', 
        duration: 0.4, 
        ease: 'power2.out' 
      });
    },
    onLeaveBack: () => {
      gsap.to(nav, { 
        backdropFilter: 'blur(0px)', 
        backgroundColor: 'transparent', 
        borderBottomColor: 'transparent', 
        duration: 0.4, 
        ease: 'power2.out' 
      });
    },
    onUpdate: (self) => {
      if (self.direction === 1 && self.scroll() > 200) {
        // Scrolling down fast
        gsap.to(nav, { y: '-100%', duration: 0.3, ease: 'power2.out' });
      } else if (self.direction === -1) {
        // Scrolling up
        gsap.to(nav, { y: '0%', duration: 0.3, ease: 'power2.out' });
      }
    }
  });

  return () => {
    st.kill();
  };
};
