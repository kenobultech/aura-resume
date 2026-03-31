// app/page.tsx
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import About from '@/components/About';
import Services from '@/components/Services';
import ResumeTemplates from '@/components/ResumeTemplates';
import Testimonials from '@/components/Testimonial';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/NewsLetter';

export default function Home() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Partners Section */}
      <Partners />

      {/* 3. About Section */}
      <About />
      {/* 4. Services Section */}
      <Services />
      {/* 5. Resume Templates Section */}
      <ResumeTemplates />

      {/* 6. Testimonials Section */}
      <Testimonials />

      {/* 7. FAQ Section */}
      <FAQ />

      {/* 8. Newsletter Section */}
      <Newsletter />

    </div>
  );
}