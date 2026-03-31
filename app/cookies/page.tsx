import React from 'react';
import { Cookie, Info, Settings, Globe, Mail, ShieldCheck } from 'lucide-react';

export default function CookiePolicy() {
  const lastUpdated = "March 16, 2026"; // Update this date

  return (
    <div className="min-h-screen bg-[#f4f7fb] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-600 px-8 py-12 text-center">
          <Cookie className="w-12 h-12 text-white/90 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Cookie Policy
          </h1>
          <p className="text-blue-100 text-sm">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12 space-y-8 text-gray-600 leading-relaxed text-sm md:text-base">
          
          <section>
            <p>
              This Cookie Policy explains how <strong>AuraResume</strong> ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Info className="text-blue-500 w-5 h-5" /> 
              1. What are cookies?
            </h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, AuraResume) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies".
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShieldCheck className="text-blue-500 w-5 h-5" /> 
              2. Why do we use cookies?
            </h2>
            <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our application.</p>
            
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4 mt-4">
              <div>
                <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                <p className="text-sm mt-1">These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as logging into your secure account and saving your resume progress.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Performance and Functionality Cookies</h3>
                <p className="text-sm mt-1">These are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics and Customization Cookies</h3>
                <p className="text-sm mt-1">These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="text-blue-500 w-5 h-5" /> 
              3. What about third-party technologies?
            </h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. This includes services like Google Analytics or payment processors like Stripe if you upgrade to a premium account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="text-blue-500 w-5 h-5" /> 
              4. How can I control cookies?
            </h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your web browser. 
            </p>
            <p>
              As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. Please note that if you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website (like saving your resume data) may be restricted.
            </p>
          </section>

          <hr className="border-gray-100 my-8" />

          {/* Contact Section */}
          <section className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-1">
                <Mail className="w-5 h-5" /> Questions about cookies?
              </h2>
              <p className="text-blue-800 text-sm">
                If you have any questions about our use of cookies or other technologies, please email us.
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