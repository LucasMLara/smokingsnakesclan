import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProfessionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  professionKey: string;
  icon: LucideIcon;
  master: string | null;
}

export const ProfessionModal = ({ open, onOpenChange, professionKey, icon: Icon, master }: ProfessionModalProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Icon className="w-12 h-12 text-primary" />
            <div>
              <DialogTitle className="text-2xl font-cinzel text-primary">
                {t(`professions.${professionKey}`)}
              </DialogTitle>
              <Badge variant="outline" className="mt-2">
                {master ? `Mestre: ${master}` : t('professions.awaiting')}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div ref={contentRef} className="space-y-4">
          <p className="text-muted-foreground text-base leading-relaxed">
            {t(`professions.${professionKey}Description`)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
