import Hero from '@/components/sections/Hero';
import Menu from '@/components/sections/Menu';
import Pizza from '@/components/sections/Pizza';
import Gallery from '@/components/sections/Gallery';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import SwipePageController from '@/components/SwipePageController';

export default function Home() {
  return (
    <main className="page-root">
      <SwipePageController />

      <div
        className="page-section page-section-top"
        data-page-section
        data-page-index="0"
        data-section-kind="hero"
      >
        <Hero />
      </div>

      <div className="page-section" data-page-section data-page-index="1" data-section-kind="hero">
        <Menu />
      </div>

      <div className="page-section" data-page-section data-page-index="2" data-section-kind="content">
        <Pizza />
      </div>

      <div className="page-section" data-page-section data-page-index="3" data-section-kind="gallery">
        <Gallery />
      </div>

      <div className="page-section" data-page-section data-page-index="4" data-section-kind="content">
        <Location />
      </div>

      <div className="page-section" data-page-section data-page-index="5" data-section-kind="footer">
        <Footer />
      </div>
    </main>
  );
}
