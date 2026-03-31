import React from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  Lock, 
  X, 
  Sparkles, 
  Check, 
  AlertCircle,
  Crown,
  Star
} from "lucide-react";

// =========================================================
// 1. DOWNLOAD & PAYMENT MODAL (GET CREDITS UPSELL)
// =========================================================

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  templatePrice?: number;
  templateName: string;
}

export function DownloadModal({ isOpen, onClose, templateName }: DownloadModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Decorative Background Gradients */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          {/* Animated Icon Container */}
          <div className="mx-auto w-24 h-24 bg-linear-to-tr from-yellow-100 via-yellow-50 to-orange-50 rounded-full flex items-center justify-center mb-5 ring-8 ring-yellow-50/50 relative">
            <Crown size={40} className="text-yellow-500 drop-shadow-md" />
            <Sparkles size={24} className="absolute -top-2 -right-2 text-orange-400 animate-pulse" />
            <Star size={16} className="absolute bottom-2 -left-2 text-yellow-400 animate-bounce" />
          </div>

          <h3 className="font-black text-2xl text-slate-800 tracking-tight">
            Premium Design
          </h3>
          
          <div className="mt-4 bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Locked Template</span>
            <span className="text-lg font-bold text-slate-800">{templateName}</span>
          </div>

          <p className="text-slate-500 text-[15px] mt-5 leading-relaxed font-medium">
            You are out of credits! Get a credit pack to instantly unlock this premium design and download your new resume.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 relative z-10">
          <button 
            onClick={onClose} 
            className="w-1/3 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => router.push("/subscription")} 
            className="w-2/3 py-4 rounded-xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold transition-all shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Get Credits
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================
// 2. AI ANALYSIS MODAL
// =========================================================

interface AiAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: any; 
}

export const AiAnalysisModal = ({ isOpen, onClose, analysis }: AiAnalysisModalProps) => {
  if (!isOpen) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const isStructured = typeof analysis === 'object' && analysis !== null && !Array.isArray(analysis);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200">
        
        <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">AI Resume Review</h3>
              <p className="text-xs text-gray-500">Powered by AuraResume Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar bg-slate-50/50">
          {!analysis ? (
             <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                <AlertCircle size={40} className="mb-2 opacity-50" />
                <p>No analysis data available.</p>
             </div>
          ) : isStructured ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <span className="font-bold text-slate-700">Overall Resume Score</span>
                <span className={`px-4 py-1.5 rounded-lg font-bold border ${getScoreColor(analysis.score || 0)}`}>
                  {analysis.score || 0}/100
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-purple-500 rounded-full"></span> 
                  Executive Summary
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {analysis.summaryFeedback || "No summary feedback provided."}
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-500 rounded-full"></span>
                  Experience & Impact
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {analysis.bulletPointsFeedback || "No detail feedback provided."}
                </p>
              </div>

              {analysis.generalSuggestions && analysis.generalSuggestions.length > 0 && (
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-orange-500 rounded-full"></span>
                    Key Improvements
                  </h4>
                  <ul className="space-y-3">
                    {analysis.generalSuggestions.map((suggestion: string, idx: number) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <p className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed">{String(analysis)}</p>
            </div>
          )}
        </div>

        <div className="p-6 pt-4 border-t border-gray-100 bg-white rounded-b-2xl shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition shadow-lg"
          >
            Close Review
          </button>
        </div>
      </div>
    </div>
  );
};


// =========================================================
// 3. AI UPSELL MODAL
// =========================================================

interface AiUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiUpsellModal = ({ isOpen, onClose }: AiUpsellModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition"
        >
          <X size={20} />
        </button>

        <div className="mx-auto w-20 h-20 bg-linear-to-tr from-purple-100 to-blue-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-purple-50">
          <Sparkles size={32} className="text-purple-600" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Unlock AI Power
        </h3>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          This feature is available on Premium Templates. Upgrade now to get <span className="font-bold text-purple-600">instant scoring</span>, keyword optimization, and tailored feedback.
        </p>

        <div className="space-y-3">
          <button
            onClick={onClose} 
            className="w-full py-3.5 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:opacity-90 transition transform active:scale-[0.98]"
          >
            Explore Premium Templates
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-gray-400 font-medium text-sm hover:text-gray-600 transition"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};