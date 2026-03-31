// data/templates.ts

export interface Template {
  id: string;
  name: string;
  price: number;
  type: 'Free' | 'Casual' | 'Professional' | 'Corporate' | 'Creative';
  thumbnail: string; 
  componentName: string; 
  accentColor: string; 
}

export const RESUME_TEMPLATES: Template[] = [
  // --- TIER 1: FREE (0 KSH) ---
  { id: 'free-1', name: 'Clean Minimalist', price: 0, type: 'Free', thumbnail: '/templates/free-1.jpeg', componentName: 'TemplateFree1', accentColor: 'bg-slate-50' },
  { id: 'free-2', name: 'Simple Text', price: 0, type: 'Free', thumbnail: '/templates/free-2.jpeg', componentName: 'TemplateFree2', accentColor: 'bg-gray-50' },

  // --- TIER 2: CASUAL (50 KSH) ---
  { id: 'basic-1', name: 'Junior Blue', price: 50, type: 'Casual', thumbnail: '/templates/basic-1.jpeg', componentName: 'TemplateBasic1', accentColor: 'bg-blue-50' },
  { id: 'basic-2', name: 'Entry Level', price: 50, type: 'Casual', thumbnail: '/templates/basic-2.jpeg', componentName: 'TemplateBasic2', accentColor: 'bg-indigo-50' },

  // --- TIER 3: CREATIVE (75 KSH) --- 
  
  { id: 'creative-1', name: 'CEO Branding', price: 75, type: 'Creative', thumbnail: '/templates/creative-1.png', componentName: 'TemplateCreative1', accentColor: 'bg-purple-100' },
  { id: 'creative-2', name: 'Art Director', price: 75, type: 'Creative', thumbnail: '/templates/creative-2.jpeg', componentName: 'TemplateCreative2', accentColor: 'bg-pink-100' },

  // --- TIER 4: CORPORATE (100 KSH) ---
  { id: 'corp-1', name: 'Executive Suite', price: 100, type: 'Corporate', thumbnail: '/templates/corp-1.png', componentName: 'TemplateCorp1', accentColor: 'bg-slate-200' },
  { id: 'corp-2', name: 'Managerial', price: 100, type: 'Corporate', thumbnail: '/templates/corp-2.png', componentName: 'TemplateCorp2', accentColor: 'bg-zinc-200' },

  // --- TIER 5: PROFESSIONAL (150 KSH) --- 
  
  { id: 'pro-1', name: 'Modern Split', price: 150, type: 'Professional', thumbnail: '/templates/pro-1.jpeg', componentName: 'TemplatePro1', accentColor: 'bg-emerald-50' },
  { id: 'pro-2', name: 'Tech Resume', price: 150, type: 'Professional', thumbnail: '/templates/pro-2.jpeg', componentName: 'TemplatePro2', accentColor: 'bg-teal-50' },
];