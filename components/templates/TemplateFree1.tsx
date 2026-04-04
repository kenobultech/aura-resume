// components/templates/TemplateFree1.tsx
import React from 'react';
import { ResumeData } from './ResumeTypes';

export const TemplateFree1 = ({ data }: { data: ResumeData }) => {
  const { 
    personalInfo, 
    experience, 
    education, 
    projects,
    skills, 
    languages, 
    certificates, 
    hobbies,
    themeColor = '#0f172a' 
  } = data;

  const InfoRow = ({ label, value }: { label: string, value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex text-[12px] mb-1 leading-tight">
        {/* Reduced label width from w-36 to w-28 to save horizontal space */}
        <span className="w-28 font-bold shrink-0 uppercase text-[10px] pt-0.5" style={{ color: themeColor }}>{label}</span>
        <span className="w-3 text-center font-bold" style={{ color: themeColor }}>:</span>
        <span className="flex-1 text-slate-800 wrap-break-word">{value}</span>
      </div>
    );
  };

  const renderBullets = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <div key={index} className="flex items-start gap-2 mb-1">
        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: themeColor }}></span>
        <span>{line}</span>
      </div>
    ));
  };

  const ContentRow = ({ date, title, subtitle, description, link }: any) => (
    /* Wrapped in resume-section to prevent the date being separated from the description */
    <div className="flex text-[12px] mb-4 resume-section">
      {/* Matched w-28 and w-3 widths to keep colons perfectly aligned with top section */}
      <span className="w-28 font-bold shrink-0 uppercase text-[10px] pt-0.5" style={{ color: themeColor }}>{date}</span>
      <span className="w-3 text-center font-bold pt-0.5" style={{ color: themeColor }}>:</span>
      <div className="flex-1 pt-0.5">
        <div className="font-bold uppercase tracking-tight" style={{ color: themeColor }}>
             {title} <span className="font-medium text-slate-800 normal-case">{subtitle ? `— ${subtitle}` : ''}</span>
        </div>
        {link && <div className="text-[11px] text-blue-600 mb-1">{link}</div>}
        {description && (
            <div className="text-slate-700 mt-1.5 text-justify leading-relaxed">
                {renderBullets(description)}
            </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-black font-serif p-[15mm] mx-auto border-t-8 border-white flex flex-col relative box-border overflow-visible break-words">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0 !important; }
          body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact; }
        }
        .resume-section { break-inside: avoid; page-break-inside: avoid; }
      `}} />

      {/* --- COMPACT TITLE --- */}
      <div className="mb-6 text-center">
        <h1 
          className="text-2xl font-bold uppercase tracking-[0.2em] border-b-2 pb-1 mb-1 inline-block"
          style={{ color: themeColor, borderColor: themeColor }}
        >
            Curriculum Vitae
        </h1>
      </div>

      {/* --- TOP SECTION: PERSONAL DATA (GRID LAYOUT) --- */}
      <div className="flex justify-between items-start mb-6 resume-section border-b pb-6" style={{ borderColor: themeColor }}>
        
        {/* LEFT: Identity & Details */}
        <div className="flex-1 pr-4">
            {/* NAME AND ROLE HIGHLIGHTED FIRST */}
            <div className="mb-4">
                <h2 className="text-xl font-bold uppercase tracking-tight" style={{ color: themeColor }}>
                    {personalInfo.firstName} {personalInfo.lastName}
                </h2>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-widest">
                    {personalInfo.role}
                </p>
            </div>

            {/* TWO COLUMN GRID FOR DETAILS */}
            <div className="grid grid-cols-2 gap-x-4">
                <InfoRow label="Address" value={personalInfo.address} />
                <InfoRow label="Email" value={personalInfo.email} />
                <InfoRow label="Location" value={`${personalInfo.city || ''}${personalInfo.city && personalInfo.country ? ', ' : ''}${personalInfo.country || ''}`} />
                <InfoRow label="Tel" value={personalInfo.phone} />
                <InfoRow label="LinkedIn" value={personalInfo.linkedin?.replace('https://', '')} />
                <InfoRow label="Website" value={personalInfo.website?.replace('https://', '')} />
            </div>
        </div>

        {/* RIGHT: PHOTO */}
        {personalInfo.photo && (
            <div className="w-28 h-32 border-2 p-1 shrink-0 bg-white shadow-sm" style={{ borderColor: themeColor }}>
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
        )}
      </div>

      {/* --- 1. PERSONAL PROFILE --- */}
      {personalInfo.summary && (
          <div className="mb-6 resume-section">
            <h2 className="text-md font-bold uppercase border-b mb-2 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
              Personal Profile
            </h2>
            <p className="text-[12px] text-justify leading-relaxed text-slate-800">
                {personalInfo.summary}
            </p>
          </div>
      )}

      {/* --- 2. EDUCATION --- */}
      {education && education.length > 0 && (
          <div className="mb-6 resume-section">
            <h2 className="text-md font-bold uppercase border-b mb-3 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
              Education
            </h2>
            <div>
                {education.map(edu => (
                    <ContentRow 
                        key={edu.id}
                        date={`${edu.startDate} - ${edu.endDate}`}
                        title={edu.degree}
                        subtitle={edu.school}
                        description={edu.description}
                    />
                ))}
            </div>
          </div>
      )}

      {/* --- 3. WORK EXPERIENCE --- */}
      {experience && experience.length > 0 && (
          <div className="mb-6 resume-section">
             <h2 className="text-md font-bold uppercase border-b mb-3 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
               Work Experience
             </h2>
            <div>
                {experience.map(exp => (
                    <ContentRow 
                        key={exp.id}
                        date={`${exp.startDate} - ${exp.endDate}`}
                        title={exp.jobTitle}
                        subtitle={`${exp.employer}${exp.city ? `, ${exp.city}` : ''}`}
                        description={exp.description}
                    />
                ))}
            </div>
          </div>
      )}

      {/* --- 4. KEY PROJECTS --- */}
      {projects && projects.length > 0 && (
          <div className="mb-6 resume-section">
             <h2 className="text-md font-bold uppercase border-b mb-3 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
               Key Projects
             </h2>
            <div>
                {projects.map(proj => (
                    <ContentRow 
                        key={proj.id}
                        date={`${proj.startDate} - ${proj.endDate}`}
                        title={proj.projectName}
                        link={proj.link}
                        description={proj.description}
                    />
                ))}
            </div>
          </div>
      )}

      {/* --- 5. CERTIFICATES --- */}
      {certificates && certificates.length > 0 && (
          <div className="mb-6 resume-section">
             <h2 className="text-md font-bold uppercase border-b mb-3 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
               Certifications
             </h2>
            <div>
                {certificates.map(cert => (
                    <ContentRow 
                        key={cert.id}
                        date={cert.date}
                        title={cert.name}
                        subtitle={cert.issuer}
                        
                    />
                ))}
            </div>
          </div>
      )}

      {/* --- 6. SKILLS & COMPETENCIES --- */}
      {((skills && skills.length > 0) || (languages && languages.length > 0) || (hobbies && hobbies.length > 0)) && (
           <div className="mt-2 resume-section">
             <h2 className="text-md font-bold uppercase border-b mb-3 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
               Skills & Competencies
             </h2>
             
             {skills && skills.length > 0 && (
                 <div className="flex text-[12px] mb-2">
                    <span className="w-28 font-bold shrink-0 uppercase text-[10px] pt-0.5" style={{ color: themeColor }}>Professional Skills</span>
                    <span className="w-3 text-center font-bold" style={{ color: themeColor }}>:</span>
                    <span className="flex-1 text-slate-800 font-medium leading-relaxed">{skills.join(" • ")}</span>
                 </div>
             )}
             
             {languages && languages.length > 0 && (
                 <div className="flex text-[12px] mb-2">
                    <span className="w-28 font-bold shrink-0 uppercase text-[10px] pt-0.5" style={{ color: themeColor }}>Languages</span>
                    <span className="w-3 text-center font-bold" style={{ color: themeColor }}>:</span>
                    <span className="flex-1 text-slate-800 font-medium leading-relaxed">{languages.join(" • ")}</span>
                 </div>
             )}

             {hobbies && hobbies.length > 0 && (
                 <div className="flex text-[12px] mb-2">
                    <span className="w-28 font-bold shrink-0 uppercase text-[10px] pt-0.5" style={{ color: themeColor }}>Interests</span>
                    <span className="w-3 text-center font-bold" style={{ color: themeColor }}>:</span>
                    <span className="flex-1 text-slate-800 font-medium leading-relaxed">{hobbies.join(" • ")}</span>
                 </div>
             )}
           </div>
      )}
    </div>
  );
};