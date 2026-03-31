"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ArrowRight, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // State to prevent form flashing while checking the database
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  // Check subscription status on mount
  useEffect(() => {
    const checkSubscription = async () => {
      // If user is logged in, ask the database if they are subscribed
      if (status === "authenticated") {
        try {
          const res = await fetch("/api/subscribe", { cache: "no-store" });
          const data = await res.json();
          setIsSubscribed(data.isSubscribed);
        } catch (error) {
          console.error("Failed to fetch status");
        }
      }
      setIsCheckingStatus(false);
    };

    // Only check once NextAuth has finished figuring out if the user is logged in or not
    if (status !== "loading") {
      checkSubscription();
    }
  }, [status]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status !== "authenticated") {
      toast.error("Please sign in to subscribe to our newsletter!", {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      });
      return;
    }

    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Successfully subscribed to the newsletter! 🎉");
        setIsSubscribed(true); 
      } else {
        toast.error(data.message || "Failed to subscribe. Try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Reduced padding on smaller screens (py-12 to py-24 on desktop)
    <section className="py-12 md:py-16 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Adjusted border-radius and inner paddings for mobile vs desktop */}
        <div className="relative bg-[#48a9f8] bg-[url('/images/sky-bg.jpg')] bg-cover bg-center bg-no-repeat rounded-4xl md:rounded-[2.5rem] overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-8 md:px-12 flex flex-col items-center text-center shadow-2xl shadow-blue-500/20">
          
          <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-3xl mx-auto">
            {/* Scaled down heading sizes for mobile */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-md">
              Get Expertly Crafted Resumes<br className="hidden md:block" />
              Delivered Directly to Your Inbox!
            </h2>
            
            {/* Scaled text and margins for paragraphs */}
            <p className="text-white/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto mb-8 md:mb-12 drop-shadow-sm px-2 sm:px-0">
              Discover cutting-edge AI solutions designed to elevate your career to new
              heights and drive sustainable growth in today's competitive job market.
            </p>

            {/* --- Conditional Rendering Logic --- */}
            {status === "loading" || isCheckingStatus ? (
              /* Skeleton Loader - responsive width/height */
              <div className="h-14 md:h-16 w-full max-w-[280px] sm:max-w-[300px] mx-auto bg-white/20 rounded-full animate-pulse flex items-center justify-center">
                 <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : isSubscribed ? (
              /* --- SPARKLING SUBSCRIBED BUTTON --- */
              <div className="relative inline-flex group animate-fade-in-up w-full sm:w-auto px-4 sm:px-0">
                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-linear-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-pulse"></div>
                {/* Scaled padding and text sizes for mobile */}
                <button className="relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-white transition-all duration-200 bg-slate-900 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:scale-105 cursor-default">
                  <Sparkles className="text-yellow-400 animate-pulse" size={20} />
                  You're Subscribed!
                </button>
              </div>
            ) : (
              /* --- INPUT FORM --- */
              /* Adjusted form paddings and button sizes to fit tight mobile screens */
              <form 
                onSubmit={handleSubscribe} 
                className="relative w-full max-w-lg mx-auto bg-white rounded-full p-1.5 sm:p-2 pl-4 sm:pl-6 flex items-center shadow-xl shadow-black/10"
              >
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 font-medium text-sm sm:text-base w-full min-w-0"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white hover:scale-105 hover:shadow-lg transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}