'use client';

import Link from 'next/link';

// Define the expected structure of a listing object
interface Listing {
  _id: string; // The unique ID for the dynamic route
  title: string;
  pricePerNight: number;
  city: string;
  photos: string[]; // Array of photo URLs
  hostName: string;
}

interface ListingCardProps {
  listing: Listing;
}

// Placeholder Image URL
const PLACEHOLDER_IMG = 'https://placehold.co/400x300/e5e7eb/6b7280?text=StayAssist';

export default function ListingCard({ listing }: ListingCardProps) {
  const imageUrl = listing.photos?.[0] || PLACEHOLDER_IMG;

  return (
    <Link 
      href={`/listings/${listing._id}`} 
      className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
    >
      {/* Listing Photo */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={listing.title}
          onError={(e: any) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Price Tag Overlay */}
        <div className="absolute top-2 right-2 bg-white text-gray-900 font-bold py-1 px-3 rounded-full shadow-md">
            ${listing.pricePerNight} / night
        </div>
      </div>

      {/* Listing Details */}
      <div className="p-4">
        {/* Title and City */}
        <h3 className="text-xl font-semibold mb-1 truncate text-gray-800 group-hover:text-red-600 transition-colors">
          {listing.title}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
            {listing.city} &middot; Hosted by {listing.hostName}
        </p>

        {/* Quick Summary */}
        <div className="mt-3 flex justify-between items-center">
             <span className="text-lg font-bold text-gray-900">
                ${listing.pricePerNight}
             </span>
             <span className="text-sm text-red-500 font-medium">
                View Details
             </span>
        </div>
      </div>
    </Link>
  );
}