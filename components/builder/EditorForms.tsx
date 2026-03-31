// components/builder/EditorForms.tsx
import React, { useState } from "react";
import { Plus, Trash2, ShieldCheck, Lock, Sparkles, Loader2, X, Globe } from "lucide-react";
import PhotoUploader from "../builder/PhotoUploader";
import { Project } from "@/components/templates/ResumeTypes";

// --- Shared Styles ---
const inputClass = "w-full bg-[#f4f7fb] text-[#1e293b] p-3.5 rounded-lg border-b-2 border-transparent focus:bg-white focus:border-blue-500 focus:shadow-sm outline-none transition-all text-sm";
const labelClass = "text-[13px] text-gray-500 mb-1.5 block font-medium";

// --- AI & Field Wrapper Component ---
export const AIEnhanceField = ({
  label,
  value,
  context,
  onUpdate,
  onClear,
  children
}: {
  label: string;
  value: string;
  context?: string;
  onUpdate: (val: string) => void;
  onClear?: () => void;
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string>("");

  const handleEnhance = async () => {
    if (!value || !context) return;
    setLoading(true);
    setSuggestion(""); 
    try {
      const res = await fetch('/api/enhanced-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value, context }),
      });
      const data = await res.json();
      if (data.improvedText) {
        setSuggestion(data.improvedText);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-1.5">
        <label className="text-[13px] text-gray-500 font-medium block">{label}</label>
        
        <div className="flex items-center gap-3">
          {context && (
            <button
              onClick={handleEnhance}
              disabled={loading || !value}
              type="button"
              className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed text-blue-700 rounded transition text-[11px] font-semibold"
            >
              {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {loading ? "Thinking..." : "AI Improve"}
            </button>
          )}

          {onClear && (
            <button
              onClick={onClear}
              type="button"
              title="Clear field"
              className="text-gray-400 hover:text-red-500 transition shrink-0"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {children}

      {suggestion && (
        <div className="mt-3 p-4 bg-linear-to-br from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs mb-1">
            <Sparkles size={14} /> Suggested AI Rewrite
          </div>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{suggestion}</p>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onUpdate(suggestion);
                setSuggestion(""); 
              }}
              className="flex items-center px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Replace Text
            </button>
            <button
              type="button"
              onClick={() => setSuggestion("")}
              className="flex items-center px-4 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Discard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- 1. Personal Details Form ---
export const PersonalForm = ({ 
  data, 
  onChange, 
  onPhotoUpload, 
  hasPhoto 
}: { 
  data: any; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  onPhotoUpload: (url: string) => void; 
  hasPhoto: boolean;
}) => {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={labelClass}>Job Target</label>
          <input
            name="role"
            placeholder="The role you want"
            value={data.role || ""}
            onChange={onChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col justify-end">
          {hasPhoto ? (
            <PhotoUploader
              currentPhoto={data.photo}
              onUpload={onPhotoUpload}
            />
          ) : (
            <div className="h-[52px] bg-slate-50 border border-slate-100 rounded-lg flex items-center px-4 gap-3 text-sm text-slate-400">
              <Lock size={16} className="text-slate-300" /> No photo supported
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={labelClass}>First Name</label>
          <input name="firstName" value={data.firstName || ""} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input name="lastName" value={data.lastName || ""} onChange={onChange} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={labelClass}>Email*</label>
          <div className="relative">
            <input name="email" value={data.email || ""} onChange={onChange} className={`${inputClass} pr-10`} />
            {data.email && <ShieldCheck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" />}
          </div>
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" value={data.phone || ""} onChange={onChange} className={inputClass} />
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input type="checkbox" className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500 shrink-0" defaultChecked />
        <span className="text-sm text-gray-500 group-hover:text-gray-700 transition">
          I'm glad to get offers and tips from resume partners via email.
        </span>
      </label>

      <div>
        <label className={labelClass}>Address</label>
        <input name="address" placeholder="e.g. 123 Main St" value={data.address || ""} onChange={onChange} className={inputClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={labelClass}>City</label>
          <input name="city" placeholder="e.g. Nairobi" value={data.city || ""} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input name="country" placeholder="e.g. Kenya" value={data.country || ""} onChange={onChange} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <input name="linkedin" placeholder="linkedin.com/in/username" value={data.linkedin || ""} onChange={onChange} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Website / Portfolio</label>
          <input name="website" placeholder="yourwebsite.com" value={data.website || ""} onChange={onChange} className={inputClass} />
        </div>
      </div>

      <AIEnhanceField
        label="Professional Summary"
        value={data.summary || ""}
        context="Rewrite this professional summary for a resume to sound more impactful, professional, and highlight key career achievements."
        onUpdate={(val) => onChange({ target: { name: "summary", value: val } } as React.ChangeEvent<HTMLTextAreaElement>)}
      >
        <textarea
          name="summary"
          placeholder="Briefly highlight your career achievements..."
          value={data.summary || ""}
          onChange={onChange}
          rows={4}
          className={`${inputClass} resize-none`}
        />
      </AIEnhanceField>
    </div>
  );
};

// --- 2. Experience Form ---
export const ExperienceForm = ({ items, onAdd, onRemove, onUpdate }: { items: any[]; onAdd: () => void; onRemove: (id: string) => void; onUpdate: (id: string, field: string, value: string) => void; }) => {
  return (
    <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {items.map((exp) => (
        <div key={exp.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm relative group space-y-4">
          <div className="flex justify-between items-center border-b pb-3 mb-2">
            <h4 className="font-bold text-gray-700 truncate pr-4">
              {exp.jobTitle || "(Not specified)"} at {exp.employer || "(Company)"}
            </h4>
            <button onClick={() => onRemove(exp.id)} className="text-gray-400 hover:text-red-500 transition shrink-0">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Job Title</label>
              <input value={exp.jobTitle || ""} onChange={(e) => onUpdate(exp.id, "jobTitle", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Employer</label>
              <input value={exp.employer || ""} onChange={(e) => onUpdate(exp.id, "employer", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input placeholder="MM/YYYY" value={exp.startDate || ""} onChange={(e) => onUpdate(exp.id, "startDate", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input placeholder="MM/YYYY or Present" value={exp.endDate || ""} onChange={(e) => onUpdate(exp.id, "endDate", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>City / Location</label>
            <input value={exp.city || ""} onChange={(e) => onUpdate(exp.id, "city", e.target.value)} className={inputClass} />
          </div>
          
          <AIEnhanceField
            label="Description"
            value={exp.description || ""}
            context="Rewrite this work experience description for a resume. Make it sound professional, action-oriented, and highlight key responsibilities and achievements."
            onUpdate={(val) => onUpdate(exp.id, "description", val)}
          >
            <textarea rows={3} placeholder="Describe your responsibilities..." value={exp.description || ""} onChange={(e) => onUpdate(exp.id, "description", e.target.value)} className={`${inputClass} resize-none`} />
          </AIEnhanceField>
        </div>
      ))}
      <button onClick={onAdd} className="w-full py-4 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition">
        <Plus size={18} /> Add Employment
      </button>
    </div>
  );
};

// --- 3. Education Form ---
export const EducationForm = ({ items, onAdd, onRemove, onUpdate }: { items: any[]; onAdd: () => void; onRemove: (id: string) => void; onUpdate: (id: string, field: string, value: string) => void; }) => {
  return (
    <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {items.map((edu) => (
        <div key={edu.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm relative group space-y-4">
          <div className="flex justify-between items-center border-b pb-3 mb-2">
            <h4 className="font-bold text-gray-700 truncate pr-4">
              {edu.degree || "(Degree)"} at {edu.school || "(School)"}
            </h4>
            <button onClick={() => onRemove(edu.id)} className="text-gray-400 hover:text-red-500 transition shrink-0">
              <Trash2 size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>School / University</label>
              <input value={edu.school || ""} onChange={(e) => onUpdate(edu.id, "school", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Degree / Course</label>
              <input value={edu.degree || ""} onChange={(e) => onUpdate(edu.id, "degree", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input placeholder="MM/YYYY" value={edu.startDate || ""} onChange={(e) => onUpdate(edu.id, "startDate", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input placeholder="MM/YYYY or Present" value={edu.endDate || ""} onChange={(e) => onUpdate(edu.id, "endDate", e.target.value)} className={inputClass} />
            </div>
          </div>

          <AIEnhanceField
            label="Description (Optional)"
            value={edu.description || ""}
            context="Rewrite this education description for a resume. Make it concise, professional, and highlight relevant coursework or academic achievements."
            onUpdate={(val) => onUpdate(edu.id, "description", val)}
          >
            <textarea rows={2} value={edu.description || ""} onChange={(e) => onUpdate(edu.id, "description", e.target.value)} className={`${inputClass} resize-none`} />
          </AIEnhanceField>
        </div>
      ))}
      <button onClick={onAdd} className="w-full py-4 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition">
        <Plus size={18} /> Add Education
      </button>
    </div>
  );
};

// --- 4. Projects Form ---
export interface ProjectsFormProps {
  items: Project[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string) => void;
}

export function ProjectsForm({ items, onAdd, onRemove, onUpdate }: ProjectsFormProps) {
  return (
    <div className="space-y-5 md:space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {items.map((project) => (
        <div key={project.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm relative group space-y-4">
          <div className="flex justify-between items-center border-b pb-3 mb-2">
            <h4 className="font-bold text-gray-700 truncate pr-4">
              {project.projectName || "(Project Name)"}
            </h4>
            <button onClick={() => onRemove(project.id)} className="text-gray-400 hover:text-red-500 transition shrink-0">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Project Name</label>
              <input 
                placeholder="e.g. E-commerce Platform" 
                value={project.projectName || ""} 
                onChange={(e) => onUpdate(project.id, "projectName", e.target.value)} 
                className={inputClass} 
              />
            </div>
            <div>
              <label className={labelClass}>Link / URL</label>
              <div className="relative">
                <input 
                  placeholder="github.com/..." 
                  value={project.link || ""} 
                  onChange={(e) => onUpdate(project.id, "link", e.target.value)} 
                  className={`${inputClass} pl-10`} 
                />
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input placeholder="MM/YYYY" value={project.startDate || ""} onChange={(e) => onUpdate(project.id, "startDate", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input placeholder="MM/YYYY or Present" value={project.endDate || ""} onChange={(e) => onUpdate(project.id, "endDate", e.target.value)} className={inputClass} />
            </div>
          </div>

          <AIEnhanceField
            label="Project Description"
            value={project.description || ""}
            context="Rewrite this project description to be more impressive. Highlight the technologies used, the problem solved, and the results achieved."
            onUpdate={(val) => onUpdate(project.id, "description", val)}
          >
            <textarea 
              rows={3} 
              placeholder="Describe what you built and the impact it had..." 
              value={project.description || ""} 
              onChange={(e) => onUpdate(project.id, "description", e.target.value)} 
              className={`${inputClass} resize-none`} 
            />
          </AIEnhanceField>
        </div>
      ))}
      <button onClick={onAdd} className="w-full py-4 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition">
        <Plus size={18} /> Add Project
      </button>
    </div>
  );
}

// --- 5. Skills Form ---
export const SkillsForm = ({ 
  data, 
  onChange 
}: {
  data: any;
  onChange: (field: "skills" | "languages" | "hobbies", value: string[]) => void;
}) => {
  const getArray = (field: string) => Array.isArray(data[field]) ? data[field] : (data[field] ? [data[field]] :[]);

  const skills = getArray("skills");
  const languages = getArray("languages");
  const hobbies = getArray("hobbies");

  const handleUpdate = (field: "skills" | "languages" | "hobbies", index: number, val: string) => {
    const arr = [...getArray(field)];
    arr[index] = val;
    onChange(field, arr);
  };

  const handleRemove = (field: "skills" | "languages" | "hobbies", index: number) => {
    const arr = [...getArray(field)];
    arr.splice(index, 1);
    onChange(field, arr);
  };

  const handleAdd = (field: "skills" | "languages" | "hobbies") => {
    const arr = [...getArray(field)];
    onChange(field, [...arr, ""]);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <label className={labelClass}>Skills</label>
        <div className="space-y-3">
          {skills.map((skill: string, index: number) => (
            <div key={`skill-${index}`} className="relative flex items-center animate-in fade-in">
              <input
                placeholder="e.g. React, Next.js, Team Leadership"
                value={skill}
                onChange={(e) => handleUpdate("skills", index, e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => handleRemove("skills", index)}
                className="absolute right-3 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("skills")}
            className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition text-sm"
          >
            <Plus size={18} /> Add Skill
          </button>
        </div>
      </div>

      <div>
        <label className={labelClass}>Languages</label>
        <div className="space-y-3">
          {languages.map((lang: string, index: number) => (
            <div key={`lang-${index}`} className="relative flex items-center animate-in fade-in">
              <input
                placeholder="e.g. English, Swahili"
                value={lang}
                onChange={(e) => handleUpdate("languages", index, e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => handleRemove("languages", index)}
                className="absolute right-3 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("languages")}
            className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition text-sm"
          >
            <Plus size={18} /> Add Language
          </button>
        </div>
      </div>

      <div>
        <label className={labelClass}>Hobbies & Interests</label>
        <div className="space-y-3">
          {hobbies.map((hobby: string, index: number) => (
            <div key={`hobby-${index}`} className="relative flex items-center animate-in fade-in">
              <input
                placeholder="e.g. Coding, Reading, Hiking"
                value={hobby}
                onChange={(e) => handleUpdate("hobbies", index, e.target.value)}
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => handleRemove("hobbies", index)}
                className="absolute right-3 text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAdd("hobbies")}
            className="w-full py-3 border-2 border-dashed border-blue-200 text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition text-sm"
          >
            <Plus size={18} /> Add Hobby
          </button>
        </div>
      </div>
    </div>
  );
};