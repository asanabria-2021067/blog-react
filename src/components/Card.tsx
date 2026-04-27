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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-700/40 bg-ink-800/50 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
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
          <h3 className="font-display text-lg font-semibold leading-snug text-ink-50 transition-colors group-hover/link:text-accent">
            {item.title}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm leading-relaxed text-ink-400">
          {item.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          {item.date && (
            <time className="text-xs text-ink-500">{item.date}</time>
          )}

          <button
            onClick={() => toggleFavorite(item.id)}
            className={`ml-auto rounded-lg p-1.5 transition-colors ${
              fav
                ? 'text-accent hover:text-accent-dark'
                : 'text-ink-500 hover:text-accent'
            }`}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
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
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
