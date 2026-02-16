import { loyaltyPage } from '@/lib/content';
import Button from '@/components/ui/Button';

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen bg-sand flex items-center justify-center px-4">
      <div className="text-center max-w-xl pt-20">
        <h1 className="font-heading text-6xl md:text-8xl uppercase text-black">
          {loyaltyPage.heading}
        </h1>
        <p className="font-body text-xl md:text-2xl text-black/70 mt-6">
          {loyaltyPage.subtext}
        </p>
        <p className="font-body text-base text-black/50 mt-2">
          {loyaltyPage.line}
        </p>
        <div className="mt-8">
          <Button variant="secondary" href="/">
            {loyaltyPage.backLabel}
          </Button>
        </div>
      </div>
    </main>
  );
}
