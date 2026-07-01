import React from 'react';
import { Search } from 'lucide-react';

/**
 * SearchBar — reusable search input with icon.
 * Props: value, onChange (receives the string), placeholder, className.
 */
const SearchBar = ({ value, onChange, placeholder = 'Search...', className = '' }) => (
  <div className={`relative ${className}`}>
    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <Search className="h-5 w-5 text-gray-400" />
    </span>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </div>
);

export default SearchBar;
