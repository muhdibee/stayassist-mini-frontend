// src/app/listings/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { listingsApi } from '@/lib/api';
import BookingForm from '@/components/BookingForm'; // You need to create this component
import { useParams } from 'next/navigation';

interface ListingDetailProps {
  params: { id: string }; // Matches the dynamic route name
}

export default function ListingDetailsPage() {
  const params = useParams();
  const listingId = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const [listing, setListing] = useState<any>(null); // Use 'any' for simplicity here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await listingsApi.getOne(listingId);
        setListing(response.data); 
        console.log('Fetched listings:', response.data);
      } catch (err) {
        setError('Failed to load listing details.');
      } finally {
        setLoading(false);
      }
    };
    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  if (loading) return <p className="text-center mt-20">Loading property details...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!listing) return <p className="text-center mt-20">Listing not found.</p>;

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Listing Information (2/3 width) */}
      <div className="lg:col-span-2">
        {/* Placeholder for images (Photos URL requirement) */}
        <div className="mb-6 rounded-lg overflow-hidden border">
            <img src={listing.photoUrls[0] || 'placeholder-url'} alt={listing.title} className="w-full h-96 object-cover" />
        </div>
        
        <h1 className="text-4xl font-extrabold mb-2">{listing.title}</h1>
        <p className="text-xl text-gray-600 mb-4">{listing.city} &middot; Hosted by <b>{listing.hostName}</b></p>
        
        <hr className="my-6" />

        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p className="text-gray-700">{listing.description}</p>
      </div>

      {/* Booking Component (1/3 width) */}
      <div className="lg:col-span-1 sticky top-4 self-start border p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-baseline mb-4">
            <span className="text-3xl font-bold">${listing.pricePerNight}</span>
            <span className="text-lg text-gray-600">/ night</span>
        </div>
        <hr className="mb-4" />
        <h2 className="text-xl font-semibold mb-3">Book Now</h2>
        {/* Booking Form component handles the "Book Now" action (Requirement 5) */}
        <BookingForm listingId={listingId} pricePerNight={listing.pricePerNight} />
      </div>
    </div>
  );
}