import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { GameInfo } from '@/components/GameInfo';
import { Announcements } from '@/components/Announcements';
import { Professions } from '@/components/Professions';
import { Missions } from '@/components/Missions';
import { Rankings } from '@/components/Rankings';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <Hero />
      <About />
      <GameInfo />
      <Announcements />
      <Professions />
      <Missions />
      <Rankings />
      <Footer />
    </main>
  );
};

export default Index;
