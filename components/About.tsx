
// app/components/About.tsx
"use client";
import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white flex flex-col items-center text-center">
      <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium mb-12 shadow-sm">
          About Us
        </div>
        
        {/* Large Typography */}
        <h2 className="text-3xl md:text-5xl lg:text-[54px] font-medium text-slate-900 leading-[1.3] tracking-tight">
          With our AI-powered tool, you can create a professional 
          resume quickly, simply, and stress-free. Whether you're just 
          starting your career, exploring new opportunities,{' '}
          <span className="text-gray-400">
            or ready to take it to the next level, our platform guides you every step.
          </span>
        </h2>
        
      </div>
    </section>
  );
}