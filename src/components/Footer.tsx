import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-12 px-4 md:px-8 border-t border-border"
    >
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-muted-foreground mb-6">{t('footer.copyright')}</p>

        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="https://discord.gg/smokingsnakes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blood-red-light transition-colors flex items-center gap-2"
          >
            {t('footer.discord')}
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://www.paxdei.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blood-red-light transition-colors flex items-center gap-2"
          >
            {t('footer.website')}
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://directory.paxdei.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-blood-red-light transition-colors flex items-center gap-2"
          >
            {t('footer.directory')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
