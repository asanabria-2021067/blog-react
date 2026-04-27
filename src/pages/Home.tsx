import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { items } = useAppContext();
  const latest = items.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-700/30 px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Welcome to
          </p>
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-ink-50 md:text-7xl">
            The Ink Press
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg leading-relaxed text-ink-400">
            A curated collection of thoughts, ideas, and stories. Explore articles crafted with care.
          </p>
          <Link
            to="/items"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-body text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/20"
          >
            Browse Articles
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Latest articles preview */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Latest
              </p>
              <h2 className="font-display text-3xl font-semibold text-ink-50">
                Recent Articles
              </h2>
            </div>
            <Link
              to="/items"
              className="text-sm font-medium text-ink-400 transition-colors hover:text-accent"
            >
              View all
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="group rounded-2xl border border-ink-700/40 bg-ink-800/50 p-6 transition-all duration-300 hover:border-accent/30 hover:-translate-y-1"
              >
                {item.category && (
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {item.category}
                  </span>
                )}
                <h3 className="mt-2 font-display text-lg font-semibold text-ink-50 transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
