import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export interface MissionProgress {
  label: string;
  current: number;
  target: number;
}

interface MissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  missionKey: string;
  type: string;
  progress: MissionProgress[];
}

export const MissionModal = ({ open, onOpenChange, missionKey, type, progress }: MissionModalProps) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const calculateStatus = () => {
    const hasProgress = progress.some(p => p.current > 0);
    const allComplete = progress.every(p => p.current >= p.target);
    
    if (allComplete) return 'completed';
    if (hasProgress) return 'active';
    return 'pending';
  };

  const status = calculateStatus();

  useEffect(() => {
    if (open && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
      
      progressRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, delay: 0.2 + index * 0.1, ease: 'power2.out' }
          );
        }
      });
    }
  }, [open]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary text-primary-foreground';
      case 'completed':
        return 'bg-green-700 text-primary-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <DialogTitle className="text-2xl font-cinzel text-primary">
              {t(`missions.${missionKey}.title`)}
            </DialogTitle>
            <Badge className={getStatusColor(status)}>
              {t(`missions.status.${status}`)}
            </Badge>
          </div>
        </DialogHeader>

        <div ref={contentRef} className="space-y-6">
          <p className="text-muted-foreground text-base leading-relaxed">
            {t(`missions.${missionKey}.fullDescription`)}
          </p>

          <div className="space-y-4">
            <h3 className="font-cinzel font-bold text-lg text-primary">
              {t('missions.progressTitle')}
            </h3>
            {progress.map((item, index) => {
              const percentage = Math.min((item.current / item.target) * 100, 100);
              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) progressRefs.current[index] = el;
                  }}
                  className="glass-card p-4 rounded-lg"
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.current} / {item.target}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                </div>
              );
            })}
          </div>

          <Badge variant="outline" className="w-fit">
            {t(`missions.type.${type}`)}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};
