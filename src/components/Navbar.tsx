import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { pathname } = useLocation();
  const { theme, toggleTheme, favorites } = useAppContext();

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/items', label: 'Articulos' },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b dark:border-db-700/50 border-db-200 dark:bg-db-950/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="group flex items-center gap-2 font-display text-2xl tracking-wide dark:text-db-50 text-db-900 transition-all hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:bg-clip-text hover:text-transparent"
        >
          <img src="/public/icon.png" alt="Saiyan Blog" className='h-10'/>
          Saiyan Blog
        </Link>

        <div className="flex items-center gap-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-body text-sm font-medium tracking-wide transition-colors ${
                pathname === to
                  ? 'text-accent'
                  : 'dark:text-db-400 text-db-500 dark:hover:text-db-100 hover:text-db-900'
              }`}
            >
              {label}
            </Link>
          ))}

          <Link
            to="/items?filter=favorites"
            className={`relative rounded-lg p-2 transition-colors dark:hover:bg-db-800 hover:bg-db-100 ${
              pathname === '/items' && new URLSearchParams(window.location.search).get('filter') === 'favorites'
                ? 'text-orange-500'
                : 'dark:text-db-400 text-db-500 dark:hover:text-db-100 hover:text-db-900'
            }`}
            aria-label="Favoritos"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={favorites.length > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 dark:text-db-400 text-db-500 transition-colors dark:hover:bg-db-800 hover:bg-db-100 dark:hover:text-db-100 hover:text-db-900"
            aria-label="Cambiar tema"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
