import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hammer, Sword, Shield, Package, Home as HomeIcon, FlaskConical, UtensilsCrossed, Gem, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const professions = [
  { key: 'blacksmith', master: 'Betonera', icon: Hammer },
  { key: 'weaponsmith', master: 'Arkhas', icon: Sword },
  { key: 'armorsmith', master: 'Lukitaa', icon: Shield },
  { key: 'leatherworker', master: 'Kazuya', icon: Package },
  { key: 'builder', master: null, icon: HomeIcon },
  { key: 'alchemist', master: 'Faiou', icon: FlaskConical },
  { key: 'farmer', master: 'Sucram', icon: UtensilsCrossed },
  { key: 'jewelry', master: null, icon: Gem },
  { key: 'recruiter', master: 'Sucram', icon: Users },
];

export const Professions = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.from(cards, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
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
        {t('professions.title')}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {professions.map((profession, index) => {
          const Icon = profession.icon;
          return (
            <div
              key={profession.key}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="glass-card glass-hover p-6 rounded-xl text-center"
            >
              <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="text-lg font-cinzel font-bold mb-2">
                {t(`professions.${profession.key}`)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {profession.master || t('professions.awaiting')}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
