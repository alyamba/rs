import { useTranslations } from 'next-intl';
import pokemonError from '../../assets/pokemonError.gif';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="w-screen h-screen bg-[#dfb698] relative overflow-hidden">
      <Image
        src={pokemonError}
        alt="pokemonError"
        className="absolute w-full h-auto object-cover z-1 opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <div className="w-auto absolute z-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center gap-4">
        <div className="text-7xl sm:text-9xl font-bold">404</div>
        <div className="text-4xl sm:text-5xl">{t('errorText')}</div>
        <Link
          href="/"
          className="border-blue-950 cursor-pointer py-2 px-4 rounded-lg text-md bg-sky-950 text-white hover:shadow-md"
          data-testid="go-home-button"
        >
          {t('linkToHome')}
        </Link>
      </div>
    </div>
  );
}
