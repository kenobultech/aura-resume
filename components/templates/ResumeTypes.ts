// components/templates/ResumeTypes.ts

export interface Project {
  id: string;
  projectName: string;
  role?: string;       // e.g. "Lead Developer"
  startDate: string;
  endDate: string;
  link?: string;       // e.g. GitHub or Live Demo URL
  description: string;
}

export interface ResumeData {
  _id?: any;
  themeColor?: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    country?: string;
    website?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    summary: string;
    photo?: string;
  };

  experience: Array<{
    id: string;
    jobTitle: string;
    employer: string;
    city?: string;
    country?: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;

  education: Array<{
    id: string;
    school: string;
    degree: string;
    city?: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;

  // --- ADDED PROJECTS ---
  projects: Project[];

  certificates?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
  
  aiAnalysis?: {
    score: number;
    summaryFeedback: string;
    bulletPointsFeedback: string;
    generalSuggestions: string[];
    lastAnalyzedAt?: Date;
  };

  skills: string[];
  languages?: string[];
  hobbies?: string[];
}