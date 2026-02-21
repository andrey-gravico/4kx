import HeroParallaxSection from '@/components/sections/HeroParallaxSection';
import HeroStepsSection from '@/components/sections/HeroStepsSection';
import GalleryStoriesSection from '@/components/sections/GalleryStoriesSection';
import Location from '@/components/Location';
import Opening from '@/components/Opening';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <HeroStepsSection />
      <HeroParallaxSection />
      <GalleryStoriesSection />
      <Location />
      <Opening />
      <Footer />
    </main>
  );
}
