import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Item } from '../types/item';
import { fetchItemById } from '../api/api';
import { useAppContext } from '../context/AppContext';

function DetailSkeleton() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 md:py-16">
      <div className="mb-8 h-5 w-20 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      <div className="mb-6 flex gap-3">
        <div className="h-6 w-24 rounded-full skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-6 w-28 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      </div>
      <div className="h-12 w-3/4 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      <div className="mt-4 h-6 w-full rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      <div className="mt-2 h-6 w-2/3 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      <div className="mt-8 aspect-[16/9] rounded-2xl skeleton dark:bg-db-700/30 bg-db-200/50" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-4 w-full rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-4 w-5/6 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-4 w-full rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-4 w-3/4 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      </div>
    </main>
  );
}

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
    return <DetailSkeleton />;
  }

  if (error || !item) {
    return (
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center">
          <p className="font-display text-2xl dark:text-db-50 text-db-900">Articulo no encontrado</p>
          <p className="mt-2 text-sm dark:text-db-400 text-db-500">El articulo que buscas no existe.</p>
          <Link
            to="/items"
            className="mt-6 inline-block text-sm font-medium text-accent transition-colors hover:text-accent-light"
          >
            Volver a articulos
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
        className="mb-8 inline-flex items-center gap-2 text-sm dark:text-db-400 text-db-500 transition-colors hover:text-accent"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver
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
            <time className="text-xs dark:text-db-500 text-db-400">{item.date}</time>
          )}
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl leading-tight dark:text-db-50 text-db-900 md:text-5xl">
          {item.title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg leading-relaxed dark:text-db-300 text-db-600">
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
          <div className="mt-8 whitespace-pre-line text-base leading-[1.8] dark:text-db-200 text-db-700">
            {item.body}
          </div>
        )}

        {/* Actions */}
        <div className="mt-10 flex items-center gap-4 border-t dark:border-db-700/40 border-db-200 pt-6">
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              fav
                ? 'bg-orange-500/20 text-orange-500'
                : 'border dark:border-db-700/50 border-db-200 dark:text-db-400 text-db-500 hover:border-orange-500/30 hover:text-orange-500'
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
              <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
            </svg>
            {fav ? 'En favoritos' : 'Agregar a favoritos'}
          </button>

          <Link
            to="/items"
            className="text-sm dark:text-db-500 text-db-400 transition-colors dark:hover:text-db-200 hover:text-db-700"
          >
            Todos los articulos
          </Link>
        </div>
      </article>
    </main>
  );
}
