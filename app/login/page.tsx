// app/login/page.tsx
import GoogleSignInButton from '@/components/GoogleSignInButton';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <div className="text-center mb-8">
           {/* Main Logo Again */}
           <div className="relative w-12 h-12 mx-auto mb-4">
                <Image src="/images/main-logo.png" alt="Logo" fill className="object-contain" />
           </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Start building your dream career today.</p>
        </div>

        {/* The Google Button */}
        <div className="space-y-4">
          <GoogleSignInButton />
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          By continuing, you agree to our <Link href="/terms" className="underline hover:text-blue-600">Terms</Link> and <Link href="/privacy" className="underline hover:text-blue-600">Privacy Policy</Link>.
        </p>

      </div>
    </div>
  );
}