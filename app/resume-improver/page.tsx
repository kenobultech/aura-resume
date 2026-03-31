"use client";

import React, { useState, useRef } from "react";
import { Sparkles, CheckCircle, Download, FileText, ArrowRight, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function ResumeImprover() {
  const [resumeData, setResumeData] = useState<any>(null);
  const[analysisResult, setAnalysisResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appliedImprovements, setAppliedImprovements] = useState<number[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Handle PDF Upload & Send to our NEW API Route
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setIsLoading(true);
    setResumeData(null);
    setAnalysisResult(null);
    setAppliedImprovements([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/improve-resume", {
        method: "POST",
        body: formData, // Sending as FormData, NOT JSON
      });

      const data = await res.json();
      
      if (res.ok) {
        setResumeData(data.resumeData);
        setAnalysisResult(data.analysis);
        toast.success("PDF Extracted and Analyzed!");
      } else {
        toast.error(data.error || "Failed to analyze.");
      }
    } catch (error) {
      toast.error("Something went wrong uploading the file.");
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
    }
  };

  // 2. Deep Replace Function
  const replaceTextDeep = (obj: any, target: string, replacement: string): any => {
    if (typeof obj === 'string') return obj.replace(target, replacement);
    if (Array.isArray(obj)) return obj.map(item => replaceTextDeep(item, target, replacement));
    if (typeof obj === 'object' && obj !== null) {
      const newObj: any = {};
      for (const key in obj) {
        newObj[key] = replaceTextDeep(obj[key], target, replacement);
      }
      return newObj;
    }
    return obj;
  };

  // 3. Apply changes locally
  const handleApplyImprovement = (index: number, originalText: string, improvedText: string) => {
    const resumeString = JSON.stringify(resumeData);
    if (!resumeString.includes(originalText)) {
      toast.error("Could not find exact text. You may have already changed it.");
      return;
    }

    const updatedResume = replaceTextDeep(resumeData, originalText, improvedText);
    setResumeData(updatedResume);
    setAppliedImprovements(prev => [...prev, index]);
    toast.success("Resume updated!");
  };

  // 4. Save/Export JSON
  const handleSave = () => {
    if (!resumeData) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${resumeData.name?.replace(/\s+/g, '_') || 'Improved'}_Resume.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success("Saved successfully!");
  };

  return (
    // Reduced padding for mobile, expanding on larger screens
    <div className="container mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-12 max-w-7xl min-h-screen">
      
      {/* HEADER: Flex-col on mobile, row on tablet/desktop */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 flex items-center gap-2">
          <FileText className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8" />
          AI Resume Improver
        </h1>
        {resumeData && (
          <button 
            onClick={handleSave} 
            className="w-full sm:w-auto bg-slate-900 text-white px-4 py-2.5 sm:py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Download size={18} /> Export Data
          </button>
        )}
      </div>

      {/* Upload Section */}
      {!resumeData && (
        <div className="max-w-2xl mx-auto mt-8 md:mt-12">
          <label className={`flex flex-col items-center justify-center w-full h-56 sm:h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all px-4 text-center ${isLoading ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isLoading ? (
                <>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="mb-2 text-base sm:text-lg font-semibold text-slate-700">Reading PDF & Generating Suggestions...</p>
                  <p className="text-xs sm:text-sm text-slate-500">This usually takes about 10 seconds.</p>
                </>
              ) : (
                <>
                  <UploadCloud className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400 mb-4" />
                  <p className="mb-2 text-base sm:text-lg font-semibold text-slate-700">Click to upload your PDF Resume</p>
                  <p className="text-xs sm:text-sm text-slate-500">Only PDF files are supported</p>
                </>
              )}
            </div>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="application/pdf" 
              className="hidden" 
              onChange={handleFileUpload}
              disabled={isLoading}
            />
          </label>
        </div>
      )}

      {/* Results Section */}
      {resumeData && (
        // Grid turns into 1 column on mobile/tablet, 2 on lg screens
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* LEFT COLUMN: Extracted Resume Viewer */}
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-700">Extracted Content</h2>
              <button 
                onClick={() => setResumeData(null)} 
                className="text-sm text-blue-500 hover:underline font-medium"
              >
                Upload Different CV
              </button>
            </div>
            
            {/* Scrollable container for long resumes on mobile */}
            <div className="space-y-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl max-h-[60vh] lg:max-h-none overflow-y-auto">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">{resumeData.name}</h3>
              
              <div>
                <strong className="text-slate-800 block mb-1">Summary:</strong>
                <p className="whitespace-pre-wrap">{resumeData.summary}</p>
              </div>

              <div>
                <strong className="text-slate-800 block mb-1 mt-4">Experience:</strong>
                {resumeData.experience?.map((exp: any, idx: number) => (
                  <div key={idx} className="mb-3 border-l-2 border-blue-200 pl-3">
                    <p className="font-semibold text-slate-800">{exp.role} at {exp.company}</p>
                    <p className="mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AI Suggestions */}
          <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-slate-700">AI Recommendations</h2>

            {analysisResult && (
              <div className="space-y-4 sm:space-y-6">
                
                {/* Score Card: Stacked content nicely spaced */}
                <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-blue-100 shadow-sm gap-4">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">Resume Score</p>
                    <p className="text-slate-800 font-medium text-sm sm:text-base leading-snug mt-0.5">{analysisResult.overallFeedback}</p>
                  </div>
                  <div className={`text-2xl sm:text-3xl font-bold shrink-0 ${analysisResult.score >= 80 ? 'text-green-500' : 'text-orange-500'}`}>
                    {analysisResult.score}/100
                  </div>
                </div>

                {/* Improvements List */}
                {analysisResult.actionableImprovements?.map((item: any, idx: number) => {
                  const isApplied = appliedImprovements.includes(idx);

                  return (
                    <div key={idx} className={`bg-white p-4 sm:p-5 rounded-xl border transition-all ${isApplied ? 'border-green-300 ring-1 ring-green-100' : 'border-slate-200 shadow-sm'}`}>
                      <p className="text-xs font-semibold text-blue-600 mb-3 uppercase tracking-wide">{item.explanation}</p>
                      
                      <div className="mb-4">
                        <p className="text-sm text-red-500 line-through mb-2">{item.originalText}</p>
                        
                        {/* Changed items-center to items-start + mt-0.5 on the icon so it aligns with wrapped text perfectly */}
                        <div className="flex items-start gap-2 text-green-600 bg-green-50/50 p-2 sm:p-3 rounded-lg">
                          <ArrowRight size={16} className="mt-0.5 shrink-0" />
                          <p className="text-sm font-medium">{item.improvedText}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleApplyImprovement(idx, item.originalText, item.improvedText)}
                        disabled={isApplied}
                        className={`w-full py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                          isApplied ? 'bg-green-50 text-green-600 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm hover:shadow'
                        }`}
                      >
                        {isApplied ? <><CheckCircle size={16} /> Applied Successfully</> : 'Insert & Replace'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}