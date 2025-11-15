import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Home, Users, Megaphone, Briefcase, Target, Trophy, BookOpen, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const languages = [
  { code: 'pt', flag: '🇧🇷', name: 'Português' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
];

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const guidesDropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: t('navbar.home'), path: '/', icon: Home, section: 'hero' },
    { name: t('navbar.about'), path: '/', icon: Users, section: 'about' },
    { name: t('navbar.announcements'), path: '/', icon: Megaphone, section: 'announcements' },
    { name: t('navbar.professions'), path: '/', icon: Briefcase, section: 'professions' },
    { name: t('navbar.missions'), path: '/', icon: Target, section: 'missions' },
    { name: t('navbar.rankings'), path: '/', icon: Trophy, section: 'rankings' },
  ];

  const guideItems = [
    { name: t('navbar.guides.pvpZvz'), path: '/guides/pvp-zvz', icon: '🛡️' },
    { name: t('navbar.guides.pvpSmall'), path: '/guides/pvp-small', icon: '⚔️' },
    { name: t('navbar.guides.pve'), path: '/guides/pve', icon: '🧙' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('smoking-snakes-language', lng);
  };

  // Auto-hide navbar on scroll
  useEffect(() => {
    if (!navbarRef.current) return;

    let lastScrollY = window.scrollY;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
          if (currentScrollY > lastScrollY) {
            // Scrolling down
            gsap.to(navbarRef.current, {
              y: -100,
              opacity: 0.8,
              duration: 0.4,
              ease: 'power2.out'
            });
          } else {
            // Scrolling up
            gsap.to(navbarRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.out'
            });
          }
        }
        
        lastScrollY = currentScrollY;
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      gsap.fromTo(
        mobileMenuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (isGuidesOpen && guidesDropdownRef.current) {
      const items = guidesDropdownRef.current.querySelectorAll('.guide-item');
      gsap.fromTo(
        guidesDropdownRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        items,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [isGuidesOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.section && location.pathname === '/') {
      scrollToSection(item.section);
    }
  };

  return (
    <nav ref={navbarRef} className="fixed top-1 left-0 right-0 z-50 bg-deep-black/95 backdrop-blur-lg border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-cinzel font-bold text-blood-red group-hover:text-blood-red-light transition-colors duration-300">
              SMOKING SNAKES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item)}
                className="px-3 py-2 rounded-md text-sm font-medium text-soft-white/80 hover:text-blood-red hover:bg-secondary/50 transition-all duration-300 flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}

            {/* Guides Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsGuidesOpen(true)}
              onMouseLeave={() => setIsGuidesOpen(false)}
            >
              <button className="px-3 py-2 rounded-md text-sm font-medium text-soft-white/80 hover:text-blood-red hover:bg-secondary/50 transition-all duration-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {t('navbar.guides.title')}
                <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isGuidesOpen && "rotate-180")} />
              </button>

              {isGuidesOpen && (
                <div 
                  ref={guidesDropdownRef}
                  className="absolute top-full left-0 mt-1 w-64 bg-deep-black/98 backdrop-blur-xl border border-glass-border rounded-lg shadow-elegant overflow-hidden z-50"
                >
                  {guideItems.map((guide) => (
                    <Link
                      key={guide.path}
                      to={guide.path}
                      className="guide-item flex items-center gap-3 px-4 py-3 text-sm text-soft-white/80 hover:text-blood-red hover:bg-secondary/50 transition-all duration-300 border-b border-glass-border last:border-b-0"
                    >
                      <span className="text-xl">{guide.icon}</span>
                      {guide.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher Desktop */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-glass-border">
              {languages.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  variant={i18n.language === lang.code ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    "h-8 w-10 p-0 transition-all duration-300",
                    i18n.language === lang.code 
                      ? "bg-blood-red/20 hover:bg-blood-red/30" 
                      : "hover:bg-secondary/50"
                  )}
                  title={lang.name}
                >
                  <span className="text-lg">{lang.flag}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-soft-white hover:text-blood-red hover:bg-secondary/50 transition-all duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed top-16 right-0 bottom-0 w-64 bg-deep-black/98 backdrop-blur-xl border-l border-glass-border shadow-elegant overflow-y-auto"
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item)}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium text-soft-white/80 hover:text-blood-red hover:bg-secondary/50 transition-all duration-300"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            ))}

            {/* Mobile Guides Section */}
            <div className="pt-4 border-t border-glass-border">
              <div className="px-4 py-2 text-xs font-cinzel font-bold text-blood-red uppercase tracking-wider">
                {t('navbar.guides.title')}
              </div>
              {guideItems.map((guide) => (
                <Link
                  key={guide.path}
                  to={guide.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-md text-sm text-soft-white/80 hover:text-blood-red hover:bg-secondary/50 transition-all duration-300"
                >
                  <span className="text-lg">{guide.icon}</span>
                  {guide.name}
                </Link>
              ))}
            </div>

            {/* Language Switcher Mobile */}
            <div className="pt-4 border-t border-glass-border">
              <div className="px-4 py-2 text-xs font-cinzel font-bold text-blood-red uppercase tracking-wider">
                Idioma
              </div>
              <div className="flex gap-2 px-4">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    variant={i18n.language === lang.code ? 'default' : 'secondary'}
                    size="sm"
                    className={cn(
                      "flex-1 transition-all duration-300",
                      i18n.language === lang.code 
                        ? "bg-blood-red/20 hover:bg-blood-red/30" 
                        : "hover:bg-secondary/50"
                    )}
                    title={lang.name}
                  >
                    <span className="text-xl">{lang.flag}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
