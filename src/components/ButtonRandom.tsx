import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function ButtonRandom() {
  const navigate = useNavigate();
  const { items } = useAppContext();

  function handleRandom() {
    if (items.length === 0) return;
    const random = items[Math.floor(Math.random() * items.length)];
    navigate(`/items/${random.id}`);
  }

  return (
    <button
      onClick={handleRandom}
      disabled={items.length === 0}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 font-body text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
      Articulo aleatorio
    </button>
  );
}
