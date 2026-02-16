'use client';

import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'disabled';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-sunset text-white border-2 border-black hover:bg-black hover:text-sunset transition-colors duration-200',
  secondary:
    'bg-transparent border-2 border-current hover:bg-black hover:text-sand transition-colors duration-200',
  disabled:
    'bg-sand text-black/40 border-2 border-black/20 cursor-not-allowed',
};

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className,
}: ButtonProps) {
  const base =
    'inline-block px-6 py-3 font-heading text-lg md:text-xl uppercase tracking-wide text-center';
  const styles = cn(base, variantStyles[variant], className);

  if (href && variant !== 'disabled') {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={styles}
      onClick={variant !== 'disabled' ? onClick : undefined}
      disabled={variant === 'disabled'}
      type="button"
    >
      {children}
    </button>
  );
}
