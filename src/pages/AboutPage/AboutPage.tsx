import { type FC } from 'react';
import { Link } from 'react-router';

export const AboutPage: FC = () => {
  return (
    <div className="w-screen h-screen flex items-center gap-8">
      <div className="h-full flex flex-col gap-2 flex-3 justify-center text-xl p-12 relative hover:decoration-gray-600">
        <Link
          to="/"
          className="absolute z-1 top-10 text-base hover:underline hover:underline-offset-4 "
        >
          Home
        </Link>
        <div>
          My name is <strong>Alina Logunova</strong> and I&apos;m frontend
          developer.
        </div>
        <div>
          This website is my education task for{' '}
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-gray-400 hover:decoration-gray-600 transition-colors"
          >
            RSschool React course
          </a>
          .
        </div>
        <div>
          If you want to see my other project, you can visit{' '}
          <a
            href="https://github.com/alyamba"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-gray-400 hover:decoration-gray-600 transition-colors"
          >
            my GitHub
          </a>
          .
        </div>
      </div>
      <div className="flex-2 h-full flex items-center justify-center bg-sky-100">
        <div className="rotate-90 text-7xl">ABOUT US</div>
      </div>
    </div>
  );
};
