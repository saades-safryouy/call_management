import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search...', className = '' }) => {
  const handleClear = () => onChange('');

  return (
    <div className={`relative w-full ${className}`}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition-colors duration-200 focus:border-[#E30613] focus:ring-2 focus:ring-red-100"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-red-500"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;