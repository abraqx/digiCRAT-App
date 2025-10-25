import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, specialty: string, location: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, specialty, location);
  };

  const canSearch = !isLoading && (!!query.trim() || !!specialty.trim() || !!location.trim());

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
            <label htmlFor="specialty" className="text-sm font-medium text-slate-700 block mb-1">Area of Law</label>
            <select
                id="specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-4 py-2 text-base bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                disabled={isLoading}
            >
                <option value="">Any Specialty</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Immigration Law">Immigration Law</option>
                <option value="Real Estate Law">Real Estate Law</option>
                <option value="Intellectual Property">Intellectual Property</option>
            </select>
        </div>
        <div className="md:col-span-2">
            <label htmlFor="location" className="text-sm font-medium text-slate-700 block mb-1">Location Preference</label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., New York, NY"
                className="w-full px-4 py-2 text-base bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                disabled={isLoading}
            />
        </div>
      </div>
      <div className="relative">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your case (e.g., 'dispute with landlord', 'starting a business')"
            className="w-full px-5 py-3 pr-28 text-base bg-white border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
            disabled={isLoading}
        />
        <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={!canSearch}
        >
            {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;