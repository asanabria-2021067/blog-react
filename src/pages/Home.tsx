import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import heroImg from '../assets/hero.webp';

export default function Home() {
  const { items, toggleFavorite, isFavorite } = useAppContext();
  const featured = items[0];
  const latest = items.slice(1, 4);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-b border-[#333537]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-db-950 via-db-950/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6">


          <h1 className="font-display text-[120px] md:text-[80px] leading-tight text-white tracking-tighter uppercase font-black">
            The Ultimate <br />
            <span className="text-orange-500">Z-Signal</span>
          </h1>

          <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Analisis curados, desgloses de batallas y lore desde los confines del universo. Para los que entrenan mas duro.
          </p>

          <div className="mt-8">
            <Link
              to="/items"
              className="bg-orange-600 text-black font-body font-bold px-8 py-3 rounded hover:bg-orange-500 transition-colors inline-block"
            >
              Leer Ultimos
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/8 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-xs font-semibold uppercase tracking-[0.50em]">Scroll para explorar</span>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </section>

     
      {/* Latest Transmissions */}
      {latest.length > 0 && (
        <section className="max-w-7xl mx-auto px-8 py-20 pb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-display text-3xl text-white font-bold">Ultimos Artículos</h2>
            <Link
              to="/items"
              className="text-sm font-medium text-gray-500 hover:text-orange-400 transition-colors"
            >
              Ver todos
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((item) => (
              <article
                key={item.id}
                className="group bg-[#1a1c1e] rounded-lg overflow-hidden border border-[#333537] transition-all duration-300 hover:border-orange-600/40 flex flex-col h-full"
              >
                {item.image && (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-[#0c0e11]/80 backdrop-blur-md rounded-full p-2">
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        aria-label="Favorito"
                        className="text-gray-500 hover:text-orange-400 transition-colors block leading-none"
                      >
                        <span
                          className="material-symbols-outlined text-2xl"
                          style={{ fontVariationSettings: isFavorite(item.id) ? "'FILL' 1" : "'FILL' 0" }}
                        >
                          star
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  {item.category && (
                    <div className="flex gap-2 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-300/80 bg-[#333537] px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                  )}

                  <Link to={`/items/${item.id}`}>
                    <h3 className="font-display text-xl text-white mb-3 group-hover:text-orange-400 transition-colors font-semibold">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="font-body text-base text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#333537] flex justify-between items-center text-gray-500">
                    {item.date && (
                      <span className="text-xs font-semibold uppercase tracking-[0.15em]">{item.date}</span>
                    )}
                    {!item.date && item.created_at && (
                      <span className="text-xs font-semibold uppercase tracking-[0.15em]">
                        {new Date(item.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      

      {/* Footer */}
      <footer className="w-full py-12 bg-[#0D0D0D] border-t border-[#1A1A1E] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-8">
          <div className="text-xl font-black text-orange-600 font-display mb-6 md:mb-0">Z-FEED</div>

          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0 text-xs uppercase tracking-[0.15em] font-semibold">
            <Link to="/" className="text-gray-500 hover:text-white transition-colors">Inicio</Link>
            <Link to="/items" className="text-gray-500 hover:text-white transition-colors">Articulos</Link>
            <Link to="/items?filter=favorites" className="text-gray-500 hover:text-white transition-colors">Favoritos</Link>
          </div>

          <div className="text-gray-500 text-xs uppercase tracking-[0.15em] font-semibold">
            &copy; 2024 Z-FEED. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
