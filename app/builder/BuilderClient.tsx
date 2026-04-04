"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Loader2,
  CheckCircle,
  Save,
  Palette,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  Sparkles,
  Lock,
  X,
  AlertCircle,
  Plus,
  Coins,
} from "lucide-react";

import { useResumeBuilder } from "@/hooks/useResumebuilder";
import {
  PersonalForm,
  ExperienceForm,
  ProjectsForm,
  EducationForm,
  SkillsForm,
} from "@/components/builder/EditorForms";
import {
  DownloadModal,
  AiAnalysisModal,
  AiUpsellModal,
} from "@/components/builder/BuilderModals";

import { TemplateCorp1 } from "@/components/templates/TemplateCorp1";
import { TemplateCorp2 } from "@/components/templates/TemplateCorp2";
import { TemplateBasic1 } from "@/components/templates/TemplateBasic1";
import { TemplateBasic2 } from "@/components/templates/TemplateBasic2";
import { TemplateCreative1 } from "@/components/templates/TemplateCreative1";
import { TemplateCreative2 } from "@/components/templates/TemplateCreative2";
import { TemplateFree1 } from "@/components/templates/TemplateFree1";
import { TemplateFree2 } from "@/components/templates/TemplateFree2";
import { TemplatePro1 } from "@/components/templates/TemplatePro1";
import { TemplatePro2 } from "@/components/templates/TemplatePro2";

import { TEMPLATE_CONFIG } from "@/config/templateConfig";
import { RESUME_TEMPLATES } from "@/data/templates";

const THEME_COLORS = [
  "#1a4c78",
  "#2e5a7b",
  "#4a6e8d",
  "#6b869e",
  "#8c9faa",
  "#b3c0c9",
  "#d4dfe6",
  "#f5f5f5",
  "#000000",
  "#16a34a",
  "#dc2626",
  "#d97706",
  "#7c3aed",
];

const COMPONENT_MAP: Record<string, any> = {
  "corp-1": TemplateCorp1,
  "corp-2": TemplateCorp2,
  "basic-1": TemplateBasic1,
  "basic-2": TemplateBasic2,
  "creative-1": TemplateCreative1,
  "creative-2": TemplateCreative2,
  "free-1": TemplateFree1,
  "free-2": TemplateFree2,
  "pro-1": TemplatePro1,
  "pro-2": TemplatePro2,
  default: TemplateCorp1,
};

const PHASES = [
  {
    id: "personal",
    title: "Personal Details",
    subtitle:
      "Users who added phone number and email received 64% more positive feedback.",
    next: "Employment History",
  },
  {
    id: "experience",
    title: "Employment History",
    subtitle:
      "Show your relevant experience (last 10 years). Use bullet points.",
    next: "Education",
  },
  {
    id: "education",
    title: "Education",
    subtitle:
      "A varied education sums up the value your background brings to the job.",
    next: "Skills & Extras",
  },
  {
    id: "projects",
    title: "Projects",
    subtitle:
      "Showcase your best work, side projects, or open-source contributions.",
    next: "Skills & Extras",
  },
  {
    id: "skills",
    title: "Skills & Extras",
    subtitle:
      "Choose 5 important skills. Make sure they match the job listing keywords.",
    next: "Review & Download",
  },
];

export default function BuilderClient() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "corp-1";
  const { data: session } = useSession();

  const { resumeData, setResumeData, isPageLoading, saveStatus, handlers } =
    useResumeBuilder(templateId);

  const currentTemplate =
    RESUME_TEMPLATES.find((t) => t.id === templateId) || RESUME_TEMPLATES[0];
  const isPremiumTemplate = currentTemplate.price > 0;
  const SelectedTemplate =
    COMPONENT_MAP[templateId] || COMPONENT_MAP["default"];
  const templateConfig = TEMPLATE_CONFIG[templateId] || { hasPhoto: true };

  const [currentStep, setCurrentStep] = useState(0);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showPalettePanel, setShowPalettePanel] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "docx">("pdf");

  // Modal states
  const [showFormatModal, setShowFormatModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false); // Used for "Get Credits" Upsell
  const [showAiModal, setShowAiModal] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);

  // Loaders
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false); // Verifying DB unlock before showing Format Picker

  const [userBalances, setUserBalances] = useState({
    corporate: 0,
    creative: 0,
    basic: 0,
    pro: 0,
    multi: 0,
  });

  useEffect(() => {
    const fetchCredits = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch("/api/user/credits");
          const data = await res.json();
          if (data.credits) setUserBalances(data.credits);
        } catch (error) {
          console.error("Failed to fetch credits", error);
        }
      }
    };
    fetchCredits();
  }, [session]);

  const totalCredits = Object.values(userBalances).reduce((a, b) => a + b, 0);

  // Directly download the file since access is pre-verified!
  const triggerFileDownload = () => {
    const url = `/api/resume/${resumeData._id}/download-${downloadFormat}`;
    window.open(url, "_blank");
  };

  const handleAiClick = async () => {
    if (!isPremiumTemplate) {
      setShowUpsellModal(true);
      return;
    }
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData }),
      });
      const data = await res.json();
      if (data.analysis) {
        setResumeData((prev) => ({ ...prev, aiAnalysis: data.analysis }));
        setShowAiModal(true);
      }
    } catch {
      alert("AI is busy right now.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNextPhase = async () => {
    if (currentStep < PHASES.length - 1) {
      setCurrentStep((curr) => curr + 1);
      document
        .getElementById("editor-scroll-area")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // LAST STEP: Check access BEFORE showing the Download Formats
      if (!resumeData?._id) return alert("Resume is still loading...");

      setIsCheckingAccess(true);

      // Force an immediate save to DB first to guarantee inputs are recorded
      try {
        await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resumeData),
        });
      } catch (err) {
        console.error("Failed to sync before download");
      }

      if (!isPremiumTemplate) {
        setIsCheckingAccess(false);
        setShowFormatModal(true);
        return;
      }

      try {
        const res = await fetch("/api/resume/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeId: resumeData._id }),
        });
        const data = await res.json();

        // Passed Paywall Verification! Show format modal.
        if (data.status === "allowed") {
          // If a credit was actively deducted during this exact check, reflect in UI immediately
          if (data.creditTypeUsed) {
            setUserBalances((prev: any) => ({
              ...prev,
              [data.creditTypeUsed]: Math.max(0, prev[data.creditTypeUsed] - 1),
            }));
          }
          setShowFormatModal(true);
        } else if (data.status === "payment_required") {
          // Failed Paywall Verification -> Redirect to Get Credits Modal
          setShowDownloadModal(true);
        } else {
          alert(data.error || "Download check failed");
        }
      } catch {
        alert("Verification failed. Please check your connection.");
      } finally {
        setIsCheckingAccess(false);
      }
    }
  };

  const SaveStatusIndicator = ({ showText = true }: { showText?: boolean }) => {
    let icon = <CheckCircle size={14} />;
    let text = "Saved";
    let colorClass = "text-green-500 bg-green-50";

    if (saveStatus === "saving") {
      icon = <Loader2 size={14} className="animate-spin" />;
      text = "Saving...";
      colorClass = "text-blue-500 bg-blue-50";
    } else if (saveStatus === "error") {
      icon = <AlertCircle size={14} />;
      text = "Error";
      colorClass = "text-red-500 bg-red-50";
    }

    return (
      <div
        className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold transition-all ${colorClass}`}
      >
        {icon}
        {showText && <span>{text}</span>}
      </div>
    );
  };

  const renderCurrentPhase = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalForm
            data={resumeData.personalInfo}
            onChange={handlers.handleInfoChange}
            hasPhoto={templateConfig.hasPhoto}
            onPhotoUpload={(url) =>
              setResumeData((prev) => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, photo: url },
              }))
            }
          />
        );
      case 1:
        return (
          <ExperienceForm
            items={resumeData.experience}
            onAdd={() => handlers.addListItem("experience")}
            onRemove={(id) => handlers.removeListItem("experience", id)}
            onUpdate={(id, f, v) =>
              handlers.updateListItem("experience", id, f, v)
            }
          />
        );
      case 2:
        return (
          <EducationForm
            items={resumeData.education}
            onAdd={() => handlers.addListItem("education")}
            onRemove={(id) => handlers.removeListItem("education", id)}
            onUpdate={(id, f, v) =>
              handlers.updateListItem("education", id, f, v)
            }
          />
        );
      case 3:
        return (
          <ProjectsForm
            items={resumeData.projects || []}
            onAdd={() => handlers.addListItem("projects")}
            onRemove={(id) => handlers.removeListItem("projects", id)}
            onUpdate={(id, f, v) =>
              handlers.updateListItem("projects", id, f, v)
            }
          />
        );
      case 4:
        return (
          <SkillsForm data={resumeData} onChange={handlers.handleArrayChange} />
        );
      default:
        return null;
    }
  };

  if (isPageLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans relative">
      {/* --- LEFT: EDITOR PANE --- */}
      <div
        className={`w-full md:w-[50%] lg:w-[45%] xl:w-[40%] flex flex-col border-r border-gray-200 z-10 bg-white transition-all ${showMobilePreview ? "hidden md:flex" : "flex"}`}
      >
        <div className="px-4 sm:px-6 md:px-8 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10 sticky top-0 gap-2">
          <div className="flex items-center gap-3">
            <a
              href="/templates"
              className="p-1.5 mr-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              title="Back to Home"
            >
              <ChevronLeft size={18} />
            </a>
            {(() => {
              const score =
                typeof resumeData.aiAnalysis === "object" &&
                resumeData.aiAnalysis?.score
                  ? resumeData.aiAnalysis.score
                  : 0;
              const bgColor =
                score >= 80
                  ? "bg-green-500"
                  : score >= 50
                    ? "bg-yellow-500"
                    : score > 0
                      ? "bg-red-500"
                      : "bg-slate-300";
              return (
                <div
                  className={`${bgColor} text-white text-[11px] sm:text-xs font-bold px-2 py-1 rounded transition-colors duration-500 whitespace-nowrap shadow-sm`}
                >
                  {score > 0 ? `${score}%` : "N/A"}
                </div>
              );
            })()}

            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] sm:text-xs font-bold border border-slate-200">
              <Coins size={12} className="text-yellow-600" />
              <span>{totalCredits} Credits</span>
            </div>
            <div className="md:hidden">
              <SaveStatusIndicator showText={false} />
            </div>
          </div>

          <button
            onClick={handleAiClick}
            disabled={isAnalyzing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold shadow-sm whitespace-nowrap ${isPremiumTemplate ? "bg-linear-to-r from-purple-600 to-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}
          >
            {isAnalyzing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Sparkles size={14} />
            )}{" "}
            {isAnalyzing ? "Analyzing..." : "AI Review"}
          </button>
        </div>

        <div
          id="editor-scroll-area"
          className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 scrollbar-thin"
        >
          <div className="mb-6 md:mb-8">
            <h2 className="text-[24px] md:text-[28px] font-bold text-slate-800 tracking-tight mb-2">
              {PHASES[currentStep].title}
            </h2>
            <p className="text-slate-500 text-[14px] md:text-[15px] leading-relaxed">
              {PHASES[currentStep].subtitle}
            </p>
          </div>
          {renderCurrentPhase()}
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] flex items-center justify-between mt-auto">
          <button
            onClick={() => setCurrentStep((curr) => Math.max(0, curr - 1))}
            className={`px-4 py-3 text-gray-500 hover:text-gray-800 transition-colors font-bold ${currentStep === 0 ? "invisible" : ""}`}
          >
            Back
          </button>
          <button
            onClick={handleNextPhase}
            disabled={isCheckingAccess}
            className="px-6 py-3 bg-[#0086FF] hover:bg-[#0070d6] active:scale-95 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
          >
            {isCheckingAccess ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Checking Access
              </>
            ) : currentStep === PHASES.length - 1 ? (
              "Finish & Download"
            ) : (
              <>
                Proceed to {PHASES[currentStep].next} <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* --- RIGHT: PREVIEW PANE --- */}
      <div
        className={`fixed inset-0 z-40 bg-[#f4f7fb] flex flex-col items-center justify-start overflow-y-auto ${showMobilePreview ? "block pt-24" : "hidden md:flex md:flex-1 md:static pt-10"}`}
      >
        {showMobilePreview && (
          <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white px-4 py-3 flex justify-between z-50">
            <h2 className="font-bold">Preview</h2>
            <button onClick={() => setShowMobilePreview(false)}>
              <X size={18} />
            </button>
          </div>
        )}
        <div className="absolute top-4 right-8 hidden md:block">
          <SaveStatusIndicator />
        </div>

       <div className="origin-top transition-transform duration-300 transform scale-[0.55] sm:scale-[0.65] md:scale-[0.70] lg:scale-[0.80] xl:scale-[0.90] 2xl:scale-100 flex flex-col items-center pb-32">
          {/* REMOVED overflow-hidden, CHANGED px to mm */}
          <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl relative">
            <SelectedTemplate data={resumeData} />

            {/* Visual Page Break Indicator - Set to 294mm (3mm safety buffer) */}
            <div
              className="absolute left-[-100px] right-[-100px] border-t-2 border-dashed border-red-300 pointer-events-none"
              style={{ top: "294mm" }}
            >
              <span className="absolute left-[100px] -top-6 bg-red-100 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                Page 1 Cut-off
              </span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowMobilePreview(!showMobilePreview)}
        className="md:hidden fixed bottom-6 right-6 bg-[#0086FF] text-white p-4 rounded-full shadow-xl z-50 flex gap-2"
      >
        {showMobilePreview ? <Edit3 size={20} /> : <Eye size={20} />}{" "}
        <span className="font-bold">
          {showMobilePreview ? "Edit" : "Preview"}
        </span>
      </button>

      {/* FORMAT PICKER (Only shows AFTER passing Paywall check) */}
      {showFormatModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-xl text-slate-900">
                Choose Format
              </h3>
              <button
                onClick={() => setShowFormatModal(false)}
                className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setDownloadFormat("pdf")}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  downloadFormat === "pdf"
                    ? "border-blue-500 bg-blue-50 ring-4 ring-blue-50"
                    : "border-gray-100 hover:border-blue-200"
                }`}
              >
                <div className="font-bold text-slate-900 text-[15px]">
                  PDF Document
                </div>
                <div className="text-[13px] text-slate-500 mt-0.5">
                  Best for emailing and printing (Recommended)
                </div>
              </button>

              <button
                onClick={() => setDownloadFormat("docx")}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  downloadFormat === "docx"
                    ? "border-blue-500 bg-blue-50 ring-4 ring-blue-50"
                    : "border-gray-100 hover:border-blue-200"
                }`}
              >
                <div className="font-bold text-slate-900 text-[15px]">
                  Word Document (.docx)
                </div>
                <div className="text-[13px] text-slate-500 mt-0.5">
                  Downloads as an ATS-optimized, simple plain-text layout for
                  strict job portals.
                </div>
              </button>
            </div>

            <button
              onClick={() => {
                setShowFormatModal(false);
                triggerFileDownload(); // Access verified upstream, download immediately!
              }}
              className="w-full py-3.5 bg-[#0086FF] hover:bg-[#0070d6] text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]"
            >
              Continue to Download
            </button>
          </div>
        </div>
      )}

      {/* MODALS */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        templatePrice={currentTemplate.price}
        templateName={currentTemplate.name}
      />
      <AiAnalysisModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        analysis={resumeData.aiAnalysis}
      />
      <AiUpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
      />
    </div>
  );
}
