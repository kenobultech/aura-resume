import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

export const AIButton = ({ text, context, onUpdate }: { text: string; context: string; onUpdate: (val: string) => void }) => {
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch('/api/enhanced-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, context }),
      });
      const data = await res.json();
      if (data.improvedText) onUpdate(data.improvedText);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  return (
    <button onClick={handleEnhance} disabled={loading} type="button" 
      className="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded transition text-[11px] font-semibold">
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
      {loading ? "Enhancing..." : "AI Improve"}
    </button>
  );
};