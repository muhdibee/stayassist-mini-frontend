'use client';

import { useState, useEffect, useCallback } from 'react';
import { listingsApi } from '@/lib/api';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard'; // You need to create this component

interface Listing {
  _id: string; // Use _id if you chose MongoDB, or id if PostgreSQL/MySQL
  title: string;
  pricePerNight: number;
  city: string;
  photos: string[]; 
  hostName: string;
  // ... other fields
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch listings with optional search parameters
  const fetchListings = useCallback(async (params = {}) => {
    setLoading(true);
    setError('');
    try {
      // Send parameters to your backend for city and date filtering (Search requirement 3)
      const response = await listingsApi.getAll(params);
      setListings(response.data.data); 
    } catch (err: any) {
      setError('Failed to fetch listings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  // Handler for search form submission from the SearchBar component
  const handleSearch = (searchData: { city: string, checkIn: string, checkOut: string }) => {
    const params = {
      city: searchData.city,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
    };
    fetchListings(params);
  };

  if (loading) return <p className="text-center mt-20">Loading listings...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      {/* <SearchBar onSearch={handleSearch} /> Search bar at the top */}
      <h1 className="text-3xl font-bold my-6">Available Rentals</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* {listings.length > 0 ? (
          listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} /> // You'll create this card
          ))
        ) : (
          <p>No listings found matching your search criteria.</p>
        )} */}
      </div>
    </div>
  );
}