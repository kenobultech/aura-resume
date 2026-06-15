import React from 'react';
import { ResumeData } from './ResumeTypes';

export const TemplateFree2 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects,
    skills, 
    languages, 
    certificates,
    hobbies, 
    themeColor = '#000000' 
  } = data;

  const InfoRow = ({ label, value }: { label: string, value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex text-[12px] mb-1">
        <span className="w-32 font-bold shrink-0 text-[11px] uppercase pt-0.5" style={{ color: themeColor }}>{label}</span>
        <span className="w-4 text-center font-bold" style={{ color: themeColor }}>:</span>
        <span className="flex-1 text-slate-900 font-medium wrap-break-word">{value}</span>
      </div>
    );
  };

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <div key={index} className="flex items-start gap-2 mb-0.5 pl-4">
        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60" style={{ backgroundColor: themeColor }}></span>
        <span className="text-[12px] leading-relaxed">{line}</span>
      </div>
    ));
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-slate-900 font-serif p-[10mm] mx-auto flex flex-col relative box-border overflow-visible break-words">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; }
        }
        .resume-section { break-inside: avoid; page-break-inside: avoid; }
      `}} />

      {/* Outer Border Box */}
      <div 
        className="border-2 h-full p-8 flex flex-col relative flex-1"
        style={{ borderColor: themeColor }}
      >
        
        {/* --- TOP HEADER --- */}
        <div className="flex justify-between items-start mb-3 resume-section">
            <div className="text-[12px] font-bold leading-tight">
                <h1 className="text-2xl uppercase mb-1 tracking-tight" style={{ color: themeColor }}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="font-medium text-slate-700 max-w-[400px]">
                    {personalInfo.address} {personalInfo.city && `| ${personalInfo.city}, ${personalInfo.country}`}
                </p>
                <div className="flex gap-4 mt-1">
                    <p className="font-medium text-slate-800">Tel: {personalInfo.phone}</p>
                    <p className="font-medium text-slate-800">Email: {personalInfo.email}</p>
                </div>
            </div>

            <div>
                <h2 
                    className="text-2xl font-bold uppercase border-b-4 inline-block tracking-[0.1em] px-2"
                    style={{ color: themeColor, borderColor: themeColor }}
                >
                    Resume
                </h2>
            </div>
        </div>

        <div className="w-full h-[2px] mb-4" style={{ backgroundColor: themeColor }}></div>

        {/* --- OBJECTIVES --- */}
        {personalInfo.summary && (
            <div className="mb-4 resume-section">
                <h3 className="text-sm font-bold uppercase underline decoration-2 underline-offset-4 mb-2" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Objectives
                </h3>
                <p className="text-[12px] text-justify leading-relaxed font-medium text-slate-800">
                    {personalInfo.summary}
                </p>
            </div>
        )}

        {/* --- PERSONAL INFORMATION --- */}
        <div className="mb-4 resume-section">
            <h3 className="text-sm font-bold uppercase underline decoration-2 underline-offset-4 mb-3" style={{ color: themeColor, textDecorationColor: themeColor }}>
                Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-x-6 pl-1">
                <InfoRow label="Nationality" value={personalInfo.country} />
                {languages && languages.length > 0 && (
                     <InfoRow label="Languages" value={languages.join(", ")} />
                )}
                <InfoRow label="LinkedIn" value={personalInfo.linkedin?.replace('https://', '')} />
                <InfoRow label="Website" value={personalInfo.website?.replace('https://', '')} />
            </div>
        </div>

        {/* --- QUALIFICATIONS (Education) --- */}
        {education && education.length > 0 && (
            <div className="mb-4 resume-section">
                <h3 className="text-sm font-bold uppercase underline decoration-2 underline-offset-4 mb-2" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Qualifications
                </h3>
                <ul className="text-[12px] font-medium text-slate-800 space-y-1">
                    {education.map((edu) => (
                        <li key={edu.id} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                            <span><span className="font-bold">{edu.degree}</span> — {edu.school} <span className="italic text-slate-500 text-[11px]">({edu.startDate} - {edu.endDate})</span></span>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- EXPERIENCE --- */}
        {experience && experience.length > 0 && (
            <div className="mb-4 resume-section">
                <h3 className="text-sm font-bold uppercase underline decoration-2 underline-offset-4 mb-2" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Experience
                </h3>
                <ul className="text-[12px] font-medium text-slate-800 space-y-3">
                    {experience.map((exp) => (
                        <li key={exp.id}>
                            <div className="flex items-start gap-2 mb-1">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold uppercase">{exp.jobTitle}</span> at {exp.employer} <span className="italic text-slate-500 text-[11px]">({exp.startDate} - {exp.endDate})</span></span>
                            </div>
                            {renderBullets(exp.description)}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- PROJECTS --- */}
        {projects && projects.length > 0 && (
            <div className="mb-4 resume-section">
                <h3 className="text-sm font-bold uppercase underline decoration-2 underline-offset-4 mb-2" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Key Projects
                </h3>
                <ul className="text-[12px] font-medium text-slate-800 space-y-3">
                    {projects.map((proj) => (
                        <li key={proj.id}>
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold uppercase">{proj.projectName}</span> <span className="italic text-slate-500 text-[11px]">({proj.startDate} - {proj.endDate})</span></span>
                            </div>
                            {/* Render link if it exists */}
                            {proj.link && (
                                <div className="pl-4 text-[11px] text-blue-600 hover:underline mb-1">
                                    <a href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`} target="_blank" rel="noopener noreferrer">
                                        {proj.link}
                                    </a>
                                </div>
                            )}
                            {renderBullets(proj.description)}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- OTHER SKILLS --- */}
        {skills && skills.length > 0 && (
            <div className="mb-4 resume-section">
                <h3 className="text-sm font-bold uppercase underline decoration-2 underline-offset-4 mb-2" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Skills & Competencies
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pl-4">
                    {skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 text-[12px] font-medium text-slate-800">
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                            <span>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};