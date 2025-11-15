import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const missionsData = [
  {
    id: 1,
    key: 'mission1',
    type: 'resource',
    status: 'active',
  },
  {
    id: 2,
    key: 'mission2',
    type: 'combat',
    status: 'active',
  },
  {
    id: 3,
    key: 'mission3',
    type: 'exploration',
    status: 'pending',
  },
  {
    id: 4,
    key: 'mission4',
    type: 'construction',
    status: 'completed',
  },
];

export const Missions = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-green-700 text-primary-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-12 text-center text-primary">
        {t('missions.title')}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {missionsData.map((mission, index) => (
          <div
            key={mission.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="glass-card glass-hover p-6 rounded-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-cinzel font-bold">
                {t(`missions.${mission.key}.title`)}
              </h3>
              <Badge className={getStatusColor(mission.status)}>
                {t(`missions.status.${mission.status}`)}
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3">
              {t(`missions.${mission.key}.description`)}
            </p>
            <Badge variant="outline">{t(`missions.type.${mission.type}`)}</Badge>
          </div>
        ))}
      </div>
    </section>
  );
};
