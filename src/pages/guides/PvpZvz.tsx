import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ExternalLink, Shield, Users, Swords } from 'lucide-react';
import gsap from 'gsap';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const PvpZvz = () => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={contentRef} className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blood-red/20 border-2 border-blood-red mb-4">
                <Shield className="w-10 h-10 text-blood-red" />
              </div>
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-blood-red">
                {t('guides.pvpZvz.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('guides.pvpZvz.subtitle')}
              </p>
            </div>

            {/* Description Card */}
            <div className="glass-card p-8 space-y-6">
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-blood-red flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-cinzel font-bold text-foreground mb-3">
                    {t('guides.pvpZvz.contextTitle')}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('guides.pvpZvz.context')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Swords className="w-6 h-6 text-blood-red flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-cinzel font-bold text-foreground mb-3">
                    {t('guides.pvpZvz.strategyTitle')}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('guides.pvpZvz.strategy')}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center pt-8">
              <Button 
                variant="hero" 
                size="lg"
                className="group"
                onClick={() => window.open('#', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                {t('guides.pvpZvz.accessGuide')}
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                {t('guides.pvpZvz.guideNote')}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PvpZvz;
