"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';
import { usePathname } from 'next/navigation'; // 1. Import this

export default function CookieBanner() {
  const pathname = usePathname(); // 2. Call the hook
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  // 3. Hide if it's not visible OR if we are on the preview page
  if (!isVisible || pathname.startsWith('/preview')) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-5 relative">
        
        {/* Close Button (Acts as reject) */}
        <button 
          onClick={handleReject}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition bg-gray-50 hover:bg-gray-100 rounded-full p-1"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
            <Cookie size={20} />
          </div>
          <div className="pr-4">
            <h3 className="font-bold text-gray-900 mb-1 text-sm">We value your privacy</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              <Link href="/cookies" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-medium">
                Cookie Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={handleReject}
            className="flex-1 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl transition border border-gray-200"
          >
            Reject All
          </button>
          <button 
            onClick={handleAccept}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition shadow-sm"
          >
            Accept All
          </button>
        </div>

      </div>
    </div>
  );
}