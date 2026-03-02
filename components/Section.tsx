import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  bg?: string;
  className?: string;
}

export default function Section({
  children,
  id,
  bg = 'bg-black',
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-full h-full overflow-hidden',
        bg,
        className
      )}
    >
      <div className="h-full mx-auto">{children}</div>
    </section>
  );
}
