import { useTranslations } from 'next-intl';
import pokemonError from '../../assets/pokemonError.gif';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="w-screen h-screen bg-[#dfb698] relative overflow-hidden">
      <Image
        src={pokemonError}
        alt="pokemonError"
        className="absolute w-full h-auto object-cover z-1 opacity-25 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />

      <div className="h-full flex flex-col gap-2 flex-3 justify-center text-xl p-12 relative hover:decoration-gray-600">
        <Link
          href="/"
          className="absolute z-1 top-10 text-base hover:underline hover:underline-offset-4 "
        >
          {t('linkToHome')}
        </Link>

        <div className="w-auto absolute z-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center text-center gap-4">
          <div className="text-7xl sm:text-9xl font-bold">404</div>
          <div className="text-4xl sm:text-5xl">{t('errorText')}</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
