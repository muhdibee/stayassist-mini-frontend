'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api'; // Uses the centralized API service
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation (e.g., check for simple password strength in a real app)
    if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    try {
      const userData = { name, email, password };
      
      // Call the API endpoint defined in lib/api.ts
      await authApi.signup(userData);
      
      setSuccess('Signup successful! Redirecting to login...');
      
      // Redirect to the login page so the user can sign in with their new credentials
      setTimeout(() => {
        router.push('/login');
      }, 1500); 

    } catch (err: any) {
      // Handle API errors (e.g., email already registered, validation errors)
      const errorMessage = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-xl bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500" 
          />
        </div>
        
        {/* Error/Success Messages */}
        {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2 font-medium">{success}</p>}
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="bg-red-500 text-white p-3 w-full rounded-lg font-semibold shadow-md hover:bg-red-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
      
      {/* Link to Login */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account? <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">Log In</Link>
      </p>
    </div>
  );
}