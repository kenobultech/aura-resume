// components/templates/TemplateCorp2.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';

export const TemplateCorp2 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects,
    skills, 
    languages, 
    certificates, 
    hobbies,
    themeColor = '#334155' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="flex items-start gap-2 mb-1">
        <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
        <span>{line}</span>
      </li>
    ));
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-900 font-serif p-12 shadow-2xl mx-auto flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight" style={{ color: themeColor }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.role && (
            <p className="text-sm font-sans uppercase tracking-[0.2em] mb-4 opacity-70 italic font-medium">
                {personalInfo.role}
            </p>
        )}
        
        <div className="text-[11px] text-slate-600 flex justify-center flex-wrap items-center gap-y-1 gap-x-3 font-sans">
          {personalInfo.address && <span>{personalInfo.address}</span>}
          {personalInfo.city && <span>• {personalInfo.city}</span>}
          {personalInfo.country && <span>• {personalInfo.country}</span>}
          
          <div className="w-full flex justify-center gap-3 mt-1">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span>| {personalInfo.email}</span>}
          </div>

          <div className="w-full flex justify-center gap-3 mt-0.5 text-blue-700">
            {personalInfo.linkedin && <span className="underline decoration-slate-200">LinkedIn</span>}
            {personalInfo.website && <span className="underline decoration-slate-200">{personalInfo.website}</span>}
          </div>
        </div>
      </div>

      {/* --- PROFILE --- */}
      {personalInfo.summary && (
        <div className="mb-8">
          <h2 
            className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-4"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Profile
          </h2>
          <p className="text-sm leading-relaxed text-slate-800 text-justify">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* --- EMPLOYMENT HISTORY --- */}
      {experience && experience.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-6"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Employment History
          </h2>
          
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="flex flex-col md:flex-row gap-2 md:gap-8">
                <div className="w-full md:w-32 shrink-0">
                  <p className="text-xs font-bold mt-1 font-sans" style={{ color: themeColor }}>
                    {exp.startDate} — {exp.endDate}
                  </p>
                </div>
                <div className="w-full md:w-auto flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-md text-slate-900">{exp.jobTitle}</h3>
                    <span className="text-[11px] italic text-slate-500 font-sans uppercase">{exp.city}</span>
                  </div>
                  <p className="text-sm font-semibold italic text-slate-700 mb-2">{exp.employer}</p>
                  <ul className="text-sm text-slate-700 leading-snug space-y-1">
                    {renderBullets(exp.description)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- PROJECTS --- */}
      {projects && projects.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-6"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Key Projects
          </h2>
          
          <div className="space-y-6">
            {projects.map((proj) => (
              <div key={proj.id} className="flex flex-col md:flex-row gap-2 md:gap-8">
                <div className="w-full md:w-32 shrink-0">
                  <p className="text-xs font-bold mt-1 font-sans" style={{ color: themeColor }}>
                    {proj.startDate} — {proj.endDate}
                  </p>
                </div>
                <div className="w-full md:w-auto flex-1">
                  <h3 className="font-bold text-md text-slate-900">{proj.projectName}</h3>
                  {proj.link && <p className="text-[11px] text-blue-600 font-sans mb-2 truncate">{proj.link}</p>}
                  <ul className="text-sm text-slate-700 leading-snug space-y-1">
                    {renderBullets(proj.description)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length > 0 && (
        <div className="mb-8">
          <h2 
            className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-6"
            style={{ color: themeColor, borderColor: themeColor }}
          >
            Education
          </h2>
          
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col md:flex-row gap-2 md:gap-8">
                <div className="w-full md:w-32 shrink-0">
                  <p className="text-xs font-bold mt-1 font-sans" style={{ color: themeColor }}>
                    {edu.startDate} — {edu.endDate}
                  </p>
                </div>
                <div className="w-full md:w-auto flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-md text-slate-900">{edu.degree}</h3>
                    <span className="text-[11px] italic text-slate-500 font-sans uppercase">{edu.city}</span>
                  </div>
                  <p className="text-sm italic text-slate-600 mb-1">{edu.school}</p>
                  {edu.description && (
                     <p className="text-xs text-slate-500 leading-relaxed italic">{edu.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-10">
        {/* Left Col: Skills & Languages */}
        <div className="space-y-8">
            {skills && skills.length > 0 && (
                <div>
                <h2 className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-4" style={{ color: themeColor, borderColor: themeColor }}>
                    Skills
                </h2>
                <div className="grid grid-cols-1 gap-y-2">
                    {skills.map((skill, i) => (
                    <div key={i} className="text-[13px] border-b border-dotted border-gray-200 pb-1 flex justify-between">
                        <span className="font-semibold text-slate-800">{skill}</span>
                    </div>
                    ))}
                </div>
                </div>
            )}

            {languages && languages.length > 0 && (
                <div>
                <h2 className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-4" style={{ color: themeColor, borderColor: themeColor }}>
                    Languages
                </h2>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {languages.map((lang, i) => (
                    <div key={i} className="text-[13px] flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                        <span className="text-slate-800">{lang}</span>
                    </div>
                    ))}
                </div>
                </div>
            )}
        </div>

        {/* Right Col: Certificates & Hobbies */}
        <div className="space-y-8">
            {certificates && certificates.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-4" style={{ color: themeColor, borderColor: themeColor }}>
                        Certificates
                    </h2>
                    <div className="space-y-3">
                        {certificates.map((cert) => (
                            <div key={cert.id}>
                                <p className="text-[10px] font-bold font-sans uppercase" style={{ color: themeColor }}>{cert.date}</p>
                                <h3 className="font-bold text-[13px] text-slate-900 leading-tight">{cert.name}</h3>
                                <p className="text-[11px] italic text-slate-600">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {hobbies && hobbies.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest font-sans border-b pb-2 mb-4" style={{ color: themeColor, borderColor: themeColor }}>
                        Hobbies
                    </h2>
                    <p className="text-[13px] italic text-slate-700 leading-relaxed">
                        {hobbies.join(", ")}
                    </p>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};