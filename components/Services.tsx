"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // <-- 1. IMPORT LINK
import { Zap, Upload, Sparkles } from "lucide-react";

export default function Services() {
  const features =[
    {
      icon: <Zap size={20} className="text-indigo-500" />,
      iconBg: "bg-indigo-50",
      title: "Build Resume in Minutes",
      description: "Create a professional resume in few minutes effortlessly",
      href: "/templates", // <-- Links to your template selection
    },
    {
      icon: <Upload size={20} className="text-emerald-500" />,
      iconBg: "bg-emerald-50",
      title: "Upload Existing Resume",
      description: "Upload your current resume to enhance or update it with AI",
      href: "/resume-improver", // <-- 2. LINKS TO OUR NEW FILE
    },
    {
      icon: <Sparkles size={20} className="text-blue-500" />,
      iconBg: "bg-blue-50",
      title: "AI Suggestion",
      description: "Instantly evaluate resume with AI feedback",
      href: "/resume-improver", // <-- Also links to the new AI improver
    },
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-medium mb-6 shadow-sm">
            Services
          </div>
          
          <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-6 leading-tight tracking-tight">
            Create Impressive Resumes.<br className="hidden md:block" />
            Secure Your Dream Job Sooner
          </h2>
          
          <p className="text-lg text-slate-400 font-normal leading-relaxed max-w-2xl">
            Build an AI-powered resume that showcases your strengths, saves you time,
            and increases your chances of securing your dream job.
          </p>
        </div>

        {/* --- Feature Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 max-w-5xl mx-auto">
          {features.map((feature, index) => (
           
            <Link 
              key={index} 
              href={feature.href}
              className="block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${feature.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        {/* --- Bottom Laptop Image --- */}
        <div className="relative w-full rounded-t-[2.5rem] md:rounded-t-[3rem] overflow-hidden border border-gray-100 shadow-2xl mx-auto bg-[#0a0a0a]">
          <Image
            src="/images/services-img.png"
            alt="AuraResume Application Interface"
            width={1200}
            height={800}
            priority
            className="w-full h-auto object-cover object-top"
          />
        </div>

      </div>
    </section>
  );
}