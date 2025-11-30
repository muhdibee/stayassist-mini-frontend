'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { listingsApi } from '@/lib/api'; 
import Link from 'next/link';

// Define the shape of the data being submitted
interface NewListingData {
  title: string;
  description: string;
  pricePerNight: number;
  city: string;
  hostName: string; // Ensure this matches the interface
  photoUrls: string[]; 
}

export default function CreateListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<NewListingData>({
    title: '',
    description: '',
    pricePerNight: 0,
    city: '',
    hostName: '', // FIX: Added missing hostName back to initial state
    photoUrls: [''], 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle changes for standard text/number inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  // Handle changes for the photo URL input array
  const handlePhotoChange = (index: number, value: string) => {
    const newPhotoUrls = [...formData.photoUrls];
    newPhotoUrls[index] = value;
    setFormData((prev) => ({
      ...prev,
      photoUrls: newPhotoUrls,
    }));
  };

  // Allow adding another photo URL input field
  const addPhotoInput = () => {
    setFormData((prev) => ({
      ...prev,
      photoUrls: [...prev.photoUrls, ''], 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic Validation
    if (formData.title.length < 5 || formData.pricePerNight <= 0 || !formData.city) {
      setError('Please fill in required fields (Title, City, Price).');
      setLoading(false);
      return;
    }

    try {
      // Filter out empty photo URLs before submission
      const dataToSubmit = {
        ...formData,
        photoUrls: formData.photoUrls.filter(url => url.trim() !== ''),
      };

      const response = await listingsApi.create(dataToSubmit);
      
      // LOG: Log success response for debugging the structure
      console.log("Listing created successfully. API response:", response.data);

      // FIX: Use optional chaining to safely check nested and flat response structures,
      // checking for both '_id' (Mongoose default) and 'id' (standard REST)
      const newListingId = response.data.data?.id 
                           || response.data.data?._id 
                           || response.data.id 
                           || response.data._id;
      
      if (!newListingId) {
          // If the ID cannot be found in the expected places, throw a specific error
          throw new Error('Listing created, but could not extract the new listing ID for redirection.');
      }

      setSuccess('Listing created successfully! Redirecting...');
      
      setTimeout(() => {
        router.push(`/listings/${newListingId}`);
      }, 1500);

    } catch (err: any) {
      // Catch blocks now handles API errors OR internal errors (like missing ID extraction)
      console.error('Submission or Redirection failed:', err);
      const errorMessage = err.message.includes('listing ID') 
        ? err.message // Display the specific ID extraction failure message
        : err.response?.data?.message || 'Failed to create listing. Please ensure you are logged in.';
        
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 md:p-10 border rounded-xl shadow-2xl bg-white">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-red-600">Create a New Listing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold text-gray-700">Title <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            id="title" 
            name="title"
            value={formData.title} 
            onChange={handleChange} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
            placeholder="Cozy apartment near downtown"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-1 font-semibold text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
            placeholder="Tell guests about your place..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Per Night */}
          <div>
            <label htmlFor="pricePerNight" className="block mb-1 font-semibold text-gray-700">Price Per Night ($) <span className="text-red-500">*</span></label>
            <input 
              type="number" 
              id="pricePerNight" 
              name="pricePerNight"
              value={formData.pricePerNight || ''} 
              onChange={handleChange} 
              required 
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block mb-1 font-semibold text-gray-700">City <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              id="city" 
              name="city"
              value={formData.city} 
              onChange={handleChange} 
              required 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
              placeholder="e.g., San Francisco"
            />
          </div>
          
          {/* Host Name */}
          <div>
            <label htmlFor="hostName" className="block mb-1 font-semibold text-gray-700">Host Name</label>
            <input 
              type="text" 
              id="hostName" 
              name="hostName"
              value={formData.hostName} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
              placeholder="Your name"
            />
          </div>
        </div>

        {/* Photos (URLs) */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Photo URLs (Main Image First)</label>
          {formData.photoUrls.map((photoUrl, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => handlePhotoChange(index, e.target.value)}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                placeholder={`Photo URL ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addPhotoInput}
            className="text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors mt-2"
          >
            + Add another photo URL
          </button>
        </div>

        {/* Error/Success Messages */}
        {error && <p className="text-red-500 text-sm font-medium mt-4">{error}</p>}
        {success && <p className="text-green-600 text-sm font-medium mt-4">{success}</p>}
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="bg-red-500 text-white p-4 w-full rounded-lg font-bold shadow-lg hover:bg-red-600 transition-colors disabled:bg-red-300"
        >
          {loading ? 'Creating Listing...' : 'Create Listing'}
        </button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-600">
        <Link href="/listings" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
          &larr; Back to Listings
        </Link>
      </p>
    </div>
  );
}