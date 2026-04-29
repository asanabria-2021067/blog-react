import PropTypes from 'prop-types';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 dark:text-db-500 text-db-400"
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar articulos..."
        className="w-full rounded-xl border dark:border-db-700/50 border-db-200 dark:bg-db-800/60 bg-white py-3 pl-12 pr-4 font-body text-sm dark:text-db-100 text-db-800 dark:placeholder-db-500 placeholder-db-400 outline-none transition-all focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
