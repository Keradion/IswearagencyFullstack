import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VideoShowcaseSection from './components/VideoShowcaseSection';
import StatsSection from './components/StatsSection';
import CoreValuesSection from './components/CoreValuesSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseSection from './components/WhyChooseSection';
import TestimonialsSection from './components/TestimonialsSection';
import GallerySection from './components/GallerySection';
import CTABanner from './components/CTABanner';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-brand-sand font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <AboutSection />
          <VideoShowcaseSection />
          <StatsSection />
          <CoreValuesSection />
          <ServicesSection />
          <WhyChooseSection />
          <TestimonialsSection />
          <GallerySection />
          <CTABanner />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}

export default App;
