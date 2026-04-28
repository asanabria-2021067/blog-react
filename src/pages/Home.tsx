import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { items } = useAppContext();
  const latest = items.slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b dark:border-db-700/30 border-db-200 px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Bienvenido al universo Saiyan
          </p>
          <h1 className="font-display text-5xl leading-tight tracking-wide dark:text-db-50 text-db-900 md:text-7xl">
            Saiyan Blog
          </h1>
          <p className="mx-auto mt-6 max-w-lg font-body text-lg leading-relaxed dark:text-db-400 text-db-500">
            El poder de los Saiyajin reunido en articulos epicos. Explora historias, batallas y transformaciones legendarias.
          </p>
          <Link
            to="/items"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3.5 font-body text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
          >
            Explorar articulos
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
                Ultimos
              </p>
              <h2 className="font-display text-3xl dark:text-db-50 text-db-900">
                Ultimos Articulos
              </h2>
            </div>
            <Link
              to="/items"
              className="text-sm font-medium dark:text-db-400 text-db-500 transition-colors hover:text-accent"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((item) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="group rounded-2xl border dark:border-db-700/40 border-db-200 dark:bg-db-800/50 bg-white p-6 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1"
              >
                {item.category && (
                  <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {item.category}
                  </span>
                )}
                <h3 className="mt-2 font-display text-lg dark:text-db-50 text-db-900 transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm dark:text-db-400 text-db-500">
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
