// components/templates/TemplateBasic1.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';
import { Phone, Mail, Linkedin, MapPin, Globe, Award } from 'lucide-react';

export const TemplateBasic1 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects, 
    skills, 
    certificates, 
    languages, 
    hobbies, 
    themeColor = '#cbb2a6' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="mb-1 flex items-start gap-2">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
          <span>{line}</span>
      </li>
    ));
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-800 font-sans shadow-2xl mx-auto flex flex-col">
      
      {/* --- HEADER --- */}
      <div className="pt-16 pb-6 text-center px-12">
        <h1 className="text-4xl uppercase tracking-widest font-light text-slate-900 mb-3">
          {personalInfo.firstName} <span className="font-semibold">{personalInfo.lastName}</span>
        </h1>
        <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-8">
          {personalInfo.role}
        </p>
        <div className="w-full border-b" style={{ borderColor: themeColor }}></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex flex-1 px-12 pb-12">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="w-[35%] pr-6 border-r flex flex-col gap-10 pt-8" style={{ borderColor: themeColor }}>
          
          {/* Contact */}
          <div className="space-y-4 text-[11px] font-medium text-slate-700">
             {personalInfo.phone && (
                 <div className="flex items-center gap-3">
                    <Phone size={14} style={{ fill: themeColor, color: themeColor }}/> 
                    <span>{personalInfo.phone}</span>
                 </div>
             )}
             {personalInfo.email && (
                 <div className="flex items-center gap-3">
                    <Mail size={14} style={{ fill: themeColor, color: themeColor }}/> 
                    <span>{personalInfo.email}</span>
                 </div>
             )}
             {personalInfo.linkedin && (
                 <div className="flex items-center gap-3">
                    <Linkedin size={14} style={{ fill: themeColor, color: themeColor }}/> 
                    <span>{personalInfo.linkedin}</span>
                 </div>
             )}
             {(personalInfo.address || personalInfo.city) && (
                 <div className="flex items-center gap-3">
                    <MapPin size={14} style={{ fill: themeColor, color: themeColor }}/> 
                    <span>
                        {personalInfo.address}{personalInfo.address && personalInfo.city ? ', ' : ''}{personalInfo.city}
                    </span>
                 </div>
             )}
             {personalInfo.website && (
                 <div className="flex items-center gap-3">
                    <Globe size={14} style={{ color: themeColor }}/> 
                    <span>{personalInfo.website}</span>
                 </div>
             )}
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div>
               <h3 className="uppercase tracking-wider text-[11px] font-semibold mb-3 border-b pb-2 inline-block w-full" style={{ borderColor: themeColor }}>
                 Education
               </h3>
               <div className="space-y-4">
                 {education.map(edu => (
                    <div key={edu.id}>
                        <p className="font-bold text-xs">{edu.school}</p>
                        <p className="text-[10px] text-slate-600 mb-1">{edu.degree}</p>
                        <p className="text-[10px] text-slate-400 italic">{edu.startDate} - {edu.endDate}</p>
                    </div>
                 ))}
               </div>
            </div>
          )}

          {/* Certificates */}
          {certificates && certificates.length > 0 && (
            <div>
               <h3 className="uppercase tracking-wider text-[11px] font-semibold mb-3 border-b pb-2 inline-block w-full" style={{ borderColor: themeColor }}>
                 Certificates
               </h3>
               <div className="space-y-4">
                 {certificates.map(cert => (
                    <div key={cert.id} className="flex gap-2">
                        <Award size={12} style={{ color: themeColor }} className="mt-0.5 shrink-0" />
                        <div>
                            <p className="font-bold text-xs">{cert.name}</p>
                            <p className="text-[10px] text-slate-500">{cert.issuer} | {cert.date}</p>
                        </div>
                    </div>
                 ))}
               </div>
            </div>
          )}

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
               <h3 className="uppercase tracking-wider text-[11px] font-semibold mb-3 border-b pb-2 inline-block w-full" style={{ borderColor: themeColor }}>
                 Skills
               </h3>
               <ul className="space-y-2 text-[11px] text-slate-700">
                  {skills.map((skill, i) => (
                      <li key={i} className="flex flex-col">
                          <span>{skill}</span>
                          <span className="w-full h-px mt-1 opacity-30" style={{ backgroundColor: themeColor }}></span>
                      </li>
                  ))}
               </ul>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
               <h3 className="uppercase tracking-wider text-[11px] font-semibold mb-3 border-b pb-2 inline-block w-full" style={{ borderColor: themeColor }}>
                 Languages
               </h3>
               <div className="flex flex-wrap gap-2 text-[11px] text-slate-700 font-medium">
                  {languages.join(' • ')}
               </div>
            </div>
          )}

          {/* Hobbies */}
          {hobbies && hobbies.length > 0 && (
            <div>
               <h3 className="uppercase tracking-wider text-[11px] font-semibold mb-3 border-b pb-2 inline-block w-full" style={{ borderColor: themeColor }}>
                 Hobbies
               </h3>
               <div className="text-[11px] text-slate-500 leading-relaxed italic">
                  {hobbies.join(', ')}
               </div>
            </div>
          )}
        </div>

        {/* --- RIGHT CONTENT --- */}
        <div className="w-[65%] pl-8 pt-8 flex flex-col gap-10">
            
            {/* Profile */}
            {personalInfo.summary && (
                <div>
                    <h3 className="uppercase tracking-wider text-[12px] font-semibold mb-4 text-slate-800" style={{ color: themeColor }}>
                        Profile
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-600 text-justify">
                        {personalInfo.summary}
                    </p>
                </div>
            )}

            {/* Work Experience */}
            {experience && experience.length > 0 && (
                <div>
                    <h3 className="uppercase tracking-wider text-[12px] font-semibold mb-6 text-slate-800" style={{ color: themeColor }}>
                        Work Experience
                    </h3>
                    <div className="space-y-8">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <h4 className="font-bold text-[11px] uppercase tracking-wide mb-1">{exp.jobTitle}</h4>
                                <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-tighter">
                                    {exp.employer} <span className="mx-1">|</span> {exp.city} <span className="mx-1">|</span> {exp.startDate} - {exp.endDate}
                                </p>
                                <ul className="text-xs text-slate-600 leading-relaxed space-y-1">
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
                    <h3 className="uppercase tracking-wider text-[12px] font-semibold mb-6 text-slate-800" style={{ color: themeColor }}>
                        Projects
                    </h3>
                    <div className="space-y-8">
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-bold text-[11px] uppercase tracking-wide">{proj.projectName}</h4>
                                    <span className="text-[10px] text-slate-400">{proj.startDate} - {proj.endDate}</span>
                                </div>
                                {proj.link && (
                                    <p className="text-[10px] text-blue-500 mb-2 truncate">{proj.link}</p>
                                )}
                                <ul className="text-xs text-slate-600 leading-relaxed space-y-1">
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