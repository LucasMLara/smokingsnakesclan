import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';
import { MissionModal, MissionProgress } from '@/components/modals/MissionModal';

gsap.registerPlugin(ScrollTrigger);

const missionsData = [
  {
    id: 1,
    key: 'mission1',
    type: 'resource',
    progress: [
      { label: 'Ferro coletado', current: 3500, target: 5000 },
      { label: 'Toras de madeira', current: 1200, target: 2000 },
    ],
  },
  {
    id: 2,
    key: 'mission2',
    type: 'combat',
    progress: [
      { label: 'Inimigos derrotados', current: 45, target: 50 },
    ],
  },
  {
    id: 3,
    key: 'mission3',
    type: 'exploration',
    progress: [
      { label: 'Áreas mapeadas', current: 0, target: 10 },
      { label: 'Recursos raros encontrados', current: 0, target: 5 },
    ],
  },
  {
    id: 4,
    key: 'mission4',
    type: 'construction',
    progress: [
      { label: 'Pedras lapidadas', current: 500, target: 500 },
      { label: 'Vigas de ferro', current: 100, target: 100 },
    ],
  },
];

export const Missions = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [selectedMission, setSelectedMission] = useState<{ key: string; type: string; progress: MissionProgress[] } | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length > 0) {
        // Set initial state
        gsap.set(cards, { opacity: 1, y: 0 });
        
        // Then animate from hidden state
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const calculateStatus = (progress: MissionProgress[]) => {
    const hasProgress = progress.some(p => p.current > 0);
    const allComplete = progress.every(p => p.current >= p.target);
    
    if (allComplete) return 'completed';
    if (hasProgress) return 'active';
    return 'pending';
  };

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
        {missionsData.map((mission, index) => {
          const status = calculateStatus(mission.progress);
          return (
            <div
              key={mission.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="glass-card glass-hover p-6 rounded-xl cursor-pointer transition-transform hover:scale-105"
              onClick={() => setSelectedMission({ key: mission.key, type: mission.type, progress: mission.progress })}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-cinzel font-bold">
                  {t(`missions.${mission.key}.title`)}
                </h3>
                <Badge className={getStatusColor(status)}>
                  {t(`missions.status.${status}`)}
                </Badge>
              </div>
              <p className="text-muted-foreground mb-3">
                {t(`missions.${mission.key}.description`)}
              </p>
              <Badge variant="outline">{t(`missions.type.${mission.type}`)}</Badge>
            </div>
          );
        })}
      </div>

      {selectedMission && (
        <MissionModal
          open={!!selectedMission}
          onOpenChange={() => setSelectedMission(null)}
          missionKey={selectedMission.key}
          type={selectedMission.type}
          progress={selectedMission.progress}
        />
      )}
    </section>
  );
};
