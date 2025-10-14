import Head from 'next/head';
import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Roboto } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import Providers from './providers';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});
const roboto = Roboto({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Pokémon',
  icons: {
    icon: '/pokemon.svg',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <Providers>
          <NextIntlClientProvider>
            <div
              id="root"
              className={`${fredoka.className} ${roboto.className}`}
            >
              {children}
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
