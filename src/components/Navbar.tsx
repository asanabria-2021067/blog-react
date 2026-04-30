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
    <nav className="fixed top-0 w-full z-40 bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#1A1A1E]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-orange-600 uppercase font-display"
        >
          Z-FEED
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-medium transition-colors duration-200 font-body text-base ${
                pathname === to
                  ? 'text-orange-600 font-bold border-b-2 border-orange-600 pb-1'
                  : 'text-gray-400 hover:text-orange-500'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/items?filter=favorites"
            className="relative text-gray-400 hover:text-orange-500 transition-colors duration-200"
            aria-label="Favoritos"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: favorites.length > 0 ? "'FILL' 1" : "'FILL' 0" }}>
              star
            </span>
            {favorites.length > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
            aria-label="Cambiar tema"
          >
            <span className="material-symbols-outlined text-2xl">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
