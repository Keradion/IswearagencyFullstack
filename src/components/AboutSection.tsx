import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Light Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/gallery/light-bg.png" 
          alt="Modern Light Background" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-white/70"></div>
      </div>
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-brand-primary font-bold text-[12px] uppercase tracking-widest mb-2">
              <span className="w-8 h-[2px] bg-brand-secondary"></span>
              <span>{t.navAbout}</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif font-bold text-brand-primary leading-tight">
              {t.aboutTitle}
            </h2>
            
            <p className="text-brand-gray text-xl md:text-2xl leading-relaxed mt-4">
              {t.aboutText}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-secondary shrink-0 mt-1" size={24} />
                <span className="text-brand-slate font-medium text-lg">{t.aboutFeature1}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-secondary shrink-0 mt-1" size={24} />
                <span className="text-brand-slate font-medium text-lg">{t.aboutFeature2}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-secondary shrink-0 mt-1" size={24} />
                <span className="text-brand-slate font-medium text-lg">{t.aboutFeature3}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-secondary shrink-0 mt-1" size={24} />
                <span className="text-brand-slate font-medium text-lg">{t.aboutFeature4}</span>
              </div>
            </div>

            <div className="mt-10">
              <a href="#services" className="inline-flex bg-brand-primary hover:bg-brand-primary-light text-white text-sm uppercase tracking-wider font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-md">
                {t.exploreServices}
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Decoration */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-brand-primary/10 rounded-full blur-2xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/gallery/media__1780938363928.jpg" 
                alt="About I Swear Agency" 
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply"></div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-4 hidden sm:flex">
              <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-serif font-bold text-2xl">
                5+
              </div>
              <div>
                <p className="font-bold text-brand-slate">Years of</p>
                <p className="text-brand-gray text-sm">Proven Excellence</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
