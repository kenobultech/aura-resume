// components/templates/TemplatePro1.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';
import { Linkedin, Mail, Phone, Globe, Link as LinkIcon, MapPin } from 'lucide-react';

export const TemplatePro1 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects,
    skills, 
    certificates, 
    languages,
    hobbies,
    themeColor = '#1e293b' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="flex items-start gap-2 mb-0.5 text-justify">
          <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
          <span>{line}</span>
      </li>
    ));
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="mb-3 shrink-0">
        <h3 
          className="text-center font-bold uppercase tracking-[0.2em] text-[13px] mb-1"
          style={{ color: themeColor }}
        >
          {title}
        </h3>
        <div className="w-full h-[1.5px] opacity-30" style={{ backgroundColor: themeColor }}></div>
    </div>
  );

  return (
    <div className="w-full min-h-full bg-white text-slate-900 font-sans p-10 shadow-2xl mx-auto flex flex-col text-[12px]">
      
      {/* --- HEADER --- */}
      <div 
        className="flex justify-between items-start mb-6 border-b-2 pb-4 shrink-0"
        style={{ borderColor: themeColor }}
      >
        <div>
            <h1 
              className="text-3xl font-bold uppercase tracking-tighter mb-2"
              style={{ color: themeColor }}
            >
                {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-semibold text-slate-600">
                {personalInfo.linkedin && (
                    <span className="flex items-center gap-1 hover:underline cursor-pointer">
                        <Linkedin size={12} style={{ color: themeColor }} /> LinkedIn
                    </span>
                )}
                 {personalInfo.website && (
                    <span className="flex items-center gap-1 hover:underline cursor-pointer">
                         <Globe size={12} style={{ color: themeColor }} /> {personalInfo.website.replace(/^https?:\/\//, '')}
                    </span>
                )}
                 {(personalInfo.city || personalInfo.country) && (
                    <span className="flex items-center gap-1">
                         <MapPin size={12} style={{ color: themeColor }} /> {personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}
                    </span>
                )}
            </div>
        </div>

        <div className="text-right text-[12px] font-bold text-slate-900 leading-snug">
            {personalInfo.email && (
                <div className="flex items-center justify-end gap-2 mb-1">
                    <span className="hover:underline lowercase">{personalInfo.email}</span>
                    <Mail size={12} style={{ color: themeColor }} />
                </div>
            )}
            {personalInfo.phone && (
                <div className="flex items-center justify-end gap-2">
                    <span>{personalInfo.phone}</span>
                    <Phone size={12} style={{ color: themeColor }} />
                </div>
            )}
            <p className="mt-1 text-[11px] uppercase tracking-widest opacity-60 font-black">{personalInfo.role}</p>
        </div>
      </div>

      {/* --- SUMMARY --- */}
      {personalInfo.summary && (
        <div className="mb-5 shrink-0">
            <SectionHeader title="Professional Profile" />
            <p className="text-slate-700 leading-relaxed text-justify px-1">
                {personalInfo.summary}
            </p>
        </div>
      )}

      {/* --- EDUCATION --- */}
      {education && education.length > 0 && (
        <div className="mb-5 shrink-0">
            <SectionHeader title="Education" />
            <div className="space-y-3 px-1">
                {education.map((edu) => (
                    <div key={edu.id} className="flex flex-col">
                        <div className="flex justify-between font-bold text-slate-900">
                            <span>{edu.school}</span>
                            <span className="italic font-normal text-slate-700 uppercase text-[10px]">{edu.city}</span>
                        </div>
                        <div className="flex justify-between text-slate-800 italic">
                            <span>{edu.degree}</span>
                            <span className="font-bold text-[11px] not-italic">{edu.startDate} - {edu.endDate}</span>
                        </div>
                        {edu.description && <p className="text-[11px] text-slate-500 mt-0.5">{edu.description}</p>}
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- SKILLS --- */}
      {skills && skills.length > 0 && (
        <div className="mb-5 shrink-0">
            <SectionHeader title="Skills Summary" />
            <div className="px-1 text-[12px] leading-relaxed">
                <span className="font-bold uppercase text-[11px] mr-2" style={{ color: themeColor }}>Core Competencies:</span>
                <span className="text-slate-800 font-medium">{skills.join(" • ")}</span>
            </div>
        </div>
      )}

      {/* --- WORK EXPERIENCE --- */}
      {experience && experience.length > 0 && (
        <div className="mb-5 shrink-0">
            <SectionHeader title="Work Experience" />
            <div className="space-y-4 px-1">
                {experience.map((exp) => (
                    <div key={exp.id}>
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="font-bold uppercase text-[12px]" style={{ color: themeColor }}>
                                {exp.jobTitle} <span className="normal-case font-normal text-slate-400 mx-1">|</span> <span className="text-slate-900">{exp.employer}</span>
                            </h4>
                            <span className="text-[11px] font-bold text-slate-900 italic">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <ul className="text-[11px] text-slate-700 leading-snug space-y-0.5">
                            {renderBullets(exp.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- PROJECTS --- */}
      {projects && projects.length > 0 && (
        <div className="mb-5 shrink-0">
            <SectionHeader title="Technical Projects" />
            <div className="space-y-4 px-1">
                {projects.map((proj) => (
                    <div key={proj.id}>
                        <div className="flex justify-between items-baseline mb-0.5">
                            <h4 className="font-bold uppercase text-[12px]" style={{ color: themeColor }}>
                                {proj.projectName}
                                {proj.link && <span className="ml-2 lowercase font-normal text-blue-600 text-[10px]"><LinkIcon size={10} className="inline mr-1"/>{proj.link}</span>}
                            </h4>
                            <span className="text-[11px] font-bold text-slate-900 italic">{proj.startDate} - {proj.endDate}</span>
                        </div>
                        <ul className="text-[11px] text-slate-700 leading-snug space-y-0.5">
                            {renderBullets(proj.description)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- CERTIFICATES --- */}
      {certificates && certificates.length > 0 && (
        <div className="mb-5 shrink-0">
            <SectionHeader title="Certificates & Awards" />
            <div className="space-y-2 px-1">
                {certificates.map((cert) => (
                    <div key={cert.id} className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-900 text-[12px]">
                            {cert.name} <span className="font-normal text-slate-400">| {cert.issuer}</span>
                        </h4>
                        <span className="text-[11px] font-bold text-slate-900">{cert.date}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {/* --- FINAL ROW: LANGUAGES & HOBBIES --- */}
      {((languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
          <div className="mt-auto pt-4 shrink-0">
              <div className="grid grid-cols-2 gap-8 border-t pt-4">
                  {languages && languages.length > 0 && (
                      <div>
                          <h4 className="font-bold uppercase text-[11px] mb-1" style={{ color: themeColor }}>Languages</h4>
                          <p className="text-slate-700 font-medium italic">{languages.join(", ")}</p>
                      </div>
                  )}
                  {hobbies && hobbies.length > 0 && (
                      <div className="text-right">
                          <h4 className="font-bold uppercase text-[11px] mb-1" style={{ color: themeColor }}>Interests</h4>
                          <p className="text-slate-700 font-medium italic">{hobbies.join(", ")}</p>
                      </div>
                  )}
              </div>
          </div>
      )}

    </div>
  );
};