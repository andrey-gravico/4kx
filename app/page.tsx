import HeroParallaxSection from '@/components/sections/HeroParallaxSection';
import HeroStepsSection from '@/components/sections/HeroStepsSection';
import Location from '@/components/Location';
import Opening from '@/components/Opening';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroParallaxSection />
      <HeroStepsSection />
      <Location />
      <Opening />
      <Footer />
    </main>
  );
}
