import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

gsap.registerPlugin(ScrollTrigger);

const crafters = [
  { name: 'Betonera', score: 9850 },
  { name: 'Arkhas', score: 9200 },
  { name: 'Faiou', score: 8700 },
  { name: 'Lukitaa', score: 8400 },
  { name: 'Kazuya', score: 7900 },
];

const combatants = [
  { name: 'Arkhas', score: 12500 },
  { name: 'Lukitaa', score: 11200 },
  { name: 'Kazuya', score: 10800 },
  { name: 'Betonera', score: 9300 },
  { name: 'Sucram', score: 8600 },
];

export const Rankings = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const tablesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tables = tablesRef.current.filter(Boolean);
      if (tables.length > 0) {
        // Set initial visible state
        gsap.set(tables, { opacity: 1, y: 0 });
        
        // Animate from hidden
        gsap.from(tables, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
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

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-12 text-center text-primary">
        {t('rankings.title')}
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Crafters */}
        <div
          ref={(el) => {
            if (el) tablesRef.current[0] = el;
          }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-2xl font-cinzel font-bold mb-6 text-center">
            🛠️ {t('rankings.crafters')}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary">{t('rankings.name')}</TableHead>
                <TableHead className="text-right text-primary">{t('rankings.score')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crafters.map((player, index) => (
                <TableRow key={player.name}>
                  <TableCell className="font-medieval">
                    {index === 0 && '🥇 '}
                    {index === 1 && '🥈 '}
                    {index === 2 && '🥉 '}
                    {player.name}
                  </TableCell>
                  <TableCell className="text-right font-bold text-blood-red">
                    {player.score.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Top Combatants */}
        <div
          ref={(el) => {
            if (el) tablesRef.current[1] = el;
          }}
          className="glass-card p-6 rounded-xl"
        >
          <h3 className="text-2xl font-cinzel font-bold mb-6 text-center">
            ⚔️ {t('rankings.combatants')}
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary">{t('rankings.name')}</TableHead>
                <TableHead className="text-right text-primary">{t('rankings.score')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combatants.map((player, index) => (
                <TableRow key={player.name}>
                  <TableCell className="font-medieval">
                    {index === 0 && '🥇 '}
                    {index === 1 && '🥈 '}
                    {index === 2 && '🥉 '}
                    {player.name}
                  </TableCell>
                  <TableCell className="text-right font-bold text-blood-red">
                    {player.score.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};
