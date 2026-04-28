import { Link } from 'react-router-dom';
import type { Item } from '../types/item';
import { useAppContext } from '../context/AppContext';

interface CardProps {
  item: Item;
}

export default function Card({ item }: CardProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const fav = isFavorite(item.id);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border dark:border-db-700/40 border-db-200 dark:bg-db-800/50 bg-white transition-all duration-300 hover:border-orange-500/30 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1">
      {item.image && (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {item.category && (
          <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            {item.category}
          </span>
        )}

        <Link to={`/items/${item.id}`} className="group/link">
          <h3 className="font-display text-lg font-semibold leading-snug dark:text-db-50 text-db-900 transition-colors group-hover/link:text-accent">
            {item.title}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm leading-relaxed dark:text-db-400 text-db-500">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          {item.date && (
            <time className="text-xs dark:text-db-500 text-db-400">{item.date}</time>
          )}

          <button
            onClick={() => toggleFavorite(item.id)}
            className={`ml-auto rounded-lg p-1.5 transition-colors ${
              fav
                ? 'text-orange-500 hover:text-orange-600'
                : 'dark:text-db-500 text-db-400 hover:text-orange-500'
            }`}
            aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={fav ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
