import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Navbar } from '@/components/Navbar';
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
    <main className="min-h-screen pt-16">
      <Navbar />
      <LanguageSwitcher />
      <Hero />
      <div id="about">
        <About />
      </div>
      <GameInfo />
      <div id="announcements">
        <Announcements />
      </div>
      <div id="professions">
        <Professions />
      </div>
      <div id="missions">
        <Missions />
      </div>
      <div id="rankings">
        <Rankings />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
