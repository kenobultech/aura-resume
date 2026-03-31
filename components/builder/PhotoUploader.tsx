import React, { useState, useRef } from "react";
import { User, Loader2 } from "lucide-react";

export default function PhotoUploader({
  currentPhoto,
  onUpload,
}: {
  currentPhoto?: string;
  onUpload: (url: string) => void;
}) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) onUpload(data.url);
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center gap-4 bg-[#f4f7fb] p-3 rounded-lg border border-transparent hover:border-blue-200 transition cursor-pointer group"
      onClick={() => !loading && fileInputRef.current?.click()}
    >
      {/* Avatar Circle */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-white shrink-0 relative flex items-center justify-center text-blue-500 shadow-sm border border-gray-100">
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={20} />
        )}
        
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <Loader2 className="animate-spin text-blue-600" size={16} />
          </div>
        )}
      </div>

      {/* Text Info */}
      <div>
        <p className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition">
          {currentPhoto ? "Change Photo" : "Upload Photo"}
        </p>
        <p className="text-xs text-gray-400">Square format recommended</p>
      </div>

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}