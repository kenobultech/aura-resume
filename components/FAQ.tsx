"use client";

import React, { useState } from "react";
import { Plus, X, FileText, Clock, LayoutTemplate, FileCheck, Upload, Image as ImageIcon } from "lucide-react";

export default function FAQ() {
  const[openIndex, setOpenIndex] = useState<number | null>(0); // 0 makes the first item open by default

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs =[
    {
      icon: <FileText size={18} strokeWidth={1.5} />,
      question: "What is AuraResume and how does it work?",
      answer: "AuraResume is an AI-based app/website that helps users create resumes quickly and professionally. Users only need to fill in basic information (personal data, education, work experience, skills, etc.), and the system will assist in structuring the resume, suggesting relevant keywords, and generating a ready-to-download resume document.",
    },
    {
      icon: <Clock size={18} strokeWidth={1.5} />,
      question: "Can I finish my resume in just a few minutes?",
      answer: "Yes! Thanks to our AI-powered suggestions and easy-to-use templates, most users are able to complete a polished, professional resume in under 10 minutes.",
    },
    {
      icon: <LayoutTemplate size={18} strokeWidth={1.5} />,
      question: "What types of templates are available, and can I choose one based on my needs?",
      answer: "We offer a wide variety of templates ranging from ATS-Friendly and Minimalist to Creative and Corporate layouts. You can easily switch between them with a single click to see which fits your industry best.",
    },
    {
      icon: <FileCheck size={18} strokeWidth={1.5} />,
      question: "Are the resumes generated compatible with Applicant Tracking Systems (ATS)?",
      answer: "Absolutely. Our templates are specifically designed to be read perfectly by modern Applicant Tracking Systems, ensuring your resume easily passes automated bot filters and reaches human recruiters.",
    },
    {
      icon: <Upload size={18} strokeWidth={1.5} />,
      question: "Can I upload an old resume (e.g., PDF or Word) and update it with AuraResume?",
      answer: "Yes, you can simply upload your existing resume. Our AI will automatically extract the information, import it into our builder, and even offer smart suggestions to enhance your wording and bullet points.",
    },
    {
      icon: <ImageIcon size={18} strokeWidth={1.5} />,
      question: "Can I add photos, portfolio links, or attachments besides text?",
      answer: "Definitely! Depending on the template you select, you can easily add professional headshots, clickable links to your LinkedIn or personal portfolio, and configure custom sections to highlight your unique projects.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 text-sm font-medium mb-6 shadow-sm">
            Frequently Ask Question
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight">
            Get Your Questions Answered Quickly
          </h2>
        </div>

        {/* --- Accordion List --- */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                onClick={() => toggleFAQ(index)}
                className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen 
                    ? "border-gray-200 shadow-md" 
                    : "border-transparent shadow-sm hover:border-gray-200"
                }`}
              >
                {/* Question Row */}
                <div className="flex items-start justify-between p-5 md:p-6 gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Left Icon inside the subtle square */}
                    <div className="shrink-0 w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-600 bg-gray-50 mt-0.5">
                      {faq.icon}
                    </div>
                    
                    {/* Question Text */}
                    <h3 className={`text-base md:text-[17px] font-medium leading-relaxed pt-1 transition-colors ${isOpen ? "text-slate-900" : "text-slate-800"}`}>
                      {faq.question}
                    </h3>
                  </div>

                  {/* Right Plus/Cross Toggle Icon */}
                  <div className="shrink-0 pt-1">
                    {isOpen ? (
                      <X size={20} className="text-gray-400" />
                    ) : (
                      <Plus size={20} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Animated Answer Body */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* The padding left is matched to align exactly with the question text (pl-16 = 4rem = 8 icon + 4 gap) */}
                    <p className="pb-6 pl-15 pr-6 text-slate-500 text-[15px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}