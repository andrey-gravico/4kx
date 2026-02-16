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
  bg = 'bg-sand',
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-16 md:py-24 px-4',
        bg,
        className
      )}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
