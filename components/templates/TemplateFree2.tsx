// components/templates/TemplateFree2.tsx
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
      <div className="flex text-sm mb-2">
        <span className="w-48 font-bold shrink-0" style={{ color: themeColor }}>{label}</span>
        <span className="w-6 text-center font-bold" style={{ color: themeColor }}>:</span>
        <span className="flex-1 text-slate-900 font-medium wrap-break-word">{value}</span>
      </div>
    );
  };

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <div key={index} className="flex items-start gap-2 mb-1 pl-4">
        <span className="mt-2 w-1 h-1 rounded-full shrink-0 opacity-60" style={{ backgroundColor: themeColor }}></span>
        <span className="text-[13px]">{line}</span>
      </div>
    ));
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-900 font-serif p-8 mx-auto shadow-2xl flex flex-col">
      
      {/* Outer Border Box */}
      <div 
        className="border-2 h-full p-8 flex flex-col relative flex-1"
        style={{ borderColor: themeColor }}
      >
        
        {/* --- TOP HEADER --- */}
        <div className="flex justify-between items-start mb-4 shrink-0">
            {/* Left: Contact Info */}
            <div className="text-sm font-bold leading-relaxed">
                <h1 className="text-xl uppercase mb-1 tracking-tighter" style={{ color: themeColor }}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="font-medium text-slate-800 max-w-[300px]">{personalInfo.address}</p>
                {(personalInfo.city || personalInfo.country) && (
                    <p className="font-medium text-slate-800">
                        {personalInfo.city}{personalInfo.city && personalInfo.country ? ', ' : ''}{personalInfo.country}
                    </p>
                )}
                <p className="font-medium text-slate-800 mt-1">Contact no.: {personalInfo.phone}</p>
                <p className="font-medium text-slate-800">Email: {personalInfo.email}</p>
            </div>

            {/* Right: RESUME Title */}
            <div>
                <h2 
                    className="text-3xl font-bold uppercase border-b-4 inline-block tracking-[0.2em] px-2"
                    style={{ color: themeColor, borderColor: themeColor }}
                >
                    Resume
                </h2>
            </div>
        </div>

        {/* Thick Divider Line */}
        <div className="w-full h-[3px] mb-6 shrink-0" style={{ backgroundColor: themeColor }}></div>

        {/* --- OBJECTIVES --- */}
        {personalInfo.summary && (
            <div className="mb-6 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Objectives
                </h3>
                <p className="text-sm text-justify leading-relaxed font-medium text-slate-800">
                    {personalInfo.summary}
                </p>
            </div>
        )}

        {/* --- PERSONAL INFORMATION --- */}
        <div className="mb-6 shrink-0">
            <h3 
                className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-4"
                style={{ color: themeColor, textDecorationColor: themeColor }}
            >
                Personal Information
            </h3>
            <div className="pl-1">
                <InfoRow label="Name" value={`${personalInfo.firstName} ${personalInfo.lastName}`} />
                <InfoRow label="Nationality" value={personalInfo.country} />
                {languages && languages.length > 0 && (
                     <InfoRow label="Languages Known" value={languages.join(", ")} />
                )}
                <InfoRow label="LinkedIn" value={personalInfo.linkedin} />
                <InfoRow label="Website/Portfolio" value={personalInfo.website} />
                <InfoRow label="Current Address" value={personalInfo.address} />
            </div>
        </div>

        {/* --- QUALIFICATION (Education) --- */}
        {education && education.length > 0 && (
            <div className="mb-6 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Qualifications
                </h3>
                <ul className="text-sm font-medium text-slate-800 space-y-2">
                    {education.map((edu) => (
                        <li key={edu.id}>
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold">{edu.degree}</span> from {edu.school} <span className="italic text-slate-600">({edu.startDate} - {edu.endDate})</span></span>
                            </div>
                            {edu.description && <div className="pl-4 mt-1 opacity-80 italic text-xs">{edu.description}</div>}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- WORK EXPERIENCE --- */}
        {experience && experience.length > 0 && (
            <div className="mb-6 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Experience:-
                </h3>
                <ul className="text-sm font-medium text-slate-800 space-y-4">
                    {experience.map((exp) => (
                        <li key={exp.id}>
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold uppercase">{exp.jobTitle}</span> at {exp.employer} <span className="italic text-slate-600">({exp.startDate} - {exp.endDate})</span></span>
                            </div>
                            {renderBullets(exp.description)}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- KEY PROJECTS --- */}
        {projects && projects.length > 0 && (
            <div className="mb-6 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Key Projects:-
                </h3>
                <ul className="text-sm font-medium text-slate-800 space-y-4">
                    {projects.map((proj) => (
                        <li key={proj.id}>
                            <div className="flex items-start gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                                <span><span className="font-bold uppercase">{proj.projectName}</span> <span className="italic text-slate-600">({proj.startDate} - {proj.endDate})</span></span>
                            </div>
                            {proj.link && <div className="pl-4 text-[11px] text-blue-600 underline">{proj.link}</div>}
                            {renderBullets(proj.description)}
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- CERTIFICATIONS --- */}
        {certificates && certificates.length > 0 && (
            <div className="mb-6 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Additional Training:-
                </h3>
                <ul className="text-sm font-medium text-slate-800 space-y-2">
                    {certificates.map((cert) => (
                        <li key={cert.id} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                            <span><span className="font-bold">{cert.name}</span> by {cert.issuer} <span className="text-slate-500">({cert.date})</span></span>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        {/* --- OTHER SKILL --- */}
        {skills && skills.length > 0 && (
            <div className="mb-6 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Other Skill
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pl-4">
                    {skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-800">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
                            <span>{skill}</span>
                        </div>
                    ))}
                </div>
        </div>
        )}

        {/* --- HOBBY --- */}
        {hobbies && hobbies.length > 0 && (
            <div className="mb-8 shrink-0">
                <h3 
                    className="text-md font-bold uppercase underline decoration-2 underline-offset-4 mb-3"
                    style={{ color: themeColor, textDecorationColor: themeColor }}
                >
                    Hobby:-
                </h3>
                <div className="flex flex-wrap gap-x-4 pl-4 text-sm font-medium text-slate-800 italic">
                    {hobbies.join(" • ")}
                </div>
            </div>
        )}

        {/* --- FOOTER (Date / Place / Sign) --- */}
        <div className="mt-auto pt-10 flex justify-between items-end shrink-0">
            <div className="text-sm font-bold space-y-4" style={{ color: themeColor }}>
                <p>Date: <span className="inline-block w-32 border-b" style={{ borderColor: themeColor }}></span></p>
                <p>Place: <span className="font-medium text-slate-800">{personalInfo.city || "Not Specified"}</span></p>
            </div>
            <div className="text-sm font-bold text-center" style={{ color: themeColor }}>
                <div className="w-48 border-b mb-2 opacity-30" style={{ borderColor: themeColor }}></div>
                <p className="uppercase tracking-widest">({personalInfo.firstName} {personalInfo.lastName})</p>
            </div>
        </div>

      </div>
    </div>
  );
};