'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // Client-side cookie utility
import { Loader2 } from 'lucide-react';

export default function LogoutPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Logging you out...');

  useEffect(() => {
    // 1. Display a loading state
    setMessage('Logging out...');

    // Function to handle the full logout process
    const handleLogout = async () => {
      try {
        // Step 1: Clear the JWT cookie on the client side
        // The cookie name should match the one set by the backend (assumed 'jwt' as per lib/api.ts)
        Cookies.remove('jwt', { path: '/' }); 
        
        // In a production application, you might also call a backend endpoint 
        // here to explicitly invalidate the server-side token session.

        setMessage('Logout successful! Redirecting...');
        
        // Wait a moment for better user experience before redirecting
        setTimeout(() => {
          // Step 2: Redirect to the home page after successful logout
          router.push('/'); 
        }, 1000); 

      } catch (error) {
        console.error('Error during logout:', error);
        setMessage('Logout failed. Please try again.');
        // Redirect to login on unexpected error
        setTimeout(() => {
            router.push('/login'); 
        }, 3000);
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center border border-gray-100">
        <Loader2 className="w-10 h-10 text-red-500 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">{message}</h1>
        <p className="text-gray-500 mt-2">
            You are being securely signed out of your account.
        </p>
      </div>
    </div>
  );
}