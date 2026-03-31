// app/pricing/page.tsx
import React from 'react';
import { Check, Info, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      
      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-slate-500 leading-relaxed">
          No monthly subscriptions. Pay only when you download. <br className="hidden md:block"/>
          Start for free, upgrade when you land the interview.
        </p>
      </div>

      {/* PRICING CARDS */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* FREE TIER */}
        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
          <div className="mb-4">
             <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
               Entry Level
             </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Free</h3>
          <div className="my-6">
             <span className="text-5xl font-bold text-slate-900">0 KSH</span>
             <span className="text-slate-500 font-medium"> / download</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 border-b border-gray-100 pb-8">
            Perfect for students, internships, and casual job applications.
          </p>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span>Access to <b>Free</b> Templates</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span>Standard PDF Export</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span>Basic Spell Check</span>
            </li>
          </ul>
          <Link href="/templates?type=Free" className="block w-full text-center py-4 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-[#0086FF] hover:text-[#0086FF] transition bg-transparent">
            Browse Free Templates
          </Link>
        </div>

        {/* PREMIUM TIER */}
        <div className="border-2 border-[#0086FF] rounded-2xl p-8 shadow-2xl bg-white relative transform md:-translate-y-4 flex flex-col">
           <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#0086FF] to-cyan-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-wider">
               MOST POPULAR
           </div>

           <div className="mb-4 mt-2">
             <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-[#0086FF] text-xs font-bold uppercase tracking-wider">
               Casual to Pro
             </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Professional</h3>
          <div className="my-6 flex items-baseline gap-1">
             <span className="text-lg text-slate-500 font-bold">KSH</span>
             <span className="text-5xl font-bold text-slate-900">50-150</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 border-b border-gray-100 pb-8">
            For serious professionals who need to beat the ATS bots.
          </p>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-[#0086FF] w-5 h-5 shrink-0"/> <span><b>All Premium</b> Templates</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-[#0086FF] w-5 h-5 shrink-0"/> <span><b>AI Smart</b> Text Rewriting</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-[#0086FF] w-5 h-5 shrink-0"/> <span>ATS Optimization Score</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-[#0086FF] w-5 h-5 shrink-0"/> <span>No Watermarks</span>
            </li>
          </ul>
          {/* 🌟 THIS LINK NOW PERFECTLY MATCHES THE VIRTUAL CATEGORY IN TEMPLATESPAGE */}
          <Link href="/templates?type=Premium" className="block w-full text-center py-4 px-4 rounded-xl bg-[#0086FF] text-white font-bold hover:bg-[#0070d6] transition shadow-lg shadow-blue-500/30">
            View Paid Templates
          </Link>
        </div>

        {/* BUNDLE TIER */}
        <div className="border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
          <div className="mb-4">
             <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
               Best Value
             </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Bundle Pack</h3>
          <div className="my-6 flex items-baseline gap-1">
             <span className="text-lg text-slate-500 font-bold">KSH</span>
             <span className="text-5xl font-bold text-slate-900">500</span>
          </div>
          <p className="text-sm text-slate-500 mb-8 border-b border-gray-100 pb-8">
             Applies to 5 premium downloads. <br/> Credits never expire.
          </p>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span><b>5 Premium</b> Downloads</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span>Save up to <b>250 KSH</b></span>
            </li>
            <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span>Priority Email Support</span>
            </li>
             <li className="flex items-start gap-3 text-sm text-slate-700">
                <Check className="text-green-500 w-5 h-5 shrink-0"/> <span>Multi-format Export (PDF/Word)</span>
            </li>
          </ul>
          <Link href="/templates" className="block w-full text-center py-4 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition">
             Choose Templates
          </Link>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
             <Info size={14} /> One-time payment. No auto-renew.
          </div>
        </div>

      </div>

      {/* TRUST & PAYMENTS */}
      <div className="mt-20 text-center border-t border-gray-100 pt-10">
        <p className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-widest">Secured by Paystack</p>
        <div className="flex justify-center items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition duration-500">
            <span className="font-bold text-xl text-slate-800">Paystack</span>
            <div className="flex flex-col items-center">
                <span className="font-bold text-xl text-green-600">M-PESA</span>
            </div>
            <span className="font-bold text-xl text-blue-900 italic">VISA</span>
            <span className="font-bold text-xl text-red-600">Mastercard</span>
        </div>
      </div>
    </div>
  );
}