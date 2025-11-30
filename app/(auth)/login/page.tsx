'use client'; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await authApi.login({ email, password });
      // The backend should set the HttpOnly cookie on success.
      router.push('/listings'); // Redirect to the main listings page
    } catch (err: any) {
      // General error handling for login/signup
      setError(err.response?.data?.message || 'Login failed. Check email/password.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... Email Input ... */}
        <div>
          <label className="block mb-1 font-medium">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 border rounded" />
        </div>
        {/* ... Password Input ... */}
        <div>
          <label className="block mb-1 font-medium">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 border rounded" />
        </div>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        <button type="submit" className="bg-red-500 text-white p-3 w-full rounded-lg font-semibold shadow-md hover:bg-red-600 transition-colors">
          Log In
        </button>
      </form>
      <p className="text-center mt-4 text-sm">
        Don't have an account? <Link href="/signup" className="text-blue-600 font-medium">Sign Up</Link>
      </p>
    </div>
  );
}