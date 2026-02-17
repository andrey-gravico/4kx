import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Neucha } from 'next/font/google';
import './globals.css';
import ScrollProgress from '@/components/ScrollProgress';

const troubleside = localFont({
  src: '../public/fonts/troubleside.woff2',
  variable: '--font-troubleside',
  display: 'swap',
});

const neucha = Neucha({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
  variable: '--font-neucha',
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
        className={`${troubleside.variable} ${neucha.variable} antialiased`}
      >
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
