// components/templates/TemplatePro2.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';

export const TemplatePro2 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects, // Integrated
    skills, 
    languages, // Integrated
    certificates, 
    hobbies, 
    themeColor = '#000000' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="flex items-start gap-2 mb-0.5">
          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
          <span className="flex-1 text-justify">{line}</span>
      </li>
    ));
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <h2 
      className="font-bold uppercase text-[13px] border-b mb-3 pb-1 tracking-widest"
      style={{ color: themeColor, borderColor: themeColor }}
    >
      {title}
    </h2>
  );

  return (
    <div className="w-full min-h-full bg-white text-slate-900 font-serif p-12 shadow-2xl mx-auto leading-snug flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="mb-8 text-center border-b pb-6 border-gray-200 shrink-0">
        <h1 
          className="text-3xl font-bold mb-1 uppercase tracking-widest"
          style={{ color: themeColor }}
        >
            {personalInfo.firstName} {personalInfo.lastName}
        </h1>

        {personalInfo.role && (
          <p className="text-sm font-medium mb-4 text-gray-500 uppercase tracking-[0.2em]">
            {personalInfo.role}
          </p>
        )}
        
        <div className="flex justify-between items-start text-[12px] mt-4 text-gray-600 font-sans uppercase tracking-wider">
            {/* Left: Address */}
            <div className="text-left space-y-0.5">
                {personalInfo.address && <p>{personalInfo.address}</p>}
                {(personalInfo.city || personalInfo.country) && (
                    <p>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</p>
                )}
            </div>

            {/* Right: Contact & Digital */}
            <div className="text-right space-y-0.5">
                {personalInfo.phone && <p>Tel: {personalInfo.phone}</p>}
                {personalInfo.email && <p className="lowercase italic">{personalInfo.email}</p>}
                <div className="flex justify-end gap-3 mt-1 lowercase text-blue-800">
                    {personalInfo.linkedin && <span className="underline decoration-slate-200">linkedin</span>}
                    {personalInfo.website && <span className="underline decoration-slate-200">portfolio</span>}
                </div>
            </div>
        </div>
      </div>

      {/* --- SUMMARY --- */}
      {personalInfo.summary && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Professional Summary" />
            <p className="text-[13px] text-justify leading-relaxed">
                {personalInfo.summary}
            </p>
        </div>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length > 0 && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Education" />
            <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id}>
                        <div className="flex justify-between">
                            <span className="font-bold text-[15px]">{edu.school}</span>
                            <span className="italic text-gray-600 text-[13px]">{edu.city}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                            <span className="italic font-medium text-[14px]">{edu.degree}</span>
                            <span className="text-[13px] font-bold">{edu.startDate} — {edu.endDate}</span>
                        </div>
                        {edu.description && (
                            <div className="text-[13px] ml-2 mt-1 text-gray-700 leading-relaxed italic">
                                {edu.description}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- EXPERIENCE --- */}
      {experience && experience.length > 0 && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Professional Experience" />
            <div className="space-y-6">
                {experience.map((exp) => (
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                            <span className="font-bold text-[15px]">{exp.employer}</span>
                            <span className="text-[13px] font-bold">{exp.startDate} — {exp.endDate}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="italic font-medium text-gray-800 text-[14px]">{exp.jobTitle}</span>
                            <span className="text-[12px] italic text-gray-500">{exp.city}</span>
                        </div>
                        <ul className="text-[13px] ml-2 text-gray-700 space-y-1">
                            {renderBullets(exp.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- PROJECTS --- */}
      {projects && projects.length > 0 && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Technical Projects" />
            <div className="space-y-6">
                {projects.map((proj) => (
                    <div key={proj.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="font-bold text-[15px]">{proj.projectName}</span>
                            <span className="text-[13px] font-bold">{proj.startDate} — {proj.endDate}</span>
                        </div>
                        {proj.link && (
                            <p className="text-[11px] text-blue-700 mb-2 italic font-sans">{proj.link}</p>
                        )}
                        <ul className="text-[13px] ml-2 text-gray-700 space-y-1">
                            {renderBullets(proj.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- SKILLS --- */}
      {skills && skills.length > 0 && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Technical Skills" />
            <div className="text-[13px] leading-relaxed italic px-2">
                 {skills.join(" • ")}
            </div>
        </div>
      )}

      {/* --- LANGUAGES --- */}
      {languages && languages.length > 0 && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Languages" />
            <div className="text-[13px] leading-relaxed italic px-2">
                 {languages.join(" • ")}
            </div>
        </div>
      )}

      {/* --- CERTIFICATES --- */}
      {certificates && certificates.length > 0 && (
        <div className="mb-6 shrink-0">
            <SectionHeader title="Certifications & Awards" />
            <ul className="text-[13px] ml-2 space-y-2">
                {certificates.map((cert) => (
                    <li key={cert.id} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                        <span>
                          <span className="font-bold">{cert.name}</span>
                          {cert.issuer && <span className="text-gray-600"> — {cert.issuer}</span>} 
                          {cert.date && <span className="text-gray-500 italic"> ({cert.date})</span>}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
      )}

      {/* --- INTERESTS --- */}
      {hobbies && hobbies.length > 0 && (
         <div className="mb-6 shrink-0">
            <SectionHeader title="Interests" />
            <p className="text-[13px] text-gray-700 px-2 italic">
                {hobbies.join(" • ")}
            </p>
         </div>
      )}

    </div>
  );
};