import { footer } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="bg-black w-full h-full px-4 py-6">
      <div className="page-fit-content max-w-6xl h-full mx-auto text-center flex flex-col items-center justify-center">
        <p className="font-heading text-[clamp(2rem,4.2vw,3.4rem)] text-sand uppercase tracking-wider">
          {footer.name}
        </p>
        <p className="font-body text-[clamp(0.9rem,1.6vw,1.05rem)] text-sand/60 mt-2">
          {footer.location} &middot; {footer.city}
        </p>
        <p className="font-body text-[clamp(0.75rem,1.2vw,0.85rem)] text-sand/40 mt-2">
          {footer.tagline}
        </p>
      </div>
    </footer>
  );
}
