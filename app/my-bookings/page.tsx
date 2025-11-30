'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { bookingApi } from '@/lib/api';
import Link from 'next/link';
import { Calendar, DollarSign, MapPin, Loader2, Frown } from 'lucide-react';

// Define the structure of a Booking item based on potential API response
interface Booking {
  _id: string;
  listing: {
    _id: string;
    title: string;
    city: string;
    photoUrls: string[];
  };
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  // Add other relevant fields like createdAt, guestCount, etc., if available
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch bookings data
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming bookingApi.getAll() fetches bookings associated with the authenticated user
      const response = await bookingApi.getAll(); 
      
      // Ensure the response data structure is an array of bookings
      const bookingData = response.data.data || response.data; // Handle nested or flat response
      
      if (Array.isArray(bookingData)) {
        setBookings(bookingData);
      } else {
        // Handle case where data is not an array (e.g., an empty object or just the single user's bookings summary)
        setBookings([]);
        console.warn('API returned non-array data for bookings:', bookingData);
      }
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      // Display error message, especially if it's an authorization issue
      const authError = "You must be logged in to view your bookings.";
      const apiMessage = err.response?.data?.message;
      setError(apiMessage || authError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);


  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin mr-3" />
          <p className="text-lg text-gray-600">Loading your bookings...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-xl">
          <Frown className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-700 font-semibold">{error}</p>
          <p className="text-sm text-red-600 mt-2">
            Please ensure your JWT cookie is set and valid, or try logging in again.
          </p>
        </div>
      );
    }

    if (bookings.length === 0) {
      return (
        <div className="text-center p-12 bg-gray-100 rounded-xl border-dashed border-2 border-gray-300">
          <Calendar className="w-10 h-10 text-gray-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700 mb-4">You haven't made any bookings yet.</p>
          <Link 
            href="/listings" 
            className="inline-block px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors font-medium"
          >
            Start Exploring Stays
          </Link>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-6">
        {bookings.map((booking) => (
          <Link 
            key={booking._id} 
            href={`/listings/${booking.listing._id}`} 
            className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            {/* Listing Image */}
            <div className="w-full md:w-56 h-48 md:h-auto flex-shrink-0">
              <img 
                src={booking.listing.photoUrls[0] || 'https://placehold.co/600x400/ef4444/ffffff?text=No+Image'} 
                alt={booking.listing.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = 'https://placehold.co/600x400/ef4444/ffffff?text=No+Image';
                }}
              />
            </div>
            
            {/* Booking Details */}
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1 hover:text-red-600 transition-colors">
                  {booking.listing.title}
                </h3>
                
                <p className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="w-4 h-4 mr-1 text-red-400" />
                  {booking.listing.city}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-red-500" />
                    <span className="font-semibold text-gray-700">Check-in:</span>
                    <span className="ml-2 text-gray-600">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-red-500" />
                    <span className="font-semibold text-gray-700">Check-out:</span>
                    <span className="ml-2 text-gray-600">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-xl font-bold text-green-700 flex items-center">
                    <DollarSign className="w-5 h-5 mr-1" />
                    {booking.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
                <span className="text-xs text-gray-500 bg-red-100 text-red-600 px-3 py-1 rounded-full font-medium">
                    Booking ID: {booking._id.slice(-8)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 border-b pb-2">Your Bookings</h1>
      <p className="text-gray-600 mb-8">View and manage all your upcoming and past reservations.</p>
      
      {renderContent()}
    </div>
  );
}