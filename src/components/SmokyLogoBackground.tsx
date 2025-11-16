import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import smokingSnakesLogo from '@/assets/smoking-snakes-logo.png';

gsap.registerPlugin(ScrollTrigger);

export const SmokyLogoBackground = () => {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        y: 50,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={logoRef}
      className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
      style={{
        transform: 'translateY(-50px)',
      }}
    >
      <img
        src={smokingSnakesLogo}
        alt="Smoking Snakes Logo Background"
        className="w-[70vw] md:w-[60vw] lg:w-[50vw] max-w-4xl h-auto object-contain"
        style={{
          opacity: 0.2,
          filter: 'blur(5px) brightness(0.8) contrast(0.9)',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
};
