import SearchBar from '../../../components/ui/SearchBar';

const CallFilters = ({ search, onSearch }) => {
  return (
    <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5">
      <SearchBar
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default CallFilters;