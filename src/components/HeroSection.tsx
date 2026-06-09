import { Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/gallery/hero-bg-arabic.png" 
          alt="Hero Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-brand-primary/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/90 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 pt-20 pb-32 flex flex-col items-center text-center">
        {/* Main Content */}
        <h1 className="text-6xl md:text-7xl xl:text-8xl font-serif font-bold text-white leading-[1.1] tracking-tight max-w-5xl animate-fade-in-up">
          {t.heroTitle}
        </h1>
        
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" alt="Saudi Arabia" className="w-10 h-7 object-cover shadow-sm border border-white/20 rounded-sm" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Flag_of_Kuwait.svg" alt="Kuwait" className="w-10 h-7 object-cover shadow-sm border border-white/20 rounded-sm" />
          </div>
          <p className="text-2xl md:text-3xl text-white/90 font-light text-center sm:text-left">
            {t.heroSubtitle}
          </p>
        </div>

        <p className="mt-6 text-brand-sand/80 text-xl md:text-2xl max-w-3xl leading-relaxed font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t.heroDescription}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up justify-center" style={{ animationDelay: '0.3s' }}>
          <a href="#services" className="bg-brand-secondary hover:bg-brand-secondary-light text-brand-primary text-sm uppercase tracking-wider font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg inline-flex items-center justify-center">
            {t.exploreServices}
          </a>
        </div>

        {/* Contact Info Pills */}
        <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white/20 transition-colors cursor-default">
            <Phone size={18} className="text-brand-secondary" />
            <span className="text-white text-sm font-medium tracking-wide">0112755458 | 0962535353</span>
          </div>
          <div className="glass px-6 py-3 rounded-full flex items-center gap-3 hover:bg-white/20 transition-colors cursor-default">
            <MapPin size={18} className="text-brand-secondary" />
            <span className="text-white text-sm font-medium tracking-wide">{t.addressText}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scroll-indicator">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
