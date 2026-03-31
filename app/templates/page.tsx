// app/templates/page.tsx
"use client";

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Lock, Loader2 } from 'lucide-react';
import { RESUME_TEMPLATES } from '@/data/templates';

function TemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const selectedType = searchParams.get('type') || 'All';

  const handleSelectTemplate = (templateId: string) => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      const callbackUrl = `/builder?template=${templateId}`;
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } else {
      router.push(`/builder?template=${templateId}`);
    }
  };

  const categories = ['All', 'Premium', 'Free', 'Casual', 'Creative', 'Corporate', 'Professional'];

  let filteredTemplates = RESUME_TEMPLATES;

  if (selectedType.toLowerCase() === 'premium') {
    filteredTemplates = RESUME_TEMPLATES.filter(t => t.price >= 50 && t.price <= 150);
  } else if (selectedType.toLowerCase() !== 'all') {
    filteredTemplates = RESUME_TEMPLATES.filter(t => t.type.toLowerCase() === selectedType.toLowerCase());
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Professional Resume Templates
        </h1>
        <p className="text-slate-600 mt-3 text-lg">
            Select a design. Create in minutes. Download as a PDF or Docx.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              router.push(cat === 'All' ? '/templates' : `/templates?type=${cat}`);
            }}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              selectedType.toLowerCase() === cat.toLowerCase()
                ? 'bg-[#0086FF] text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-blue-50 hover:text-[#0086FF] border border-gray-200'
            }`}
          >
            {/* Show a cool label for Premium */}
            {cat === 'Premium' ? 'Premium (50-150 KSH)' : cat}
          </button>
        ))}
      </div>

      {/* TEMPLATES GRID */}
      {filteredTemplates.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTemplates.map((template) => (
            <div 
              key={template.id} 
              onClick={() => handleSelectTemplate(template.id)} // 👈 MOVED onClick HERE
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col cursor-pointer" // 👈 Added cursor-pointer
            >
              
              {/* Thumbnail Container */}
              {/* Note: I added brackets to aspect-[210/297] to ensure proper tailwind rendering */}
              <div className={`aspect-210/297 w-full ${template.accentColor} relative flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-4 bg-white shadow-sm opacity-60 flex flex-col p-2 gap-1 pointer-events-none">
                      <div className="h-2 bg-gray-200 w-1/3 rounded"/>
                      <div className="h-1 bg-gray-100 w-full mt-2 rounded"/>
                      <div className="h-1 bg-gray-100 w-full rounded"/>
                      <div className="h-10 bg-gray-50 w-full mt-2 rounded border border-dashed border-gray-200"/>
                  </div>

                  <Image src={template.thumbnail} alt={template.name} fill className="object-cover" /> 
                
                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    {/* 👈 Changed from <button> to <span> to prevent nested interactive elements. Clicks now bubble up to the parent card */}
                    <span 
                      className="bg-[#0086FF] text-white font-semibold py-2 px-6 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all pointer-events-none"
                    >
                      Use This Template
                    </span>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute top-2 right-2">
                      {template.price === 0 ? (
                          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                              FREE
                          </span>
                      ) : (
                          <span className="bg-white text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                              <Lock size={10} className="text-gray-400"/> {template.price} KSH
                          </span>
                      )}
                  </div>
              </div>

              {/* Info Container */}
              <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{template.name}</h3>
                    <p className="text-xs text-gray-500 font-medium">{template.type}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
           <h3 className="text-xl font-bold text-slate-700">No templates found for "{selectedType}"</h3>
           <button 
             onClick={() => router.push('/templates')}
             className="mt-4 text-[#0086FF] font-bold hover:underline"
           >
             View All Templates
           </button>
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center pt-24"><Loader2 className="animate-spin text-[#0086FF]" size={40}/></div>}>
      <TemplatesContent />
    </Suspense>
  );
}