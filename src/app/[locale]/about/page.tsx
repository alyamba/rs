'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const AboutPage = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className="w-screen h-screen flex items-center gap-8">
      <div className="h-full flex flex-col gap-2 flex-3 justify-center text-xl p-12 relative hover:decoration-gray-600">
        <Link
          href="/"
          className="absolute z-1 top-10 text-base hover:underline hover:underline-offset-4 "
        >
          {t('linkToHome')}
        </Link>

        <div>
          {t.rich('authorNameText', {
            name: () => <strong>{t('authorName')}</strong>,
          })}
        </div>

        <div>
          {t.rich('rsCourse', {
            course: (chunks) => (
              <a
                href="https://rs.school/courses/reactjs"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-gray-400 hover:decoration-gray-600 transition-colors"
              >
                {chunks}
              </a>
            ),
          })}
        </div>

        <div>
          {t.rich('otherProjects', {
            github: () => (
              <a
                href="https://github.com/alyamba"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-gray-400 hover:decoration-gray-600 transition-colors"
              >
                {t('githubText')}
              </a>
            ),
          })}
        </div>
      </div>

      <div className="flex-2 h-full flex items-center justify-center bg-sky-100">
        <div className="rotate-90 text-7xl">{t('title')}</div>
      </div>
    </div>
  );
};

export default AboutPage;
