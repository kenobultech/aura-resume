// components/templates/TemplateCreative2.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';
import { Phone, Mail, Globe, MapPin, Linkedin, Award, Languages as LangIcon, Heart } from 'lucide-react';

export const TemplateCreative2 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects,
    skills, 
    certificates, 
    languages,
    hobbies,
    themeColor = '#000000' 
  } = data;

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <li key={index} className="flex items-start gap-2 mb-1">
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
          <span className="text-[13px]">{line}</span>
      </li>
    ));
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-900 font-sans shadow-2xl mx-auto flex flex-col pt-10 px-8 pb-10">
      
      {/* --- TOP DESIGN ELEMENT --- */}
      <div className="w-full flex justify-center mb-2">
         <div className="h-8 w-[2px]" style={{ backgroundColor: themeColor }}></div>
      </div>

      {/* --- HEADER --- */}
      <div className="text-center mb-6">
        <h1 
          className="text-5xl font-extrabold uppercase tracking-tighter mb-2"
          style={{ color: themeColor }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl uppercase tracking-widest font-medium text-slate-500">
          {personalInfo.role}
        </p>
      </div>

      {/* --- HORIZONTAL DIVIDER --- */}
      <div className="w-full border-t-2 mb-1" style={{ borderColor: themeColor }}></div>
      <div className="w-full border-t mb-6" style={{ borderColor: themeColor }}></div>

      {/* --- ABOUT ME & CONTACT --- */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-8">
         {/* Left: Summary */}
         {personalInfo.summary && (
            <div className="flex-1">
                <h3 className="font-bold uppercase text-lg mb-2 tracking-wide" style={{ color: themeColor }}>About Me</h3>
                <p className="text-sm text-justify leading-relaxed text-slate-700">
                    {personalInfo.summary}
                </p>
            </div>
         )}

         {/* Right: Contact Details */}
         <div className="w-full md:w-1/3 flex flex-col items-end gap-2 text-[12px] font-bold uppercase tracking-wider text-slate-600">
             {personalInfo.phone && (
                 <div className="flex items-center gap-2">
                    <span>{personalInfo.phone}</span>
                    <Phone size={14} style={{ color: themeColor }} />
                 </div>
             )}
             {personalInfo.email && (
                 <div className="flex items-center gap-2">
                    <span className="lowercase">{personalInfo.email}</span>
                    <Mail size={14} style={{ color: themeColor }} />
                 </div>
             )}
             {personalInfo.linkedin && (
                 <div className="flex items-center gap-2">
                    <span className="lowercase">LinkedIn</span>
                    <Linkedin size={14} style={{ color: themeColor }} />
                 </div>
             )}
             {personalInfo.website && (
                 <div className="flex items-center gap-2">
                    <span className="lowercase">{personalInfo.website}</span>
                    <Globe size={14} style={{ color: themeColor }} />
                 </div>
             )}
              {(personalInfo.city || personalInfo.country) && (
                 <div className="flex items-center gap-2">
                    <span>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</span>
                    <MapPin size={14} style={{ color: themeColor }} />
                 </div>
             )}
         </div>
      </div>

      {/* --- HORIZONTAL DIVIDER 2 --- */}
      <div className="w-full border-t-2 mb-1" style={{ borderColor: themeColor }}></div>
      <div className="w-full border-t mb-0" style={{ borderColor: themeColor }}></div>

      {/* --- MAIN SPLIT LAYOUT --- */}
      <div className="flex flex-1 relative">
        
        {/* === LEFT COLUMN (Sidebar) === */}
        <div className="w-[35%] pr-6 py-6 border-r flex flex-col gap-8 shrink-0" style={{ borderColor: themeColor }}>
            
            {/* EDUCATION */}
            {education && education.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-md tracking-widest mb-4 border-b-2 pb-1 inline-block w-full"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Education
                    </h3>
                    <div className="space-y-5">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <h4 className="font-bold text-[13px] leading-tight uppercase">{edu.degree}</h4>
                                <p className="text-xs font-semibold mt-1 text-slate-600">{edu.school}</p>
                                <p className="text-[10px] text-slate-400 italic mt-1 font-bold">{edu.startDate} — {edu.endDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SKILLS */}
            {skills && skills.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-md tracking-widest mb-4 border-b-2 pb-1 inline-block w-full"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Expertise
                    </h3>
                    <ul className="text-[13px] font-bold uppercase space-y-2 text-slate-700">
                        {skills.map((skill, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* LANGUAGES */}
            {languages && languages.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-md tracking-widest mb-4 border-b-2 pb-1 inline-block w-full"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Languages
                    </h3>
                    <ul className="text-[13px] font-bold uppercase space-y-2 text-slate-700">
                        {languages.map((lang, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <LangIcon size={12} style={{ color: themeColor }} />
                                {lang}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ACHIEVEMENTS / CERTIFICATES */}
            {certificates && certificates.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-md tracking-widest mb-4 border-b-2 pb-1 inline-block w-full"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Awards
                    </h3>
                    <div className="space-y-4">
                        {certificates.map(cert => (
                            <div key={cert.id}>
                                <h4 className="font-bold text-[12px] leading-tight uppercase">{cert.name}</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase">{cert.issuer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* HOBBIES */}
            {hobbies && hobbies.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-md tracking-widest mb-4 border-b-2 pb-1 inline-block w-full"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Interests
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {hobbies.map((hobby, i) => (
                            <span key={i} className="text-[11px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                {hobby}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* === RIGHT COLUMN (Main Content) === */}
        <div className="w-[65%] pl-6 py-6 flex flex-col gap-10">
            
            {/* WORK EXPERIENCE */}
            {experience && experience.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-lg tracking-widest mb-6 border-b-2 pb-1 inline-block w-full text-center"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Work History
                    </h3>
                    
                    <div className="space-y-8">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-black text-[15px] uppercase tracking-tighter">{exp.employer}</h4>
                                    <div className="text-right">
                                        <p className="text-[11px] font-black text-slate-900 uppercase">{exp.city}</p>
                                        <p className="text-[11px] font-bold text-slate-400 italic">{exp.startDate} — {exp.endDate}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold uppercase mb-3" style={{ color: themeColor }}>
                                    {exp.jobTitle}
                                </p>
                                <ul className="text-sm text-slate-800 leading-snug space-y-2">
                                    {renderBullets(exp.description)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PROJECTS */}
            {projects && projects.length > 0 && (
                <div className="w-full">
                    <h3 
                        className="font-bold uppercase text-lg tracking-widest mb-6 border-b-2 pb-1 inline-block w-full text-center"
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        Key Projects
                    </h3>
                    
                    <div className="space-y-8">
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-black text-[15px] uppercase tracking-tighter">{proj.projectName}</h4>
                                    <p className="text-[11px] font-bold text-slate-400 italic">{proj.startDate} — {proj.endDate}</p>
                                </div>
                                {proj.link && (
                                    <p className="text-[11px] font-bold text-blue-600 mb-2 truncate uppercase">{proj.link}</p>
                                )}
                                <ul className="text-sm text-slate-800 leading-snug space-y-2">
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