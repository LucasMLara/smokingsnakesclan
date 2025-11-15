import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ScrollProgressBar = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!progressRef.current) return;

      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      gsap.to(progressRef.current, {
        width: `${scrolled}%`,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-deep-black/30">
      <div
        ref={progressRef}
        className="h-full bg-blood-red shadow-glow transition-all"
        style={{ width: '0%' }}
      />
    </div>
  );
};
