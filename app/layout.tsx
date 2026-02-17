import type { Metadata } from 'next';
import { Stick, Nunito } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ScrollProgress';

const stick = Stick({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-stick',
  display: 'swap',
});

const nunito = Nunito({
  weight: ['400', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
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
        className={`${stick.variable} ${nunito.variable} antialiased`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
