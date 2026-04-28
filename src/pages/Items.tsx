import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import ButtonRandom from '../components/ButtonRandom';

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border dark:border-db-700/40 border-db-200 dark:bg-db-800/50 bg-white">
      <div className="aspect-[16/10] skeleton dark:bg-db-700/30 bg-db-200/50" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-20 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-5 w-3/4 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-4 w-full rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        <div className="h-4 w-2/3 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
      </div>
    </div>
  );
}

export default function Items() {
  const { items, loading, error, isFavorite, favorites } = useAppContext();
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const showFavorites = searchParams.get('filter') === 'favorites';

  const toggleFavoritesFilter = () => {
    if (showFavorites) {
      searchParams.delete('filter');
    } else {
      searchParams.set('filter', 'favorites');
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let result = items;
    if (showFavorites) {
      result = result.filter((item) => isFavorite(item.id));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [items, search, showFavorites, favorites]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 md:py-16">
        <div className="mb-10">
          <div className="mb-2 h-4 w-20 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
          <div className="h-10 w-64 rounded skeleton dark:bg-db-700/30 bg-db-200/50" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="font-display text-lg text-red-400">Error de conexion</p>
          <p className="mt-2 text-sm dark:text-db-400 text-db-500">
            No se pudo conectar al servidor. Asegurate de que el backend este corriendo en el puerto 3001.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {showFavorites ? 'Favoritos' : 'Explorar'}
        </p>
        <h1 className="font-display text-4xl dark:text-db-50 text-db-900 md:text-5xl">
          {showFavorites ? 'Mis Favoritos' : 'Todos los Articulos'}
        </h1>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <button
          onClick={toggleFavoritesFilter}
          className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-body text-sm font-medium transition-all ${
            showFavorites
              ? 'border-orange-500/40 bg-orange-500/10 text-orange-500'
              : 'dark:border-db-700/40 border-db-200 dark:text-db-400 text-db-500 dark:hover:border-db-600 hover:border-db-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={showFavorites ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Favoritos{favorites.length > 0 && ` (${favorites.length})`}
        </button>
        <ButtonRandom />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-xl dark:text-db-500 text-db-400">
            {showFavorites ? 'No tienes favoritos aun' : 'No se encontraron articulos'}
          </p>
          <p className="mt-2 text-sm dark:text-db-600 text-db-400">
            {showFavorites ? 'Marca articulos con la estrella para verlos aqui' : 'Intenta con otro termino'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="mt-8 text-center text-xs dark:text-db-600 text-db-400">
        {filtered.length} de {items.length} articulos
      </p>
    </main>
  );
}
