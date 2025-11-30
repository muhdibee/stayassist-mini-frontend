'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar'; 
import Link from 'next/link';
import { listingsApi } from '@/lib/api'; // Import the API
import { MapPin, DollarSign, Loader2, ArrowRight } from 'lucide-react'; // Added ArrowRight icon

// Define the interface for a Listing
interface Listing {
  _id: string;
  title: string;
  city: string;
  pricePerNight: number;
  photoUrls: string[];
}

export default function HomePage() {
  const router = useRouter();
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const FEATURED_COUNT = 4; // Fetch 4 listings

  // Function to fetch featured listings
  useEffect(() => {
    const fetchFeaturedListings = async () => {
      try {
        // Use the limit parameter to fetch only 4 listings
        const response = await listingsApi.getAll({ limit: FEATURED_COUNT });
        const listingData = response.data.data || response.data;

        if (Array.isArray(listingData)) {
          // Ensure we only take the specified number
          setFeaturedListings(listingData.slice(0, FEATURED_COUNT) as Listing[]);
        } else {
          setFeaturedListings([]);
        }
      } catch (err: any) {
        console.error('Error fetching featured listings:', err);
        setError('Failed to load featured listings.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedListings();
  }, []); // Run only once on mount

  // Function to handle the search parameters and redirect to the listings page
  const handleSearch = (searchData: { city: string, checkIn: string, checkOut: string }) => {
    // Construct the query string from the search data
    const params = new URLSearchParams();
    if (searchData.city) params.append('city', searchData.city);
    if (searchData.checkIn) params.append('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.append('checkOut', searchData.checkOut);

    // Redirect to the main listings page with search parameters
    router.push(`/listings?${params.toString()}`);
  };

  const renderFeaturedListings = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin mr-3" />
          <p className="text-lg text-gray-600">Finding the best stays...</p>
        </div>
      );
    }

    if (error) {
      return <p className="text-center text-red-500 py-10">{error}</p>;
    }

    if (featuredListings.length === 0) {
      return (
        <p className="text-center text-gray-500 py-10">
          No featured listings available right now. Try creating one!
        </p>
      );
    }
    
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredListings.map((listing) => (
          <Link 
            key={listing._id} 
            href={`/listings/${listing._id}`} 
            className="block bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image */}
            <div className="h-48 relative">
              <img
                src={listing.photoUrls[0] || 'https://placehold.co/600x400/ef4444/ffffff?text=StayFinder'}
                alt={listing.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = 'https://placehold.co/600x400/ef4444/ffffff?text=StayFinder';
                }}
              />
            </div>
            {/* Details */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{listing.title}</h3>
              <p className="flex items-center text-gray-500 text-sm mb-3">
                <MapPin className="w-4 h-4 mr-1 text-red-400" />
                {listing.city}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-extrabold text-red-600 flex items-center">
                  <DollarSign className="w-5 h-5 mr-1" />
                  {listing.pricePerNight}
                </p>
                <span className="text-xs font-semibold text-gray-500">per night</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Navbar component call is REMOVED from here */}
      
      <main className="min-h-screen bg-gray-50 pb-20">
        
        {/* Hero Section - Now with Video Background */}
        <div className="relative h-96 flex items-center justify-center text-white overflow-hidden">
          
          {/* Video Element */}
          <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0"
              // Fallback style if video doesn't load
              style={{ backgroundColor: '#ef4444' }} 
          >
          <source src="https://assets.mixkit.co/videos/25001/25001-720.mp4" type="video/mp4" />           </video>
          
          {/* Dark Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

          {/* Text Content */}
          <div className="text-center p-4 relative z-20">
            <h1 className="text-5xl font-extrabold mb-4 animate-fadeIn">
              Find Your Next Great Stay
            </h1>
            <p className="text-xl opacity-90 mb-8">
              The perfect accommodation is just a search away.
            </p>
          </div>
        </div>
        
        {/* Search Bar Container */}
        {/* Positioned slightly above the fold of the Hero section using negative margin */}
        <div className="-mt-16 relative z-30 container mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Featured Listings Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Featured Destinations
          </h2>
          
          {renderFeaturedListings()}

          {/* NEW: View All Listings Button */}
          {featuredListings.length > 0 && (
            <div className="flex justify-center mt-10">
                <Link
                    href="/listings"
                    className="flex items-center px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-colors transform hover:scale-[1.02]"
                >
                    View All Listings
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
            </div>
          )}
        </div>
        
        {/* Call to Action Section (Moved the old static content here) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">
            More to Explore
          </h2>
          
          {/* Call to Action Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-red-500 mb-2">Become a Host</h3>
              <p className="text-gray-600 mb-4">
                Earn money by sharing your space with travelers. It's simple and secure.
              </p>
              <Link 
                  href="/create-listing" 
                  className="inline-block px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                  Start Listing Today
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-red-500 mb-2">Exclusive Deals</h3>
              <p className="text-gray-600 mb-4">
                Sign up for our newsletter to get access to exclusive, limited-time offers.
              </p>
              <button 
                  className="inline-block px-4 py-2 text-sm bg-red-500  text-white rounded-lg hover:bg-gray-400 transition-colors"
              >
                  Subscribe Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-red-500 mb-2">Help & Support</h3>
              <p className="text-gray-600 mb-4">
                Need assistance with booking or hosting? Our support team is here 24/7.
              </p>
              <Link 
                  href="/" 
                  className="inline-block px-4 py-2 text-sm bg-red-500  text-white rounded-lg hover:bg-gray-400 transition-colors"
              >
                  Get Support
              </Link>
            </div>
          </div>
        </div>
        
        {/* Add a simple style block for the decorative pattern */}
        <style jsx global>{`
          .bg-pattern {
            background-image: radial-gradient(#fff 1px, transparent 1px);
            background-size: 8px 8px;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out;
          }
        `}</style>
      </main>
    </>
  );
}