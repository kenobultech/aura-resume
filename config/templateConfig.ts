// config/templateConfig.ts

export const TEMPLATE_CONFIG: Record<string, { hasPhoto: boolean }> = {
  // --- FREE ---
  'free-1': { hasPhoto: true },   // Photo
  'free-2': { hasPhoto: false },  // No Photo

  // --- CASUAL (Basic) ---
  'basic-1': { hasPhoto: false },  //  no Photo
  'basic-2': { hasPhoto: true }, // Photo

  // --- CREATIVE (75 KSH) ---
  'creative-1': { hasPhoto: true },  // Photo
  'creative-2': { hasPhoto: false }, // No Photo

  // --- CORPORATE (100 KSH) ---
  'corp-1': { hasPhoto: true },   // Photo
  'corp-2': { hasPhoto: false },  // No Photo

  // --- PROFESSIONAL (150 KSH) ---
  // THE EXCEPTION: Text-heavy templates, neither allows photos
  'pro-1': { hasPhoto: false },   // No Photo
  'pro-2': { hasPhoto: false },   // No Photo
};