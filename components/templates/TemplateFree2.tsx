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
      <div className="flex text-[11px] mb-0.5">
        <span className="w-28 font-bold shrink-0 text-[10px] uppercase pt-0.5" style={{ color: themeColor }}>{label}</span>
        <span className="w-3 text-center font-bold" style={{ color: themeColor }}>:</span>
        <span className="flex-1 text-slate-900 font-medium wrap-break-word">{value}</span>
      </div>
    );
  };

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <div key={index} className="flex items-start gap-1.5 mb-0.5 pl-3">
        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 opacity-60" style={{ backgroundColor: themeColor }}></span>
        <span className="text-[11px] leading-normal text-slate-700">{line}</span>
      </div>
    ));
  };

  return (
    /* Reduced outer padding from p-[10mm] to p-[8mm] */
    <div className="w-[210mm] min-h-[297mm] h-[297mm] bg-white text-slate-900 font-serif p-[8mm] mx-auto flex flex-col relative box-border overflow-hidden break-words">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; }
        }
        .resume-section { break-inside: avoid; page-break-inside: avoid; }
      `}} />

      {/* Outer Border Box: Reduced padding from p-8 to p-5 */}
      <div 
        className="border-2 h-full p-5 flex flex-col relative flex-1"
        style={{ borderColor: themeColor }}
      >
        
        {/* --- TOP HEADER (COMPACT) --- */}
        <div className="flex justify-between items-start mb-2 resume-section">
            <div className="text-[11px] font-bold leading-tight">
                <h1 className="text-xl uppercase mb-0.5 tracking-tight font-black" style={{ color: themeColor }}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="font-semibold text-slate-700 max-w-[400px] text-[11px]">
                    {personalInfo.address} {personalInfo.city && `| ${personalInfo.city}, ${personalInfo.country}`}
                </p>
                <div className="flex gap-3 mt-0.5 text-slate-800 font-semibold text-[11px]">
                    <p>Tel: {personalInfo.phone}</p>
                    <p>Email: {personalInfo.email}</p>
                </div>
            </div>

            <div>
                <h2 
                    className="text-lg font-black uppercase border-b-2 inline-block tracking-[0.1em] px-2"
                    style={{ color: themeColor, borderColor: themeColor }}
                >
                    Resume
                </h2>
            </div>
        </div>

        <div className="w-full h-[1.5px] mb-2.5" style={{ backgroundColor: themeColor }}></div>

        {/* --- OBJECTIVES --- */}
        {personalInfo.summary && (
            <div className="mb-2.5 resume-section">
                <h3 className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 mb-1" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Objectives
                </h3>
                <p className="text-[11px] text-justify leading-relaxed font-medium text-slate-800">
                    {personalInfo.summary}
                </p>
            </div>
        )}

        {/* --- PERSONAL INFORMATION --- */}
        <div className="mb-2.5 resume-section">
            <h3 className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 mb-1.5" style={{ color: themeColor, textDecorationColor: themeColor }}>
                Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-x-4 pl-1">
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
            <div className="mb-2.5 resume-section">
                <h3 className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 mb-1" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Qualifications
                </h3>
                <ul className="text-[11px] font-medium text-slate-800 space-y-0.5">
                    {education.map((edu) => (
                        <li key={edu.id} className="flex items-start gap-1.5">
                            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                            <span><span className="font-bold">{edu.degree}</span> — {edu.school} <span className="italic text-slate-500 text-[10px]">({edu.startDate} - {edu.endDate})</span></span>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- EXPERIENCE --- */}
        {experience && experience.length > 0 && (
            <div className="mb-2.5 resume-section">
                <h3 className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 mb-1" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Experience
                </h3>
                <ul className="text-[11px] font-medium text-slate-800 space-y-2">
                    {experience.map((exp) => (
                        <li key={exp.id}>
                            <div className="flex items-start gap-1.5 mb-0.5">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold uppercase text-[10px]">{exp.jobTitle}</span> at {exp.employer} <span className="italic text-slate-500 text-[10px]">({exp.startDate} - {exp.endDate})</span></span>
                            </div>
                            {renderBullets(exp.description)}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- PROJECTS --- */}
        {projects && projects.length > 0 && (
            <div className="mb-2.5 resume-section">
                <h3 className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 mb-1" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Key Projects
                </h3>
                <ul className="text-[11px] font-medium text-slate-800 space-y-2">
                    {projects.map((proj) => (
                        <li key={proj.id}>
                            <div className="flex items-start gap-1.5">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold uppercase text-[10px]">{proj.projectName}</span> <span className="italic text-slate-500 text-[10px]">({proj.startDate} - {proj.endDate})</span></span>
                            </div>
                            {proj.link && (
                                <div className="pl-3 text-[10px] text-blue-600 hover:underline mb-0.5">
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
            <div className="mb-2 resume-section">
                <h3 className="text-xs font-bold uppercase underline decoration-2 underline-offset-2 mb-1" style={{ color: themeColor, textDecorationColor: themeColor }}>
                    Skills & Competencies
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 pl-3">
                    {skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-800">
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                            <span>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* --- FOOTER (COMPACTED) --- */}
        <div className="mt-auto pt-2 flex justify-end items-end resume-section">
            <div className="text-[10px] font-bold text-center" style={{ color: themeColor }}>
                <div className="w-24 border-b mb-0.5 opacity-30 mx-auto" style={{ borderColor: themeColor }}></div>
                <p className="uppercase tracking-widest text-[9px]">({personalInfo.firstName} {personalInfo.lastName})</p>
            </div>
        </div>

      </div>
    </div>
  );
};