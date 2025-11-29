import './globals.css';
import Navbar from '@/components/Navbar'; // Import the site-wide Navbar

// Metadata is standard for Next.js root layout
export const metadata = {
  title: 'StayFinder - Find Your Perfect Accommodation',
  description: 'Book short-term rentals and unique places to stay.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* The Navbar component is now placed here, outside the main content flow, 
            making it sticky and present on every page. */}
        <Navbar />
        
        {/* The children prop represents the content of the current page */}
        <div className="flex-grow">
            {children}
        </div>

        {/* You could add a Footer component here if needed */}
        
      </body>
    </html>
  );
}