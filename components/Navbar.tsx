'use client';

import { useState } from 'react';
import Link from 'next/link';
// Icon imports for a cleaner look
import { Menu, X, Home, Compass, User, LogIn, PlusCircle, CalendarCheck } from 'lucide-react'; // Added CalendarCheck

// You would typically fetch and check authentication state here
// We keep this variable but its conditional logic is now ignored for authLinks as requested.
const isAuthenticated = true; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Link configuration
  const primaryLinks = [
    { href: '/', label: 'Home', Icon: Home },
    { href: '/listings', label: 'Listings', Icon: Compass },
    { href: '/my-bookings', label: 'My Bookings', Icon: CalendarCheck },
  ];

  // UPDATED: This is now an empty array, so My Bookings is not in the primary navigation area.
  const authenticatedLinks: any = []; 
  
  // UPDATED: Show only Login and Sign Up links, regardless of the isAuthenticated status.
  const authLinks = [
    { href: '/login', label: 'Login', Icon: LogIn },
    { href: '/signup', label: 'Sign Up', Icon: User },
  ];

  const hostLink = { href: '/create-listing', label: 'Host', Icon: PlusCircle };

  // Combine primary and authenticated links for desktop (authenticatedLinks is now always empty)
  const desktopNavLinks = [
    ...primaryLinks,
    ...authenticatedLinks
  ];

  // Combine all links for mobile
  const mobileNavLinks = [
    ...primaryLinks, 
    ...authenticatedLinks,
    hostLink, 
    ...authLinks
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-extrabold text-red-600 hover:text-red-700 transition-colors">
              Stay<span className="text-gray-800">Assit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center space-x-6">
            
            {/* Primary Links */}
            {desktopNavLinks.map((link) => ( 
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <link.Icon className="w-4 h-4 mr-1" />
                {link.label}
              </Link>
            ))}

            {/* Host Link (Always visible) */}
            <Link
              href={hostLink.href}
              className="px-4 py-2 text-sm font-medium text-red-600 border-2 border-red-600 rounded-full hover:bg-red-50 transition-all"
            >
              Become a Host
            </Link>

            {/* Auth Links (Always Login and Sign Up) */}
            <div className="flex space-x-2">
                {authLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
            {/* All links in mobile view */}
            {mobileNavLinks.map((link) => ( 
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <div className="flex items-center">
                    <link.Icon className="w-5 h-5 mr-3" />
                    {link.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}