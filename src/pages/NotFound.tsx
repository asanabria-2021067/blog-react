import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display text-8xl dark:text-db-700 text-db-200 md:text-9xl">
          404
        </p>
        <h1 className="mt-4 font-display text-2xl dark:text-db-50 text-db-900">
          Pagina no encontrada
        </h1>
        <p className="mt-2 text-sm dark:text-db-400 text-db-500">
          La pagina que buscas no existe o fue movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Ir al inicio
        </Link>
      </div>
    </main>
  );
}
