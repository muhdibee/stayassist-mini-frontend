'use client';

import { useState } from 'react';

interface SearchBarProps {
  // Callback function passed from the parent page to trigger the API fetch
  onSearch: (searchData: { city: string, checkIn: string, checkOut: string }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    // Only search if at least the city is provided, or both dates
    if (city || (checkIn && checkOut)) {
      onSearch({ city, checkIn, checkOut });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 mb-8 max-w-4xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-4 items-end">
        
        {/* City Input */}
        <div className="flex-1 w-full">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Destination City</label>
          <input
            id="city"
            type="text"
            placeholder="e.g., London, Paris"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>
        
        {/* Check-in Date Input */}
        <div className="w-full md:w-1/4">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Check-out Date Input */}
        <div className="w-full md:w-1/4">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}