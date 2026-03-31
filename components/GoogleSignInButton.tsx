// components/GoogleSignInButton.tsx (or wherever this is located)
"use client";

import Image from 'next/image';
import { signIn } from 'next-auth/react'; // 1. Import signIn from next-auth

export default function GoogleSignInButton() {
  
  const handleGoogleLogin = () => {
    console.log("Initiating Google Login...");
    // 2. Call signIn, specify 'google' as the provider, and set the callbackUrl to '/' (Home page)
    signIn('google', { callbackUrl: '/' }); 
  };

  return (
    <button 
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full bg-white text-slate-700 font-medium py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200"
    >
        <div className="relative w-5 h-5">
            <Image 
                src="/images/google-logo.png" 
                alt="Google" 
                fill 
                className="object-contain"
            />
        </div>
        <span>Sign in with Google</span>
    </button>
  );
}