import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink } from 'lucide-react';

interface DiscordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DiscordModal = ({ open, onOpenChange }: DiscordModalProps) => {
  const { t } = useTranslation();
  const [agreed, setAgreed] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (agreed && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [agreed]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-cinzel text-primary">
            {t('discordModal.title')}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t('discordModal.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-cinzel font-bold text-lg mb-2 text-primary">
              {t('discordModal.rulesTitle')}
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {(t('discordModal.rules', { returnObjects: true }) as string[]).map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-4 rounded-lg">
            <h3 className="font-cinzel font-bold text-lg mb-2 text-primary">
              {t('discordModal.profileTitle')}
            </h3>
            <p className="text-muted-foreground">{t('discordModal.profileDescription')}</p>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {t('discordModal.agreement')}
            </label>
          </div>

          {agreed && (
            <div ref={buttonRef}>
              <Button
                size="lg"
                variant="hero"
                className="w-full"
                asChild
              >
                <a
                  href="https://discord.gg/smokingsnakes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3"
                >
                  {t('discordModal.enterButton')}
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
