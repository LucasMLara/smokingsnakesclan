import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, Home, Swords } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  { key: 'phase1', icon: Wrench, color: 'text-primary' },
  { key: 'phase2', icon: Home, color: 'text-primary' },
  { key: 'phase3', icon: Swords, color: 'text-primary' },
];

export const Announcements = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-12 text-center text-primary">
        {t('announcements.title')}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {phases.map((phase, index) => {
          const Icon = phase.icon;
          return (
            <div
              key={phase.key}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="glass-card glass-hover p-6 rounded-xl"
            >
              <Icon className={`w-12 h-12 mb-4 ${phase.color}`} />
              <h3 className="text-xl font-cinzel font-bold mb-3">
                {t(`announcements.${phase.key}.title`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`announcements.${phase.key}.description`)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
