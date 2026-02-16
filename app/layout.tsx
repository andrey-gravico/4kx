import type { Metadata } from 'next';
import { Stalinist_One, Bebas_Neue, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import ScrollProgress from '@/components/ScrollProgress';
import GrainOverlay from '@/components/ui/GrainOverlay';

const stalinist = Stalinist_One({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-stalinist',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ЧКХ — Чисто Крымская Харизма | Бар на Омеге',
  description:
    'Бар самообслуживания у моря. Пиво, пицца, характер. Скоро открытие.',
  openGraph: {
    title: 'ЧКХ — Чисто Крымская Харизма | Бар на Омеге',
    description:
      'Бар самообслуживания у моря. Пиво, пицца, характер. Скоро открытие.',
    type: 'website',
    locale: 'ru_RU',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${stalinist.variable} ${bebasNeue.variable} ${roboto.variable} antialiased`}
      >
        <ScrollProgress />
        <Header />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
