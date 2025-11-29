// src/components/BookingForm.tsx
'use client';

import { useState } from 'react';
import { bookingApi } from '@/lib/api';

interface BookingFormProps {
  listingId: string;
  pricePerNight: number;
}

export default function BookingForm({ listingId, pricePerNight }: BookingFormProps) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState('');

  // Simple price calculation (Backend should validate/recalculate this)
  const calculateDays = (start: string, end: string) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
  };

  const days = calculateDays(checkInDate, checkOutDate);
  const totalPrice = days > 0 ? days * pricePerNight : 0;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    if (days <= 0) {
        setMessage('❌ Please select valid check-in and check-out dates.');
        return;
    }
    
    try {
      const bookingData = {
        listingId,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        totalPrice, 
      };
      
      await bookingApi.create(bookingData);
      setMessage('✅ Booking successful! Redirecting to confirmation...');
      // In a real app, you would redirect to a confirmation page here
    } catch (err: any) {
      if (err.response?.status === 401) {
          setMessage('❌ Login required to make a booking.');
      } else {
          setMessage(err.response?.data?.message || '❌ Booking failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date Inputs */}
      <div>
        <label className="block mb-1 text-sm font-medium">Check-in</label>
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">Check-out</label>
        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-2 border rounded" required />
      </div>
      {/* Guest Input */}
      <div>
        <label className="block mb-1 text-sm font-medium">Guests</label>
        <input type="number" min="1" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value))} className="w-full p-2 border rounded" required />
      </div>

      {/* Price Summary */}
      <div className="flex justify-between font-semibold">
          <span>{days} nights x ${pricePerNight}</span>
          <span>${totalPrice}</span>
      </div>

      {message && (
        <p className={message.startsWith('✅') ? 'text-green-600' : 'text-red-500'}>
          {message}
        </p>
      )}

      {/* Book Now Button */}
      <button type="submit" className="bg-red-500 text-white p-3 w-full rounded font-semibold transition-colors hover:bg-red-600">
        Book Now
      </button>
    </form>
  );
}