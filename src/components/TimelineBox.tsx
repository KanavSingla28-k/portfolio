import { RevealFx } from './ui/RevealFx';
import { TypewriterText } from './ui/TypewriterText';

export interface TimelineItemType {
  id: string;
  title: string;
  organization: string;
  period: string;
  description?: string;
  highlights?: string[];
}

export function TimelineBox({ item, isFirst }: { item: TimelineItemType, isFirst: boolean }) {
  const speed = 0.015;
  const baseDelay = 0.5; // wait for the RevealItem box animation
  
  const periodDelay = baseDelay;
  const titleDelay = periodDelay + (item.period?.length || 0) * speed;
  const orgDelay = titleDelay + (item.title?.length || 0) * speed;
  const descDelay = orgDelay + (item.organization?.length || 0) * speed;

  return (
    <div className="relative">
      <div className={`absolute -left-[41px] top-6 w-4 h-4 rounded-full border-4 z-10 transition-colors duration-500 ${isFirst ? 'bg-primary border-background' : 'bg-bg-surface border-whisper'}`}></div>
      <RevealFx className="w-full">
        <div className="p-lg md:p-xl bg-bg-surface border border-whisper hover:border-border-hover rounded-2xl shadow-sm transition-colors duration-300 min-h-[80px]">
          <div className="space-y-sm">
            <TypewriterText as="span" className="block font-label-mono text-label-mono text-text-muted uppercase" text={item.period} delay={periodDelay} speed={speed} />
            <TypewriterText as="h3" className="block font-card-title text-card-title text-text-primary" text={item.title} delay={titleDelay} speed={speed} />
            <TypewriterText as="p" className="block font-body-main text-body-main text-primary" text={item.organization} delay={orgDelay} speed={speed} />
            {item.description && (
              <div className="pt-2">
                <TypewriterText as="p" className="block text-text-secondary max-w-2xl leading-relaxed" text={item.description} delay={descDelay} speed={speed} />
              </div>
            )}
          </div>
        </div>
      </RevealFx>
    </div>
  );
}
