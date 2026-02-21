import HeroParallaxSection from '@/components/sections/HeroParallaxSection';
import HeroStepsSection from '@/components/sections/HeroStepsSection';
import GalleryStoriesSection from '@/components/sections/GalleryStoriesSection';
import Location from '@/components/Location';
import Opening from '@/components/Opening';
import Footer from '@/components/Footer';
import ScrollMagnetEffects from '@/components/ScrollMagnetEffects';

export default function Home() {
  return (
    <main className="magnet-scroll">
      <ScrollMagnetEffects />

      <div
        className="magnet-section magnet-section-top"
        data-magnet-section
        data-magnet-align="start"
      >
        <HeroStepsSection />
      </div>

      <div className="magnet-section" data-magnet-section>
        <HeroParallaxSection />
      </div>

      <div className="magnet-section" data-magnet-section>
        <GalleryStoriesSection />
      </div>

      <div className="magnet-section" data-magnet-section>
        <Location />
      </div>

      <div className="magnet-section" data-magnet-section>
        <Opening />
      </div>

      <div className="magnet-section" data-magnet-section>
        <Footer />
      </div>
    </main>
  );
}
