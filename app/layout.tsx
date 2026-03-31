import type { Metadata } from 'next';
import { Toaster } from "react-hot-toast"; 
import { Inter } from 'next/font/google'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from "./providers";
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuraResume - AI Powered CV Builder',
  description: 'Build professional resumes in minutes with Gemini AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        
        <Providers>

          <Toaster position="bottom-right" reverseOrder={false} /> {/* <-- Add this here */}
          <CookieBanner />
            
            {/* --- GLOBAL BACKGROUND START --- */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
              {/* FIXED: Changed bg-size-[4rem_4rem] to bg-[size:4rem_4rem] */}
              <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,white_100%)] opacity-60"></div>
            </div>
            {/* --- GLOBAL BACKGROUND END --- */}

            <Navbar />
            
            {/* FIXED: Removed pt-16 so your page backgrounds start at the very top */}
            <main className="min-h-screen">
              {children}
            </main>

            <Footer />

        </Providers>
        
      </body>
    </html>
  );
}