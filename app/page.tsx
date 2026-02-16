import Hero from '@/components/Hero';
import Manifest from '@/components/Manifest';
import Rules from '@/components/Rules';
import Location from '@/components/Location';
import Opening from '@/components/Opening';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifest />
      <Rules />
      <Location />
      <Opening />
      <Footer />
    </main>
  );
}
