import Head from 'next/head';
import './globals.css';
import type { Metadata } from 'next';
import { Fredoka, Roboto } from 'next/font/google';
import Providers from './providers';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <title>Pokémon</title>
      </Head>

      <body>
        <Providers>
          <div id="root" className={`${fredoka.className} ${roboto.className}`}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
