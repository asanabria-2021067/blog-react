import { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import ButtonRandom from '../components/ButtonRandom';

export default function Items() {
  const { items, loading, error } = useAppContext();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q)
    );
  }, [items, search]);

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-700 border-t-accent" />
          <p className="text-sm text-ink-500">Loading articles...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <p className="font-display text-lg font-semibold text-red-400">Connection Error</p>
          <p className="mt-2 text-sm text-ink-400">
            Could not reach the server. Make sure the backend is running on port 3001.
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
          Browse
        </p>
        <h1 className="font-display text-4xl font-bold text-ink-50 md:text-5xl">
          All Articles
        </h1>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <ButtonRandom />
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-display text-xl text-ink-500">No articles found</p>
          <p className="mt-2 text-sm text-ink-600">Try a different search term</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Count */}
      <p className="mt-8 text-center text-xs text-ink-600">
        {filtered.length} of {items.length} articles
      </p>
    </main>
  );
}
