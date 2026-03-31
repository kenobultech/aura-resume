import React from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "March 16, 2026"; // Update this date

  return (
    <div className="min-h-screen bg-[#f4f7fb] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-600 px-8 py-12 text-center">
          <Shield className="w-12 h-12 text-white/90 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-sm">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
          
          <section>
            <p>
              Welcome to <strong>Aura Resume</strong> ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us at <strong>obulken10@gmail.com</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="text-blue-500 w-5 h-5" /> 
              1. Information We Collect
            </h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us, and may include:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li><strong>Personal Details:</strong> Names, phone numbers, email addresses, and mailing addresses.</li>
              <li><strong>Resume Data:</strong> Employment history, education, skills, hobbies, and photographs uploaded for your CV.</li>
              <li><strong>Account Credentials:</strong> Passwords and security info used for authentication.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Eye className="text-blue-500 w-5 h-5" /> 
              2. How We Use Your Information
            </h2>
            <p>We use personal information collected via our website for a variety of business purposes described below:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>To facilitate account creation and logon process.</strong></li>
              <li><strong>To generate your resume:</strong> We process your data strictly to format, design, and export your resume/CV documents.</li>
              <li><strong>AI Enhancements:</strong> If you use our "AI Improve" features, the specific text you submit (e.g., job descriptions, summaries) is sent to our third-party AI provider (e.g., OpenAI) solely for the purpose of generating improved text. We do not use your personal data to train our own AI models.</li>
              <li><strong>To send you marketing and promotional communications</strong> (only if you opted in via our checkbox).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Lock className="text-blue-500 w-5 h-5" /> 
              3. Will Your Information Be Shared?
            </h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may share your data with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Third-Party Service Providers:</strong> Such as hosting providers, email delivery services, and AI APIs (e.g., OpenAI) required to operate the service.</li>
              <li><strong>Legal Obligations:</strong> If we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            </ul>
            <p className="font-semibold text-gray-800">We do not sell your personal data to third parties.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">4. How Long Do We Keep Your Information?</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law. When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">5. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have rights under applicable data protection laws (such as GDPR or CCPA) to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Request access and obtain a copy of your personal information.</li>
              <li>Request rectification or erasure of your data.</li>
              <li>Restrict the processing of your personal information.</li>
              <li>Opt-out of marketing communications at any time.</li>
            </ul>
            <p>To exercise these rights, please contact us using the details below. We will review and act upon any request in accordance with applicable data protection laws.</p>
          </section>

          <hr className="border-gray-100 my-8" />

          {/* Contact Section */}
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-1">
                <Mail className="w-5 h-5" /> Contact Us
              </h2>
              <p className="text-blue-800 text-sm">
                Have questions or need to delete your data? Reach out to our support team.
              </p>
            </div>
            <a 
              href="mailto:obulken10@gmail.com" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-sm whitespace-nowrap"
            >
              Email Support
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}