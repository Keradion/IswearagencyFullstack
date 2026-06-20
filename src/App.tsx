import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Public page sections
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
import BlogPostPage from './pages/BlogPostPage';

function PublicSite() {
  return (
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            {/* Public site */}
            <Route path="/" element={<PublicSite />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all → home */}
            <Route path="*" element={<PublicSite />} />
          </Routes>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
