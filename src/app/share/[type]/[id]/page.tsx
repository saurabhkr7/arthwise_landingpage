'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

export default function ShareBridgePage() {
  const params = useParams() as { type: string; id: string };
  const { type, id } = params;
  const [attemptedRedirect, setAttemptedRedirect] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && type && id) {
      // Create the deep link URL
      const appLink = `arthwise://share/${type}/${id}`;
      
      // Attempt to redirect to the app
      window.location.href = appLink;
      setAttemptedRedirect(true);

      // Fallback: If the user is still on this page after 3 seconds, they probably don't have the app
      const timer = setTimeout(() => {
        console.log('App did not open, staying on bridge page.');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [type, id]);

  const handleOpenApp = () => {
    if (type && id) {
      window.location.href = `arthwise://share/${type}/${id}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center">
        <div className="mb-6">
          <Image
            src="/images/logo.png"
            alt="Arthwise Logo"
            width={120}
            height={120}
            className="mx-auto rounded-xl"
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Opening {type === 'contest' ? 'Contest' : 'Content'}...
        </h1>
        
        <p className="text-gray-600 mb-8">
          We're taking you to the Arthwise app to view this {type}.
        </p>

        <button
          onClick={handleOpenApp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition duration-200 mb-4"
        >
          Open in App
        </button>

        <div className="border-t border-gray-100 my-6 pt-6">
          <p className="text-sm text-gray-500 mb-4">Don't have the app yet?</p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://play.google.com/store/apps/details?id=com.arthwise" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Image 
                src="/images/google-play-badge.png" 
                alt="Get it on Google Play" 
                width={150} 
                height={45} 
                className="hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-gray-400">
        &copy; 2026 Arthwise. All rights reserved.
      </p>
    </div>
  );
}
