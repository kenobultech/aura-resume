"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ResumeTemplates() {
  const templates =[
    {
      id: 1,
      title: "ATS Friendly Resume",
      subtitle: "Selected by 20,032 user",
      color: "bg-[#5A6CEF]",
      image: "/images/template-ats.png",
      popular: true,
    },
    {
      id: 2,
      title: "Minimalist Focus Resume",
      subtitle: "Selected by 20,032 user",
      color: "bg-[#87A3A6]",
      image: "/images/template-minimalist.png",
      popular: false,
    },
    {
      id: 3,
      title: "Creative Profile Resume",
      subtitle: "Selected by 20,032 user",
      color: "bg-[#FF8B8B]",
      image: "/images/template-creative.png",
      popular: false,
    },
    
    {
      id: 4,
      title: "Tech Friendly Resume",
      subtitle: "Selected by 20,032 user",
      color: "bg-[#4031E2]",
      image: "/images/template-tech.png",
      popular: false,
    },
  ];

  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[90rem]">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-medium mb-6 shadow-sm">
            Resume Templates
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 mb-6 leading-tight tracking-tight">
            Choose a Template and Build Your <br className="hidden md:block" />
            Resume in Minutes
          </h2>
          
          <p className="text-lg text-slate-500 font-normal leading-relaxed max-w-2xl">
            Choose from professional resume templates, fill in your details, and have a polished
            resume ready in minutes perfect for quick, hassle-free job applications
          </p>
        </div>

        {/* --- Templates Container --- */}
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-gray-100 max-w-7xl mx-auto">
          
          {/* Container Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900 tracking-tight">
              Popular Templates
            </h3>
            <Link 
              href="/templates" 
              className="group flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              See More Templates
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {templates.map((template) => (
              <div 
                key={template.id} 
                className={`${template.color} rounded-2xl pt-6 px-5 relative overflow-hidden h-[340px] flex flex-col group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Popular Badge */}
                {template.popular && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10">
                    Most Popular
                  </div>
                )}

                {/* Card Text */}
                <div className="relative z-10 mb-6 pr-4">
                  <h4 className="text-white font-semibold text-lg leading-tight mb-1.5 drop-shadow-sm">
                    {template.title}
                  </h4>
                  <p className="text-white/80 text-xs font-medium">
                    {template.subtitle}
                  </p>
                </div>

                {/* Resume Image Wrapper */}
                <div className="mt-auto w-full relative h-[220px] bg-white rounded-t-xl overflow-hidden shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                  {/* 
                    Replace these paths with your actual resume screenshots.
                    I added a fallback background color so it looks good even before you add images.
                  */}
                  <div className="w-full h-full bg-slate-50 relative">
                     <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Placeholder content in case images aren't added yet */}
                    <div className="absolute inset-0 p-4 opacity-30 pointer-events-none">
                      <div className="w-1/2 h-2 bg-slate-300 rounded mb-4"></div>
                      <div className="w-full h-1 bg-slate-200 rounded mb-2"></div>
                      <div className="w-5/6 h-1 bg-slate-200 rounded mb-2"></div>
                      <div className="w-full h-1 bg-slate-200 rounded mb-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}