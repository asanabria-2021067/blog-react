import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Item } from '../types/item';
import { fetchItemById } from '../api/api';
import { useAppContext } from '../context/AppContext';

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useAppContext();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchItemById(Number(id))
      .then(setItem)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-700 border-t-accent" />
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <p className="font-display text-2xl font-semibold text-ink-50">Article not found</p>
          <p className="mt-2 text-sm text-ink-400">The article you are looking for does not exist.</p>
          <Link
            to="/items"
            className="mt-6 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-light"
          >
            Back to articles
          </Link>
        </div>
      </main>
    );
  }

  const fav = isFavorite(item.id);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 md:py-16">
      {/* Back nav */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink-400 transition-colors hover:text-accent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <article>
        {/* Meta */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {item.category && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              {item.category}
            </span>
          )}
          {item.date && (
            <time className="text-xs text-ink-500">{item.date}</time>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl font-bold leading-tight text-ink-50 md:text-5xl">
          {item.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg leading-relaxed text-ink-300">
          {item.description}
        </p>

        {/* Image */}
        {item.image && (
          <div className="mt-8 overflow-hidden rounded-2xl">
            <img
              src={item.image}
              alt={item.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        {item.body && (
          <div className="mt-8 whitespace-pre-line text-base leading-[1.8] text-ink-200">
            {item.body}
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex items-center gap-4 border-t border-ink-700/40 pt-6">
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              fav
                ? 'bg-accent/20 text-accent'
                : 'border border-ink-700/50 text-ink-400 hover:border-accent/30 hover:text-accent'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={fav ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {fav ? 'Favorited' : 'Add to favorites'}
          </button>

          <Link
            to="/items"
            className="text-sm text-ink-500 transition-colors hover:text-ink-200"
          >
            All articles
          </Link>
        </div>
      </article>
    </main>
  );
}
