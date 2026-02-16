'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface AnimatedLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  as?: 'p' | 'span' | 'div';
}

export default function AnimatedLines({
  lines,
  className,
  lineClassName,
  as: Tag = 'p',
}: AnimatedLinesProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <Tag key={i} className={lineClassName}>
            {line}
          </Tag>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            ease: 'easeOut',
          }}
        >
          <Tag className={lineClassName}>{line}</Tag>
        </motion.div>
      ))}
    </div>
  );
}
