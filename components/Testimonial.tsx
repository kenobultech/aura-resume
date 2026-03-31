"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // 5 Testimonials focused on career success and AuraResume's value
  const testimonials =[
    {
      id: 1,
      quote: "The Resume AI Builder has made crafting my resume so much easier! The dashboard is super user-friendly, and the AI suggestions really helped me highlight my skills and experience. A must-have tool for anyone looking to stand out!",
      author: "Samantha R.",
      role: "Senior Marketing",
      image: "/images/testimonial-1.jpeg", // Replace with your actual image paths
      bgColor: "bg-[#E6E8FB]", // Matches the pastel purple/blue background in your image
    },
    {
      id: 2,
      quote: "Thanks to AuraResume, my CV finally passed the automated ATS filters. I started getting callbacks from top tech firms within just two weeks of using the Minimalist Focus template. Simply incredible!",
      author: "David K.",
      role: "Software Engineer",
      image: "/images/testimonial-2.jpeg",
      bgColor: "bg-[#E8F3E9]", 
    },
    {
      id: 3,
      quote: "The AI suggestions were spot on. It rephrased my past duties into powerful achievements and highlighted my leadership skills in a way I couldn't have written myself. I just secured my dream job!",
      author: "Emily T.",
      role: "Product Manager",
      image: "/images/testimonial-3.jpeg",
      bgColor: "bg-[#FEF0E6]",
    },
    {
      id: 4,
      quote: "Clean, professional templates and effortless building. I saved hours of formatting frustration, and recruiters loved the 'Bold Impact' layout. It gave me the confidence I needed for my interviews.",
      author: "Marcus J.",
      role: "Financial Analyst",
      image: "/images/testimonial-4.jpeg",
      bgColor: "bg-[#F3E8EC]",
    },
    {
      id: 5,
      quote: "As a designer, I am very picky about UI and layout. Not only is the platform beautiful to use, but the generated resume helped me secure a senior role. It strikes the perfect balance between creative and professional.",
      author: "Sarah L.",
      role: "UX Designer",
      image: "/images/testimonial-5.jpeg",
      bgColor: "bg-[#E6F4F1]",
    },
  ];

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 300); // 300ms matches the CSS transition duration
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 300);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-medium mb-6 shadow-sm">
            Testimonial
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight">
            What they say about us
          </h2>
        </div>

        {/* --- Main Card --- */}
        <div className="bg-white rounded-4xl p-6 md:p-8 lg:p-12 shadow-sm border border-gray-100 max-w-5xl mx-auto flex flex-col md:flex-row gap-10 lg:gap-16 items-center">
          
          {/* Left: Image & Badge (Animates on change) */}
          <div 
            className={`w-full md:w-[45%] relative rounded-3xl overflow-hidden h-[350px] md:h-[450px] ${current.bgColor} transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            {/* Fallback image placeholder or actual Next/Image */}
            <Image 
              src={current.image}
              alt={current.author}
              fill
              className="object-cover object-top"
              // Remove this line when you have real images:
              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
            />
            
           

            
          </div>

          {/* Right: Content Section */}
          <div className="w-full md:w-[55%] flex flex-col">
            
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Animated Quote & Author */}
            <div className={`transition-all duration-300 transform ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              {/* Force a minimum height so the buttons don't jump around when text length changes */}
              <div className="min-h-[160px] md:min-h-[180px]">
                <p className="text-[20px] md:text-[22px] leading-relaxed text-slate-800 font-medium tracking-tight mb-8">
                  {current.quote}
                </p>
              </div>

              <p className="text-slate-400 text-lg">
                - {current.author}, <span className="text-slate-500">{current.role}</span>
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-10 md:mt-12">
              <button 
                onClick={handlePrev}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-slate-600 hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={handleNext}
                disabled={isAnimating}
                className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
              >
                <ChevronRight size={24} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}