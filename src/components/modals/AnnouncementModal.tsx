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

interface AnnouncementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phaseKey: string;
  icon: LucideIcon;
}

export const AnnouncementModal = ({ open, onOpenChange, phaseKey, icon: Icon }: AnnouncementModalProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Icon className="w-12 h-12 text-primary" />
            <DialogTitle className="text-2xl font-cinzel text-primary">
              {t(`announcements.${phaseKey}.title`)}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div ref={contentRef} className="space-y-4">
          <p className="text-muted-foreground text-base leading-relaxed">
            {t(`announcements.${phaseKey}.fullDescription`)}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
