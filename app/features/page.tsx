// app/features/page.tsx
import React from 'react';
import Image from 'next/image';
import { Check, Zap, FileText, Download, } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      
      {/* 1. HERO SECTION (The Big Laptop) */}
      <section className="pt-32 pb-20 text-center px-4">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Why Choose Our AI Resume Builder?
          </h1>
          <p className="text-xl text-slate-600">
            Smart Features to Elevate Your Job Application
          </p>
        </div>

        {/* The Laptop/Dashboard Image Wrapper */}
        <div className="relative max-w-6xl mx-auto">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-blue-100 blur-3xl rounded-full opacity-50 -z-10 transform scale-90"></div>
            
            <div className="relative rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-white">
                {/* Placeholder for dashboard-main.png */}
                {/* If you don't have the image yet, this gray box will show instead */}
                <div className="aspect-video relative bg-slate-50 flex items-center justify-center">
                    <Image 
                        src="/images/dashboard-main.png" 
                        alt="AuraResume Dashboard" 
                        fill 
                        className="object-cover"
                    />
                    {/* Floating Badge 1 (ATS Friendly) */}
                    <div className="absolute top-10 left-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs text-left hidden md:block animate-bounce-slow">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                            <FileText className="text-blue-600 w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900">ATS-Friendly</h3>
                        <p className="text-xs text-slate-500 mt-1">Ensure your resume passes Applicant Tracking Systems effortlessly.</p>
                    </div>

                    {/* Floating Badge 2 (AI Powered) */}
                    <div className="absolute bottom-10 right-10 bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-xs text-left hidden md:block">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                            <Zap className="text-purple-600 w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-900">AI Suggestions</h3>
                        <p className="text-xs text-slate-500 mt-1">Real-time recommendations to improve wording.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2. STEPS SECTION (Zig-Zag Layout) */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-24">
        
        {/* STEP 1: Enter Details (Image Left, Text Right) */}
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 relative">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
                    {/* Placeholder for step-1-details.png */}
                    <Image src="/images/step-1-details.png" width={500} height={400} alt="Enter Details" className="rounded-lg shadow-md w-full" />
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 font-bold rounded-xl flex items-center justify-center text-xl">1</div>
                <h2 className="text-3xl font-bold text-slate-900">Enter Your Details</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Start by providing key information such as your job title, experience, and skills. 
                    Our AI-powered system tailors suggestions based on your input to match industry standards in Kenya and globally.
                </p>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-700">
                        <Check className="w-5 h-5 text-green-500" /> Simple form interface
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                        <Check className="w-5 h-5 text-green-500" /> Import from LinkedIn (Coming Soon)
                    </li>
                </ul>
            </div>
        </div>

        {/* STEP 2: AI Enhances (Text Left, Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
             <div className="flex-1 relative">
                <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100 shadow-sm">
                    {/* Placeholder for step-2-ai.png */}
                    <Image src="/images/step-2-ai.png" width={500} height={400} alt="AI Enhancements" className="rounded-lg shadow-md w-full" />
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 font-bold rounded-xl flex items-center justify-center text-xl">2</div>
                <h2 className="text-3xl font-bold text-slate-900">AI Enhances Your Resume</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    The AI instantly analyzes your details, suggesting improvements for clarity, relevance, and impact. 
                    It also formats your resume automatically, ensuring a professional look.
                </p>
                <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 italic">"Suggested: Rephrase 'Did sales' to 'Achieved 20% growth in sales revenue over Q3'"</p>
                </div>
            </div>
        </div>

        {/* STEP 3: Customize (Image Left, Text Right) */}
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 relative">
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
                    {/* Placeholder for step-3-preview.png */}
                    <Image src="/images/step-3-preview.png" width={500} height={400} alt="Customize Resume" className="rounded-lg shadow-md w-full" />
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="w-12 h-12 bg-cyan-100 text-cyan-600 font-bold rounded-xl flex items-center justify-center text-xl">3</div>
                <h2 className="text-3xl font-bold text-slate-900">Customize & Preview in Real-Time</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Personalize your resume by selecting different templates (Corporate, Creative, Casual). 
                    See instant changes as you fine-tune your fonts, colors, and layout to perfection.
                </p>
                <div className="flex gap-4">
                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">Roboto</span>
                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">12px</span>
                     <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">#000000</span>
                </div>
            </div>
        </div>

        {/* STEP 4: Download (Text Left, Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
             <div className="flex-1 relative">
                <div className="bg-green-50 rounded-2xl p-8 border border-green-100 shadow-sm">
                    {/* Placeholder for step-4-download.png */}
                    <Image src="/images/step-4-download.png" width={500} height={400} alt="Download Resume" className="rounded-lg shadow-md w-full" />
                </div>
            </div>
            <div className="flex-1 space-y-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 font-bold rounded-xl flex items-center justify-center text-xl">4</div>
                <h2 className="text-3xl font-bold text-slate-900">Download or Share Instantly</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    Once you're satisfied with your resume, pay via M-Pesa or Card to download it in PDF format.
                    Ready to apply for jobs in minutes!
                </p>
                <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition">
                    <Download size={18} /> Download Sample PDF
                </button>
            </div>
        </div>

      </section>

      
    </div>
  );
}