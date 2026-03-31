"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Script from "next/script"; // <-- Import Next.js Script
import { Loader2, CheckCircle, Wallet, Star } from "lucide-react";

const SUBSCRIPTION_PACKAGES =[
  { id: "casual-pack", name: "Casual Pass", category: "basic", price: 50, credits: 1, desc: "For simple, clean resumes." },
  { id: "creative-pack", name: "Creative Pass", category: "creative", price: 75, credits: 1, desc: "Stand out from the crowd." },
  { id: "corp-pack", name: "Corporate Pass", category: "corporate", price: 100, credits: 1, desc: "Best for traditional jobs." },
  { id: "pro-pack", name: "Professional Pass", category: "pro", price: 150, credits: 1, desc: "Premium ATS-friendly designs." },
  { id: "multi-pack", name: "Universal Pass", category: "multi", price: 500, credits: 5, desc: "Unlock ANY 5 templates forever.", isPopular: true },
];

export default function SubscriptionPage() {
  const { data: session, status } = useSession();
  
  const [balances, setBalances] = useState({
    corporate: 0, creative: 0, casual: 0, professional: 0, multi: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchCredits = async () => {
    if (status !== "authenticated") return;
    try {
      const res = await fetch("/api/user/credits");
      const data = await res.json();
      if (data.credits) {
        setBalances({
          corporate: data.credits.corporate || 0,
          creative: data.credits.creative || 0,
          casual: data.credits.casual || data.credits.basic || 0, 
          professional: data.credits.professional || data.credits.pro || 0,
          multi: data.credits.multi || 0
        });
      }
    } catch (error) {
      console.error("Failed to load credits", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const verifyPayment = async (reference: string) => {
    try {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();

      if (data.status === "success" || data.status === "already_verified") {
        alert("Payment Successful! Your credits have been added.");
        await fetchCredits(); 
      } else {
        alert("Verification failed. Please contact support.");
      }
    } catch (error) {
      alert("Error verifying payment.");
    } finally {
      // ✅ This ensures the loader stops after payment is verified
      setProcessingId(null);
    }
  };

const handleBuyPackage = async (pkg: typeof SUBSCRIPTION_PACKAGES[0]) => {
    setProcessingId(pkg.id); 
    try {
      // 1. Initialize on your backend
      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: "bundle",
          amount: pkg.price,
          creditsToGive: pkg.credits,
          targetCategory: pkg.category, 
        }),
      });

      const config = await res.json();
      
      // 🔥 DEBUGGING: Look in your browser console to see exactly what the backend returned
      console.log("Paystack Config from Backend:", config);

      if (!res.ok) throw new Error(config.error || "Initialization failed");

      // 2. Safely grab the key (Prioritize the direct environment variable)
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || config.publicKey;

      if (!publicKey) {
        alert("The Paystack key is missing! Please restart your Next.js server.");
        setProcessingId(null);
        return;
      }

      // 3. Open Paystack Popup
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,           // Uses the exact key
        email: config.email,      // From backend
        amount: config.amount,    // Already multiplied by 100 in your backend route!
        ref: config.reference,    // Generated in backend
        currency: "KES",
        callback: function (response: any) {
          verifyPayment(response.reference);
        },
        onClose: function () {
          setProcessingId(null);
        },
      });

      handler.openIframe();

    } catch (error: any) {
      alert(error.message);
      setProcessingId(null); 
    }
  };


  if (isLoading) return <div className="h-screen flex justify-center items-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  const totalCredits = balances.corporate + balances.creative + balances.casual + balances.professional + balances.multi;

  return (
    <>
      {/* Load Paystack Script safely in Next.js */}
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />

      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-extrabold text-gray-900">Choose Your Package</h1>
            <p className="text-lg text-gray-500">Buy credits now to download your premium resumes later.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="text-blue-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Your Current Balances</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
               {/* Your existing balance code */}
              <div className="bg-blue-50 p-4 rounded-xl text-center border border-blue-100">
                <p className="text-sm text-blue-600 font-bold uppercase">Total</p>
                <p className="text-3xl font-black text-blue-900">{totalCredits}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <p className="text-sm text-gray-500 font-bold uppercase">Casual</p>
                <p className="text-2xl font-bold text-gray-800">{balances.casual}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <p className="text-sm text-gray-500 font-bold uppercase">Creative</p>
                <p className="text-2xl font-bold text-gray-800">{balances.creative}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <p className="text-sm text-gray-500 font-bold uppercase">Corporate</p>
                <p className="text-2xl font-bold text-gray-800">{balances.corporate}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                <p className="text-sm text-gray-500 font-bold uppercase">Pro</p>
                <p className="text-2xl font-bold text-gray-800">{balances.professional}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-xl text-center border border-yellow-200">
                <p className="text-sm text-yellow-600 font-bold uppercase flex items-center justify-center gap-1">
                  <Star size={14}/> Universal
                </p>
                <p className="text-2xl font-bold text-yellow-900">{balances.multi}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUBSCRIPTION_PACKAGES.map((pkg) => {
              const isThisProcessing = processingId === pkg.id;
              const isAnyProcessing = processingId !== null;

              return (
                <div 
                  key={pkg.id} 
                  className={`relative bg-white rounded-2xl p-8 border ${pkg.isPopular ? 'border-blue-500 shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm'} flex flex-col`}
                >
                  {pkg.isPopular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      Most Popular
                    </span>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-gray-500 mt-2 text-sm h-10">{pkg.desc}</p>
                  
                  <div className="mt-6 mb-8">
                    <span className="text-4xl font-extrabold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-500 font-medium"> KES</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="font-bold">{pkg.credits} Download{pkg.credits > 1 ? 's' : ''}</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="text-green-500" size={20} />
                      <span className="capitalize">Valid for <strong>{pkg.category === 'multi' ? 'Any' : pkg.category}</strong> templates</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="text-green-500" size={20} />
                      <span>Unlocks resume forever</span>
                    </li>
                  </ul>
                  
                  <button
                    onClick={() => handleBuyPackage(pkg)}
                    disabled={isAnyProcessing}
                    className={`w-full py-4 rounded-xl font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                      pkg.isPopular 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                        : 'bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer text-gray-900'
                    }`}
                  >
                    {isThisProcessing ? <Loader2 className="animate-spin mx-auto" size={20} /> : `Buy ${pkg.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}