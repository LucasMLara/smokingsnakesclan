import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const languages = [
  { code: 'pt', flag: '🇧🇷', name: 'Português' },
  { code: 'en', flag: '🇺🇸', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
];

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('smoking-snakes-language', lng);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          variant={i18n.language === lang.code ? 'default' : 'secondary'}
          size="sm"
          className="glass-card glass-hover"
          title={lang.name}
        >
          <span className="text-xl">{lang.flag}</span>
        </Button>
      ))}
    </div>
  );
};
