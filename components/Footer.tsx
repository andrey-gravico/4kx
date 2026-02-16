import { footer } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-black py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="font-heading text-4xl md:text-5xl text-sand uppercase tracking-wider">
          {footer.name}
        </p>
        <p className="font-body text-sm md:text-base text-sand/60 mt-3">
          {footer.location} &middot; {footer.city}
        </p>
        <p className="font-body text-xs text-sand/40 mt-2">
          {footer.tagline}
        </p>
      </div>
    </footer>
  );
}
