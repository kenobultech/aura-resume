// components/templates/TemplateCreative1.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';
import { Globe, Linkedin, Link as LinkIcon } from 'lucide-react';

export const TemplateCreative1 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects, // Integrated
    skills, 
    languages, 
    certificates, 
    hobbies, 
    themeColor = '#1d4ed8' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="flex items-start gap-2 mb-1">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
        <span className="pl-1">{line}</span>
      </li>
    ));
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-800 font-sans p-10 shadow-2xl mx-auto flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-6 border-b-2 border-slate-200 pb-6">
        <div className="flex-1 pr-6">
            <h1 
              className="text-4xl font-bold uppercase mb-2 tracking-tighter" 
              style={{ color: themeColor }}
            >
                {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wide mb-3">
                {personalInfo.role}
            </h2>
            
            {/* Contact & Socials Line */}
            <div className="text-[13px] text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                {personalInfo.email && <span className="font-medium">{personalInfo.email}</span>}
                {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                {(personalInfo.city || personalInfo.country) && (
                    <span>• {personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                )}
            </div>
            
            <div className="text-[12px] mt-2 flex flex-wrap gap-4 font-semibold" style={{ color: themeColor }}>
                {personalInfo.linkedin && (
                    <a href={personalInfo.linkedin} className="flex items-center gap-1 hover:underline">
                        <Linkedin size={12} /> LinkedIn
                    </a>
                )}
                {personalInfo.website && (
                    <a href={personalInfo.website} className="flex items-center gap-1 hover:underline">
                        <Globe size={12} /> Portfolio
                    </a>
                )}
            </div>
        </div>

        {/* Photo */}
        {personalInfo.photo && (
            <div className="w-28 h-28 shrink-0 border-2 p-1 rounded-sm" style={{ borderColor: themeColor }}>
                <img 
                    src={personalInfo.photo} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
            </div>
        )}
      </div>

      {/* --- SUMMARY --- */}
      {personalInfo.summary && (
        <div className="mb-6">
            <h3 
              className="text-sm font-black uppercase border-b-2 mb-3 pb-1 tracking-widest"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Summary
            </h3>
            <p className="text-[13px] leading-relaxed text-slate-700 text-justify">
                {personalInfo.summary}
            </p>
        </div>
      )}

      {/* --- PROFESSIONAL EXPERIENCE --- */}
      {experience && experience.length > 0 && (
        <div className="mb-6">
            <h3 
              className="text-sm font-black uppercase border-b-2 mb-4 pb-1 tracking-widest"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Professional Experience
            </h3>
            
            <div className="space-y-5">
                {experience.map((exp) => (
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-900 text-[14px]">
                                {exp.jobTitle} <span className="font-normal text-slate-500">at</span> {exp.employer}
                            </h4>
                            <span className="text-[12px] font-bold text-slate-900 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded">
                                {exp.startDate} — {exp.endDate}
                            </span>
                        </div>
                        <ul className="text-[13px] text-slate-600 leading-snug space-y-1">
                            {renderBullets(exp.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- PROJECTS --- */}
      {projects && projects.length > 0 && (
        <div className="mb-6">
            <h3 
              className="text-sm font-black uppercase border-b-2 mb-4 pb-1 tracking-widest"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Key Projects
            </h3>
            
            <div className="space-y-5">
                {projects.map((proj) => (
                    <div key={proj.id}>
                        <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-slate-900 text-[14px] flex items-center gap-2">
                                {proj.projectName}
                                {proj.link && <LinkIcon size={12} className="text-slate-400" />}
                            </h4>
                            <span className="text-[12px] font-bold text-slate-900 whitespace-nowrap">
                                {proj.startDate} — {proj.endDate}
                            </span>
                        </div>
                        <ul className="text-[13px] text-slate-600 leading-snug space-y-1">
                            {renderBullets(proj.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length > 0 && (
        <div className="mb-6">
            <h3 
              className="text-sm font-black uppercase border-b-2 mb-4 pb-1 tracking-widest"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Education
            </h3>
            <div className="space-y-4">
                {education.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-slate-900 text-[14px]">{edu.degree}</h4>
                            <p className="text-[13px] text-slate-700 font-medium">{edu.school} • {edu.city}</p>
                            {edu.description && <p className="text-[12px] text-slate-500 mt-1 italic">{edu.description}</p>}
                        </div>
                        <span className="text-[12px] font-bold text-slate-900 whitespace-nowrap">
                            {edu.startDate} — {edu.endDate}
                        </span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- TECHNICAL SKILLS --- */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
            <h3 
              className="text-sm font-black uppercase border-b-2 mb-4 pb-1 tracking-widest"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Technical Skills
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-slate-700">
                {skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                        <span className="font-medium">{skill}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- ADDITIONAL INFORMATION --- */}
      {(languages?.length || certificates?.length || hobbies?.length) ? (
          <div className="mt-auto pt-4">
            <h3 
              className="text-sm font-black uppercase border-b-2 mb-4 pb-1 tracking-widest"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-10 text-[13px] text-slate-700">
                {/* Languages */}
                {languages && languages.length > 0 && (
                    <div className="flex gap-2">
                        <span className="font-bold text-slate-900 min-w-[80px]">Languages:</span> 
                        <span>{languages.join(", ")}</span>
                    </div>
                )}
                
                {/* Certificates */}
                {certificates && certificates.length > 0 && (
                    <div className="flex gap-2 items-start">
                        <span className="font-bold text-slate-900 min-w-[80px]">Certificates:</span> 
                        <div className="flex flex-col">
                            {certificates.map(c => (
                                <span key={c.id}>{c.name} ({c.issuer})</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Hobbies */}
                {hobbies && hobbies.length > 0 && (
                    <div className="flex gap-2">
                        <span className="font-bold text-slate-900 min-w-[80px]">Interests:</span> 
                        <span className="italic">{hobbies.join(", ")}</span>
                    </div>
                )}
            </div>
          </div>
      ) : null}

    </div>
  );
};