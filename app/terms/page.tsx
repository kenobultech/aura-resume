import React from 'react';
import { Scale, UserCheck, Cpu, AlertTriangle, FileWarning, Mail } from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = "March 16, 2026"; // Update this date

  return (
    <div className="min-h-screen bg-[#f4f7fb] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-600 px-8 py-12 text-center">
          <Scale className="w-12 h-12 text-white/90 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Terms of Service
          </h1>
          <p className="text-blue-100 text-sm">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
          
          <section>
            <p>
              Welcome to <strong>AuraResume</strong>. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications. By accessing or using our resume builder, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="text-blue-500 w-5 h-5" /> 
              1. User Accounts & Responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must provide accurate, complete, and updated information when creating an account or building your resume.</li>
              <li>You are responsible for safeguarding the password that you use to access the service.</li>
              <li>You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Cpu className="text-blue-500 w-5 h-5" /> 
              2. AI Features & User Content
            </h2>
            <p>
              Our service includes features that utilize Artificial Intelligence (AI) to help you write, edit, and improve your resume. By using these features, you acknowledge that:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Content Ownership:</strong> You retain complete ownership of all data, text, and photos you input into the service.</li>
              <li><strong>AI Output:</strong> The AI-generated suggestions are provided "as-is." You are responsible for reviewing, editing, and verifying the accuracy of any AI-generated text before saving it to your resume or submitting it to employers.</li>
              <li><strong>Prohibited Content:</strong> You agree not to input sensitive personal information (like Social Security Numbers or bank details), offensive, or illegal content into the AI enhancement tools.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="text-blue-500 w-5 h-5" /> 
              3. Acceptable Use
            </h2>
            <p>You agree not to use the Service to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Violate any national or international law or regulation.</li>
              <li>Infringe upon the intellectual property rights of others.</li>
              <li>Attempt to bypass, exploit, or disrupt our systems, including spamming or abusing our AI API endpoints.</li>
              <li>Sell, resell, or commercially exploit our resume templates and software infrastructure.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">4. Intellectual Property</h2>
            <p>
              While you retain all rights to your personal data and the specific text within your resume, the structural templates, designs, graphics, and underlying code of <strong>AuraResume</strong> are the exclusive property of our company. You are granted a limited, non-exclusive license to use our templates strictly to generate your personal resume.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileWarning className="text-blue-500 w-5 h-5" /> 
              5. Disclaimers & Limitation of Liability
            </h2>
            <p>
              <strong>No Job Guarantee:</strong> Our service provides tools to help you create a resume, but we do not guarantee employment, interviews, or career advancement.
            </p>
            <p>
              <strong>"As Is" Service:</strong> The service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties, whether express or implied, including the implied warranties of merchantability and fitness for a particular purpose.
            </p>
            <p>
              In no event shall <strong>AuraResume</strong>, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <hr className="border-gray-100 my-8" />

          {/* Contact Section */}
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-1">
                <Mail className="w-5 h-5" /> Questions about our terms?
              </h2>
              <p className="text-blue-800 text-sm">
                If you have any questions about these Terms, please contact us.
              </p>
            </div>
            <a 
              href="mailto:obulken10@gmail.com" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-sm whitespace-nowrap"
            >
              Contact Support
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}