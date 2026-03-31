// components/templates/TemplateBasic2.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';
import { Mail, Phone, MapPin, User, Linkedin, Globe, Award, Languages } from 'lucide-react';

export const TemplateBasic2 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects, 
    skills, 
    certificates, 
    languages, 
    hobbies, 
    themeColor = '#2f5d8c' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="flex items-start gap-2">
          <span className="mt-1.5 text-xs shrink-0" style={{ color: themeColor }}>○</span>
          <span>{line}</span>
      </li>
    ));
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-800 font-sans shadow-2xl mx-auto overflow-hidden flex flex-col">
      
      {/* --- HEADER SECTION --- */}
      <div className="relative h-48 mb-4 shrink-0">
        <div 
          className="w-[85%] h-32 rounded-r-full absolute top-8 left-0 flex flex-col justify-center pl-12 pr-4 z-0 shadow-sm"
          style={{ backgroundColor: themeColor }}
        >
          <h1 className="text-3xl font-serif font-bold tracking-wide text-white mb-1">
            {personalInfo.firstName} <span className="opacity-90">{personalInfo.lastName}</span>
          </h1>
          <p className="text-sm font-medium tracking-widest text-white/80 uppercase">
            {personalInfo.role}
          </p>
        </div>

        <div className="absolute top-4 right-16 z-10">
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Profile" 
              className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg bg-white"
            />
          ) : (
            <div className="w-40 h-40 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center shadow-lg text-slate-400">
              <User size={64} />
            </div>
          )}
        </div>
      </div>

      {/* --- CONTACT BAR --- */}
      <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-6 py-3 border-b-2 border-slate-200 w-[90%] mx-auto mb-10 text-[11px] font-semibold text-slate-600 shrink-0">
         {personalInfo.email && (
            <div className="flex items-center gap-2">
                <div className="p-1 rounded-full text-white" style={{ backgroundColor: themeColor }}><Mail size={10} /></div>
                <span>{personalInfo.email}</span>
            </div>
         )}
         {personalInfo.phone && (
            <div className="flex items-center gap-2">
                <div className="p-1 rounded-full text-white" style={{ backgroundColor: themeColor }}><Phone size={10} /></div>
                <span>{personalInfo.phone}</span>
            </div>
         )}
         {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
                <div className="p-1 rounded-full text-white" style={{ backgroundColor: themeColor }}><Linkedin size={10} /></div>
                <span>LinkedIn</span>
            </div>
         )}
         {personalInfo.website && (
            <div className="flex items-center gap-2">
                <div className="p-1 rounded-full text-white" style={{ backgroundColor: themeColor }}><Globe size={10} /></div>
                <span>Portfolio</span>
            </div>
         )}
         {(personalInfo.city || personalInfo.country) && (
            <div className="flex items-center gap-2">
                <div className="p-1 rounded-full text-white" style={{ backgroundColor: themeColor }}><MapPin size={10} /></div>
                <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
            </div>
         )}
      </div>

      {/* --- MAIN COLUMNS --- */}
      <div className="flex px-10 gap-8 pb-10 flex-1">
        
        {/* === LEFT COLUMN (Narrow) === */}
        <div className="w-[35%] flex flex-col gap-8 border-r-2 border-slate-200 pr-6">
            
            {/* Education */}
            {education && education.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-4" style={{ color: themeColor }}>Education:</h3>
                    <div className="space-y-4">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <p className="font-bold text-sm text-slate-900 leading-tight mb-1">{edu.degree}</p>
                                <p className="text-xs font-semibold text-slate-600">{edu.school}</p>
                                <p className="text-[11px] italic text-slate-500 font-serif">{edu.startDate} - {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certificates */}
            {certificates && certificates.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-4" style={{ color: themeColor }}>Certificates:</h3>
                    <div className="space-y-4">
                        {certificates.map(cert => (
                            <div key={cert.id} className="flex gap-2">
                                <Award size={14} className="shrink-0 mt-0.5" style={{ color: themeColor }} />
                                <div>
                                    <p className="font-bold text-xs text-slate-900 leading-tight">{cert.name}</p>
                                    <p className="text-[10px] text-slate-500">{cert.issuer}</p>
                                    <p className="text-[10px] italic text-slate-400">{cert.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-4" style={{ color: themeColor }}>Skills:</h3>
                    <ul className="list-disc list-outside ml-4 text-[13px] text-slate-700 space-y-2 font-medium">
                        {skills.map((skill, i) => (
                            <li key={i} className="marker:text-slate-400">{skill}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-4" style={{ color: themeColor }}>Languages:</h3>
                    <div className="flex flex-col gap-2 ml-1">
                        {languages.map((lang, i) => (
                            <div key={i} className="flex items-center gap-2 text-[13px] text-slate-700 font-medium">
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                {lang}
                            </div>
                        ))}
                    </div>
                </div>
            )}

             {/* Hobbies */}
             {hobbies && hobbies.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-4" style={{ color: themeColor }}>Hobbies:</h3>
                    <ul className="list-disc list-outside ml-4 text-[13px] text-slate-700 space-y-2">
                        {hobbies.map((hobby, i) => (
                            <li key={i} className="marker:text-slate-400">{hobby}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        {/* === RIGHT COLUMN (Wide) === */}
        <div className="w-[65%] flex flex-col gap-8">
            
            {/* About Me */}
            {personalInfo.summary && (
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 shadow-sm" style={{ borderLeftColor: themeColor }}>
                    <h3 className="font-serif font-bold text-lg mb-2" style={{ color: themeColor }}>About Me:</h3>
                    <p className="text-[13px] leading-relaxed text-slate-700 text-justify">
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-6" style={{ color: themeColor }}>Work Experience:</h3>
                    <div className="space-y-8">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <h4 className="font-bold text-[13px] text-slate-900 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                    {exp.jobTitle} - <span className="text-slate-600 font-normal">{exp.employer}</span>
                                </h4>
                                <p className="text-[11px] font-semibold text-slate-500 italic mb-2 pl-4">
                                    {exp.startDate} - {exp.endDate} | {exp.city}
                                </p>
                                <ul className="list-none pl-4 text-[13px] text-slate-700 leading-relaxed space-y-1">
                                    {renderBullets(exp.description)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <div>
                    <h3 className="font-serif font-bold text-lg mb-6" style={{ color: themeColor }}>Key Projects:</h3>
                    <div className="space-y-8">
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1 pl-4">
                                    <h4 className="font-bold text-[13px] text-slate-900 underline decoration-slate-200 underline-offset-4">
                                        {proj.projectName}
                                    </h4>
                                    <span className="text-[11px] text-slate-500 font-serif italic">{proj.startDate} - {proj.endDate}</span>
                                </div>
                                {proj.link && (
                                    <p className="text-[11px] text-blue-500 pl-4 mb-2 truncate">{proj.link}</p>
                                )}
                                <ul className="list-none pl-4 text-[13px] text-slate-700 leading-relaxed space-y-1">
                                    {renderBullets(proj.description)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};