"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-40 pb-20 overflow-hidden flex flex-col items-center justify-start">
      
      {/* BACKGROUND (Sky Gradient + Clouds Image Fallback) */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0ea5e9] via-[#38bdf8] to-[#bae6fd]">
        {/* Make sure you have a cloudy sky image named sky-bg.jpg in public/images */}
        <Image 
          src="/images/sky-bg.jpg" 
          alt="Sky Background" 
          fill
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-md text-white text-sm font-medium mb-8 shadow-sm">
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-bold">Top #1</span>
          AI for Resume Builder
        </div>

        {/* Headlines */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
          Build Resume in One Click <br className="hidden md:block" />
          with AI effortlessly
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-medium">
          Transform the way you create your resume with AI. In just one click, you 
          can build a polished, professional resume in record time.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full px-4">
          <Link 
            href="/templates" 
            className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-lg"
          >
            Get Started Now
          </Link>
          
        </div>

        {/* HERO DASHBOARD MOCKUP */}
        <div className="relative w-full max-w-5xl mx-auto mt-4 px-4">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white/50 backdrop-blur-sm p-2">
            <Image 
              src="/images/hero.png" 
              alt="AuraResume Dashboard Preview" 
              fill
              className="object-contain rounded-xl shadow-sm"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}