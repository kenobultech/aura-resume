"use client"; // <--- Add this line at the very top

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import your builder client component and disable Server-Side Rendering (SSR)
const BuilderClient = dynamic(() => import("./BuilderClient"), { 
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  )
});

export default function Page() {
  return <BuilderClient />;
}