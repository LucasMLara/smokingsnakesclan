import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import { DiscordModal } from '@/components/modals/DiscordModal';
import { AnimatedLogo } from '@/components/AnimatedLogo';

export const Hero = () => {
  const { t } = useTranslation();
  const [discordModalOpen, setDiscordModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(logoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
      })
        .from(
          titleRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
        )
        .from(
          sloganRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        )
        .from(
          buttonRef.current,
          {
            scale: 0.9,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center hero-gradient w-full"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10 w-full pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blood-red rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blood-red-light rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        {/* Animated Logo */}
        <div ref={logoRef} className="mb-8 flex justify-center">
          <AnimatedLogo />
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold mb-6 text-glow"
        >
          {t('hero.title')}
        </h1>

        <p
          ref={sloganRef}
          className="text-2xl md:text-3xl lg:text-4xl font-medieval text-muted-foreground mb-12"
        >
          {t('hero.slogan')}
        </p>

        <div ref={buttonRef}>
          <Button
            size="lg"
            variant="hero"
            className="text-lg px-8 py-6"
            onClick={() => setDiscordModalOpen(true)}
          >
            {t('hero.discord')}
          </Button>
        </div>
      </div>
      </section>

      <DiscordModal open={discordModalOpen} onOpenChange={setDiscordModalOpen} />
    </>
  );
};
