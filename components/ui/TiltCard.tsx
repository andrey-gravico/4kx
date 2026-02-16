'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  rotation: number;
  className?: string;
  index: number;
}

const bgColors = [
  'bg-deep-sea text-white',
  'bg-omega-green text-white',
  'bg-deep-sea text-white',
  'bg-omega-green text-white',
];

export default function TiltCard({
  children,
  rotation,
  className,
  index,
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          'border-3 border-black p-6 md:p-8',
          bgColors[index % bgColors.length],
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        'border-3 border-black p-6 md:p-8 cursor-default',
        bgColors[index % bgColors.length],
        className
      )}
      style={{ rotate: rotation }}
      whileHover={{
        rotate: 0,
        scale: 1.03,
        y: -4,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {children}
    </motion.div>
  );
}
