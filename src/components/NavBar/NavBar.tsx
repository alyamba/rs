import { type FC } from 'react';
import pokemonLogo from '../../assets/pokemonLogo.svg';
import { Link, useSearchParams } from 'react-router';
import { useTheme } from '../../utils';
import styles from './NavBar.module.css';

export const NavBar: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || 1;

  return (
    <nav
      className={`${styles.nav} sticky z-2 top-0 flex justify-between py-4 px-20 items-center gap-10 shadow-lg/5`}
    >
      <div>
        <img src={pokemonLogo} alt="Pokemon" className="h-10" />
      </div>

      <div className="flex gap-10">
        <div className="flex gap-5">
          <Link to={`/?page=${currentPage}`} className="cursor-pointer">
            Home
          </Link>
          <Link
            to="/about"
            className="cursor-pointer text-base hover:underline hover:underline-offset-4"
          >
            About
          </Link>
        </div>

        <button className="cursor-pointer" onClick={toggleTheme}>
          {theme === 'light' ? 'Dark theme' : 'Light theme'}
        </button>
      </div>
    </nav>
  );
};
