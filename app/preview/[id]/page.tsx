// app/preview/[id]/page.tsx
import connectDB from "@/lib/db";
import { Resume } from "@/models/Resume";
import { notFound } from "next/navigation";

// Import your templates
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

const COMPONENT_MAP: Record<string, any> = {
  "corp-1": TemplateCorp1, "corp-2": TemplateCorp2,
  "basic-1": TemplateBasic1, "basic-2": TemplateBasic2,
  "creative-1": TemplateCreative1, "creative-2": TemplateCreative2,
  "free-1": TemplateFree1, "free-2": TemplateFree2,
  "pro-1": TemplatePro1, "pro-2": TemplatePro2,
  default: TemplateCorp1,
};

export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Unwrap the params promise FIRST
  const resolvedParams = await params;
  const { id } = resolvedParams;

  await connectDB();
  
  // 2. Use the unwrapped id
  const resume = await Resume.findById(id);

  if (!resume) {
    return notFound();
  }

  const resumeData = JSON.parse(JSON.stringify(resume));
  const SelectedTemplate = COMPONENT_MAP[resumeData.templateId || "default"];

  return (
    // We use w-full and min-h-screen, and remove all shadows for printing
    <div className="bg-white w-full min-h-screen m-0 p-0 print:shadow-none print:m-0 print:p-0">
      <SelectedTemplate data={resumeData} />
    </div>
  );
}