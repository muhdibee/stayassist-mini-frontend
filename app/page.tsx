'use client';

import { useRouter } from 'next/navigation';
import SearchBar from '@/components/SearchBar'; // Import the previously created SearchBar
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

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

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      
      {/* Hero Section - Now with Video Background */}
      <div className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        
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
            <source src="https://assets.mixkit.co/videos/25001/25001-720.mp4" type="video/mp4" /> 
        </video>
        
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

      {/* Featured Listings/Call to Action Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Featured Destinations
        </h2>
        
        <p className="text-gray-600 mb-8">
          Explore top-rated places hand-picked by our community.
        </p>

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
                className="inline-block px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
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
                href="/contact" 
                className="inline-block px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
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
  );
}