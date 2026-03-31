"use client";

import Link from 'next/link';
import { Wand2, Hexagon } from 'lucide-react';
import { usePathname } from 'next/navigation'; // 1. Import this

export default function Footer() {
  const pathname = usePathname(); // 2. Call the hook
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3. If we are on the preview page, hide the footer entirely
  if (pathname.startsWith('/preview')) {
    return null;
  }

  return (
    // Reduced top padding on mobile (pt-12) scaling up to desktop (lg:pt-20)
    <footer className="w-full bg-white relative pt-12 md:pt-16 lg:pt-20 pb-8 overflow-hidden border-t border-gray-50">
      
      {/* Scaled side paddings for tight mobile screens */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* --- Top Section: Brand & Links --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 md:gap-16 mb-10 md:mb-16">
          
          {/* Brand & Description */}
          <div className="max-w-md w-full">
            <Link href="/" className="flex items-center gap-2 mb-4 md:mb-6">
              {/* Scaled Logo Icon */}
              <div className="w-7 h-7 md:w-8 md:h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm shrink-0">
                <Hexagon fill="currentColor" className="text-white w-[18px] h-[18px] md:w-5 md:h-5" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 tracking-tight">AuraResume</span>
            </Link>
            
            <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed font-medium sm:pr-4">
              AI-powered resume builder helps you create personalized, professional 
              resumes quickly. Leverage advanced technology to stand out with tailored 
              content and optimized designs for your dream job.
            </p>
          </div>

          {/* Links Columns - Adjusted to always be 2 columns but with scaling gaps */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-24 lg:gap-32 w-full lg:w-auto">
            
            {/* Column 1: Product */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4 md:mb-6 text-sm md:text-base">Product</h3>
              <ul className="space-y-3 md:space-y-4 text-sm md:text-[15px] font-medium text-slate-500">
                <li><Link href="/features" className="hover:text-slate-900 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link></li>
                <li><Link href="/subscription" className="hover:text-slate-900 transition-colors">Integrations</Link></li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4 md:mb-6 text-sm md:text-base">Company</h3>
              <ul className="space-y-3 md:space-y-4 text-sm md:text-[15px] font-medium text-slate-500">
                <li><Link href="/#about" className="hover:text-slate-900 transition-colors">About Us</Link></li>
                <li><Link href="/#services" className="hover:text-slate-900 transition-colors">Services</Link></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* --- Middle Section: Giant Faded Watermark Text --- */}
        <div className="w-full flex justify-center items-center py-6 md:py-8 select-none pointer-events-none overflow-hidden">
          <h1 className="text-[clamp(2.2rem,10.5vw,14rem)] lg:text-[clamp(6rem,14vw,18rem)] font-bold text-slate-400 md:text-slate-400/50 lg:text-slate-400 leading-none tracking-tighter w-full text-center">
            AuraResume
          </h1>
        </div>

        {/* --- Bottom Section: Copyright & Legal --- */}
        <div className="mt-8 flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-slate-600 font-medium border-t border-gray-100 pt-6 md:border-none md:pt-0">
          <p className="text-center md:text-left">
            2026 © AuraResume Copyright. All Right Reserved
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 md:gap-8">
              <Link href="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-900 transition-colors">Terms of Services</Link>
              <Link href="/cookies" className="hover:text-slate-900 transition-colors">Cookies Settings</Link>
          </div>
        </div>

      </div>

      {/* --- Floating Action Button (Scroll to Top) --- */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 md:bottom-10 md:right-10 w-12 h-12 md:w-14 md:h-14 bg-[#4A4A4A] hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 z-50 group"
        aria-label="Back to top"
      >
        <Wand2 className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
      </button>

    </footer>
  );
}