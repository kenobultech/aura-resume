// hooks/useResumebuilder.ts
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ResumeData } from "@/components/templates/ResumeTypes";

export function useResumeBuilder(templateId: string) {
  const { data: session, status } = useSession();
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");

  const [resumeData, setResumeData] = useState<ResumeData>({
    themeColor: "#1a4c78",
    personalInfo: {
      firstName: "", lastName: "", email: "", phone: "", role: "", address: "",
      city: "", country: "", website: "", linkedin: "", twitter: "", summary: "", photo: "",
    },
    experience: [],
    education: [],
    projects: [], // <--- ADDED
    certificates: [],
    skills: [],
    languages: [],
    hobbies: [],
  });

  // 1. Fetch Data
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setIsPageLoading(false);
      return;
    }
    if (status === "authenticated") {
      setIsPageLoading(true); 
      
      fetch(`/api/resume?templateId=${templateId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.resume) {
            setResumeData({
              _id: data.resume._id,
              themeColor: data.resume.themeColor || "#1a4c78",
              experience: data.resume.experience || [],
              education: data.resume.education || [],
              projects: data.resume.projects || [], // <--- ADDED
              certificates: data.resume.certificates || [],
              skills: data.resume.skills || [],
              languages: data.resume.languages || [],
              hobbies: data.resume.hobbies || [],
              personalInfo: {
                firstName: "", lastName: "", email: "", phone: "", role: "", address: "",
                city: "", country: "", website: "", linkedin: "", twitter: "", summary: "", photo: "",
                ...(data.resume.personalInfo || {}),
              },
            });
            setResumeId(data.resume._id);
          } else {
            const nameParts = (session.user?.name || "").split(" ");
            setResumeData({
              themeColor: "#1a4c78",
              experience: [], education: [], projects: [], certificates: [], skills: [], languages: [], hobbies: [], // <--- ADDED projects
              personalInfo: {
                firstName: nameParts[0] || "",
                lastName: nameParts.slice(1).join(" ") || "",
                email: session.user?.email || "",
                phone: "", role: "", address: "", city: "", country: "", website: "", linkedin: "", twitter: "", summary: "",
                photo: session.user?.image || "",
              },
            });
            setResumeId(null);
          }
          setIsPageLoading(false);
        })
        .catch(() => setIsPageLoading(false));
    }
  }, [status, session, templateId]);

  // 2. Auto-Save (No changes needed here as it spreads ...resumeData)
  useEffect(() => {
    if (isPageLoading || status !== "authenticated") return;
    setSaveStatus("saving");
    
    const timer = setTimeout(async () => {
      try {
        const res = await fetch("/api/resume", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...resumeData, templateId }), 
        });
        
        if (res.ok) {
          const data = await res.json();
          const savedId = data.resume?._id || data._id;
          if (savedId) {
            setResumeId(savedId);
            if (!resumeData._id) {
              setResumeData((prev) => ({ ...prev, _id: savedId }));
            }
          }
          setSaveStatus("saved");
        } else {
          setSaveStatus("error");
        }
      } catch {
        setSaveStatus("error");
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [resumeData, templateId, isPageLoading, status]);

  // 3. Handlers
  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const handleArrayChange = (field: "skills" | "languages" | "hobbies", value: string[]) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  // Updated to include "projects" in the union type
  const addListItem = (section: "experience" | "education" | "certificates" | "projects") => {
    const newItem = { id: Date.now().toString() }; 
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem],
    }));
  };

  const removeListItem = (
    section: "experience" | "education" | "certificates" | "projects",
    id: string,
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((item) => item.id !== id),
    }));
  };

  const updateListItem = (section: string, id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: (prev[section as keyof ResumeData] as any[]).map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    }));
  };

  return {
    resumeData,
    setResumeData,
    resumeId,
    isPageLoading,
    saveStatus,
    handlers: {
      handleInfoChange,
      handleArrayChange,
      addListItem,
      removeListItem,
      updateListItem,
    },
  };
}