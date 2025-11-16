import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import smokingSnakesLogo from '@/assets/smoking-snakes-logo.png';

export const AnimatedLogo = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!logoRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Floating animation
      gsap.to(imageRef.current, {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Subtle glow pulse
      gsap.to(imageRef.current, {
        filter: 'brightness(1.1) drop-shadow(0 0 20px rgba(139, 0, 0, 0.4))',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={logoRef} className="relative w-32 h-32 md:w-40 md:h-40">
      {/* Smoke effect - bottom layer */}
      <div className="smoke-effect smoke-effect-1" />
      <div className="smoke-effect smoke-effect-2" />
      
      {/* Logo image */}
      <img
        ref={imageRef}
        src={smokingSnakesLogo}
        alt="Smoking Snakes LATAM"
        className="relative z-10 w-full h-full object-contain"
        style={{ filter: 'drop-shadow(0 0 15px rgba(139, 0, 0, 0.3))' }}
      />

      <style>{`
        .smoke-effect {
          position: absolute;
          width: 120%;
          height: 120%;
          left: -10%;
          top: -10%;
          pointer-events: none;
          opacity: 0.15;
          background: radial-gradient(
            ellipse at center,
            rgba(139, 0, 0, 0.3) 0%,
            rgba(139, 0, 0, 0.1) 30%,
            transparent 70%
          );
          filter: blur(20px);
          animation: smoke-rise 8s ease-in-out infinite;
        }

        .smoke-effect-1 {
          animation-delay: 0s;
        }

        .smoke-effect-2 {
          animation-delay: 4s;
          opacity: 0.1;
        }

        @keyframes smoke-rise {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-30px) scale(1.1);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};
