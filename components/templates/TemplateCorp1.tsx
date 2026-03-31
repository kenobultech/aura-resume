// components/templates/TemplateCorp1.tsx
import React from 'react';
import { 
  Phone, Mail, Globe, Linkedin, Twitter, 
  User, Briefcase, GraduationCap, Award, Layers, Facebook, Instagram
} from 'lucide-react';
import { ResumeData } from './ResumeTypes'; 

export const TemplateCorp1 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects,
    skills, 
    languages, 
    hobbies, 
    certificates, 
    themeColor = '#1a4c78' 
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
    <div className="w-full min-h-full flex bg-white font-sans shadow-2xl mx-auto overflow-hidden">
      
      {/* --- LEFT SIDEBAR (Dynamic Color) --- */}
      <div 
        className="w-[35%] text-white flex flex-col items-center pt-10 pb-8 px-6 relative shrink-0"
        style={{ backgroundColor: themeColor }}
      >
        
        {/* Profile Photo */}
        <div className="mb-6 relative">
          {personalInfo.photo ? (
            <img 
              src={personalInfo.photo} 
              alt="Profile" 
              className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
            />
          ) : (
            <div className="w-36 h-36 rounded-full border-4 border-white bg-black/20 flex items-center justify-center text-4xl font-bold opacity-80 uppercase">
               {personalInfo.firstName?.[0]}{personalInfo.lastName?.[0]}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div className="text-center w-full mb-8">
          <h1 className="text-2xl font-bold uppercase tracking-wide leading-tight mb-1">
            {personalInfo.firstName} <span className="text-white/70">{personalInfo.lastName}</span>
          </h1>
          <p className="text-sm font-light text-white/90 italic leading-snug px-2">
            {personalInfo.role || "Professional Title"}
          </p>
          <div className="w-10 h-0.5 bg-white/40 mx-auto mt-4"></div>
        </div>

        {/* Contact Details */}
        <div className="w-full text-xs space-y-4 mb-8">
          <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Details</h3>
          
          {(personalInfo.address || personalInfo.city) && (
            <div className="space-y-1 text-white/90">
                <p className="font-semibold text-white uppercase text-[10px] tracking-wider">Address</p>
                <p>{personalInfo.address}</p>
                <p>{personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}</p>
            </div>
          )}

          <div className="space-y-1 text-white/90">
             <p className="font-semibold text-white uppercase text-[10px] tracking-wider">Contact</p>
             {personalInfo.phone && <p className='flex items-center gap-2'><Phone size={12}/> {personalInfo.phone}</p>}
             {personalInfo.email && <p className='flex items-center gap-2 truncate'><Mail size={12}/> {personalInfo.email}</p>}
             {personalInfo.website && <p className='flex items-center gap-2 truncate'><Globe size={12}/> {personalInfo.website}</p>}
          </div>

          {/* Socials */}
          {(personalInfo.linkedin || personalInfo.twitter || personalInfo.facebook || personalInfo.instagram) && (
            <div className="mt-4 space-y-2">
                <p className="font-semibold text-white uppercase text-[10px] tracking-wider mb-2">Socials</p>
                {personalInfo.linkedin && <div className="flex items-center gap-2 text-white/90"><Linkedin size={12}/> <span className="truncate">LinkedIn</span></div>}
                {personalInfo.twitter && <div className="flex items-center gap-2 text-white/90"><Twitter size={12}/> <span className="truncate">Twitter</span></div>}
                {personalInfo.facebook && <div className="flex items-center gap-2 text-white/90"><Facebook size={12}/> <span className="truncate">Facebook</span></div>}
                {personalInfo.instagram && <div className="flex items-center gap-2 text-white/90"><Instagram size={12}/> <span className="truncate">Instagram</span></div>}
            </div>
          )}
        </div>

        {/* Tools / Skills */}
        {skills && skills.length > 0 && (
            <div className="w-full mb-8">
            <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Tools of the Trade</h3>
            <ul className="text-sm text-white/90 space-y-1.5 font-medium">
                {skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span> {skill}
                </li>
                ))}
            </ul>
            </div>
        )}

        {/* Languages */}
        {languages && languages.length > 0 && (
          <div className="w-full mb-8">
            <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Languages</h3>
            <ul className="text-sm text-white/90 space-y-1">
              {languages.map((lang, i) => <li key={i}>{lang}</li>)}
            </ul>
          </div>
        )}

        {/* Hobbies */}
        {hobbies && hobbies.length > 0 && (
            <div className="w-full">
                <h3 className="font-bold text-sm uppercase tracking-widest border-b border-white/20 pb-1 mb-3">Hobbies</h3>
                <p className="text-xs text-white/90 leading-relaxed italic opacity-80">
                    {hobbies.join(", ")}
                </p>
            </div>
        )}
      </div>

      {/* --- RIGHT CONTENT (White) --- */}
      <div className="w-[65%] p-10 pt-12 text-slate-800">
        
        {/* Profile / Summary */}
        {personalInfo.summary && (
            <div className="mb-10 relative">
                <div className="flex items-center gap-3 mb-3 border-b-2 border-slate-100 pb-2">
                    <div className="p-1.5 rounded-full text-white" style={{ backgroundColor: themeColor }}>
                        <User size={16} />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: themeColor }}>Profile</h3>
                </div>
                <p className="text-[13px] text-slate-600 leading-relaxed text-justify">
                    {personalInfo.summary}
                </p>
            </div>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4 border-b-2 border-slate-100 pb-2">
                    <div className="p-1.5 rounded-full text-white" style={{ backgroundColor: themeColor }}>
                        <Briefcase size={16} />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: themeColor }}>Experience</h3>
                </div>

                <div className="space-y-6">
                    {experience.map((exp) => (
                        <div key={exp.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-md text-slate-900">{exp.jobTitle}</h4>
                                <span className="text-[11px] text-slate-400 italic">
                                    {exp.startDate} - {exp.endDate || "Present"}
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-slate-700 mb-2 uppercase text-[12px] tracking-tight">
                                {exp.employer} <span className="font-normal text-slate-400">| {exp.city}</span>
                            </p>
                            <ul className="text-xs text-slate-600 leading-relaxed space-y-1">
                                {renderBullets(exp.description || "")}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4 border-b-2 border-slate-100 pb-2">
                    <div className="p-1.5 rounded-full text-white" style={{ backgroundColor: themeColor }}>
                        <Layers size={16} />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: themeColor }}>Projects</h3>
                </div>

                <div className="space-y-6">
                    {projects.map((proj) => (
                        <div key={proj.id}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-md text-slate-900 underline decoration-slate-200 underline-offset-4">{proj.projectName}</h4>
                                <span className="text-[11px] text-slate-400 italic">
                                    {proj.startDate} - {proj.endDate}
                                </span>
                            </div>
                            {proj.link && <p className="text-[11px] text-blue-500 mb-2 truncate">{proj.link}</p>}
                            <ul className="text-xs text-slate-600 leading-relaxed space-y-1">
                                {renderBullets(proj.description || "")}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-4 border-b-2 border-slate-100 pb-2">
                    <div className="p-1.5 rounded-full text-white" style={{ backgroundColor: themeColor }}>
                        <GraduationCap size={16} />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: themeColor }}>Education</h3>
                </div>

                <div className="space-y-4">
                    {education.map((edu) => (
                        <div key={edu.id}>
                            <h4 className="font-bold text-md text-slate-900">{edu.degree}</h4>
                            <p className="text-sm text-slate-700">{edu.school}</p>
                            <p className="text-[11px] text-slate-400 italic mb-1">{edu.startDate} - {edu.endDate}</p>
                            {edu.description && <p className="text-xs text-slate-500 leading-relaxed italic">{edu.description}</p>}
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Certificates */}
        {certificates && certificates.length > 0 && (
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4 border-b-2 border-slate-100 pb-2">
                    <div className="p-1.5 rounded-full text-white" style={{ backgroundColor: themeColor }}>
                        <Award size={16} />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-lg" style={{ color: themeColor }}>Certificates</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="border-l-2 border-slate-100 pl-3 py-1">
                            <h4 className="font-bold text-sm text-slate-900 leading-tight">{cert.name}</h4>
                            <p className="text-[11px] text-slate-500 italic">{cert.issuer} | {cert.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};