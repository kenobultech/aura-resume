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

  // --- Helpers for the "Label : Value" layout ---
  
  const InfoRow = ({ label, value }: { label: string, value: string | undefined }) => {
    if (!value) return null;
    return (
      <div className="flex text-[13px] mb-1.5 leading-snug">
        <span className="w-36 font-bold shrink-0" style={{ color: themeColor }}>{label}</span>
        <span className="w-4 text-center font-bold" style={{ color: themeColor }}>:</span>
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
    <div className="flex text-[13px] mb-6">
      <span className="w-36 font-bold shrink-0 pt-0.5" style={{ color: themeColor }}>{date}</span>
      <span className="w-4 text-center font-bold pt-0.5" style={{ color: themeColor }}>:</span>
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
    <div className="w-full min-h-full bg-white text-black font-serif p-12 shadow-2xl mx-auto border-t-8 border-white flex flex-col">
      
      {/* --- MAIN TITLE --- */}
      <div className="mb-12 text-center shrink-0">
        <div className="inline-block">
            <h1 
              className="text-2xl font-bold uppercase tracking-[0.3em] border-b-4 pb-1 mb-1"
              style={{ color: themeColor, borderColor: themeColor }}
            >
                Curriculum Vitae
            </h1>
            <div className="border-b w-full mx-auto" style={{ borderColor: themeColor }}></div>
        </div>
      </div>

      {/* --- TOP SECTION: PERSONAL DATA --- */}
      <div className="flex justify-between items-start mb-10 shrink-0">
        <div className="flex-1 pr-6">
            <InfoRow label="Name & Surname" value={`${personalInfo.firstName} ${personalInfo.lastName}`} />
            <InfoRow label="Apply for" value={personalInfo.role} />
            <InfoRow label="Address" value={personalInfo.address} />
            {(personalInfo.city || personalInfo.country) && (
                 <InfoRow label="Location" value={`${personalInfo.city || ''}${personalInfo.city && personalInfo.country ? ', ' : ''}${personalInfo.country || ''}`} />
            )}
            <InfoRow label="Tel" value={personalInfo.phone} />
            <InfoRow label="Email" value={personalInfo.email} />
            <InfoRow label="LinkedIn" value={personalInfo.linkedin} />
            <InfoRow label="Website" value={personalInfo.website} />
            {/* Combine other socials into one row if they exist */}
            {(personalInfo.twitter || personalInfo.facebook || personalInfo.instagram) && (
                <InfoRow 
                    label="Social Media" 
                    value={[personalInfo.twitter, personalInfo.facebook, personalInfo.instagram].filter(Boolean).join(" | ")} 
                />
            )}
        </div>

        {personalInfo.photo ? (
            <div className="w-32 h-40 border-2 p-1 shrink-0 bg-white shadow-sm" style={{ borderColor: themeColor }}>
                <img src={personalInfo.photo} alt="Profile" className="w-full h-full object-cover" />
            </div>
        ) : (
            <div 
              className="w-32 h-40 border-2 flex items-center justify-center text-[10px] uppercase tracking-widest text-center p-2 text-slate-400 bg-slate-50 font-sans"
              style={{ borderColor: themeColor }}
            >
                Photo
            </div>
        )}
      </div>

      {/* --- 1. PERSONAL PROFILE --- */}
      {personalInfo.summary && (
          <div className="mb-8 shrink-0">
            <div className="mb-4">
                <h2 className="text-lg font-bold uppercase border-b-2 mb-1 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
                  Personal Profile
                </h2>
                <div className="border-b w-full" style={{ borderColor: themeColor }}></div>
            </div>
            <p className="text-[13px] text-justify leading-relaxed text-slate-800">
                {personalInfo.summary}
            </p>
          </div>
      )}

      {/* --- 2. EDUCATION --- */}
      {education && education.length > 0 && (
          <div className="mb-8 shrink-0">
            <div className="mb-4">
                <h2 className="text-lg font-bold uppercase border-b-2 mb-1 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
                  Education
                </h2>
                <div className="border-b w-full" style={{ borderColor: themeColor }}></div>
            </div>
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
          <div className="mb-8 shrink-0">
             <div className="mb-4">
                <h2 className="text-lg font-bold uppercase border-b-2 mb-1 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
                  Work Experience
                </h2>
                <div className="border-b w-full" style={{ borderColor: themeColor }}></div>
            </div>
            <div>
                {experience.map(exp => (
                    <ContentRow 
                        key={exp.id}
                        date={`${exp.startDate} - ${exp.endDate}`}
                        title={exp.jobTitle}
                        subtitle={`${exp.employer}, ${exp.city}`}
                        description={exp.description}
                    />
                ))}
            </div>
          </div>
      )}

      {/* --- 4. KEY PROJECTS --- */}
      {projects && projects.length > 0 && (
          <div className="mb-8 shrink-0">
             <div className="mb-4">
                <h2 className="text-lg font-bold uppercase border-b-2 mb-1 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
                  Key Projects
                </h2>
                <div className="border-b w-full" style={{ borderColor: themeColor }}></div>
            </div>
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

      {/* --- 5. ADDITIONAL TRAINING (Certificates) --- */}
      {certificates && certificates.length > 0 && (
          <div className="mb-8 shrink-0">
             <div className="mb-4">
                <h2 className="text-lg font-bold uppercase border-b-2 mb-1 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
                  Additional Training
                </h2>
                <div className="border-b w-full" style={{ borderColor: themeColor }}></div>
            </div>
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
           <div className="mb-8 shrink-0">
             <div className="mb-4">
                <h2 className="text-lg font-bold uppercase border-b-2 mb-1 inline-block w-full" style={{ color: themeColor, borderColor: themeColor }}>
                  Skills & Competencies
                </h2>
                <div className="border-b w-full" style={{ borderColor: themeColor }}></div>
            </div>
             
             {skills && skills.length > 0 && (
                 <div className="flex text-[13px] mb-3">
                    <span className="w-36 font-bold shrink-0" style={{ color: themeColor }}>Professional Skills</span>
                    <span className="w-4 text-center font-bold" style={{ color: themeColor }}>:</span>
                    <span className="flex-1 text-slate-800 leading-relaxed">{skills.join(", ")}</span>
                 </div>
             )}
             
             {languages && languages.length > 0 && (
                 <div className="flex text-[13px] mb-3">
                    <span className="w-36 font-bold shrink-0" style={{ color: themeColor }}>Languages</span>
                    <span className="w-4 text-center font-bold" style={{ color: themeColor }}>:</span>
                    <span className="flex-1 text-slate-800 leading-relaxed">{languages.join(", ")}</span>
                 </div>
             )}

             {hobbies && hobbies.length > 0 && (
                 <div className="flex text-[13px]">
                    <span className="w-36 font-bold shrink-0" style={{ color: themeColor }}>Interests</span>
                    <span className="w-4 text-center font-bold" style={{ color: themeColor }}>:</span>
                    <span className="flex-1 text-slate-800 leading-relaxed">{hobbies.join(", ")}</span>
                 </div>
             )}
           </div>
      )}

    </div>
  );
};