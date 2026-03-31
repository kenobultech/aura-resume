"use client";
import React from 'react';
import { Sparkles, Cpu, Globe, BrainCircuit, Hexagon, Fingerprint } from 'lucide-react';

export default function Partners() {
  return (
    <section className="py-20 bg-white text-center flex flex-col items-center">
      {/* Top Badge */}
      <div className="inline-flex px-5 py-2 rounded-full border border-gray-200 text-gray-600 text-sm font-medium mb-10 shadow-sm">
        Our Trusted Partner
      </div>
      
      {/* Logos Container */}
      <div className="container mx-auto px-6 max-w-6xl flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
        
        {/* ChatGPT Mock */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <Hexagon size={28} className="text-black" />
          ChatGPT
        </div>
        
        {/* Gemini Mock */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <Sparkles size={28} className="text-blue-600" />
          Gemini
        </div>
        
        {/* Deepseek Mock */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <BrainCircuit size={28} className="text-blue-500" />
          deepseek
        </div>
        
        {/* Perplexity Mock */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <Globe size={28} className="text-teal-600" />
          perplexity
        </div>
        
        {/* Claude Mock */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <Cpu size={28} className="text-orange-600" />
          Claude
        </div>

        {/* Leonardo.Ai Mock */}
        <div className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <Fingerprint size={28} className="text-slate-700" />
          Leonardo.Ai
        </div>

      </div>
    </section>
  );
}