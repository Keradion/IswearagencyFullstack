import { Shield, Sparkles, Target, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      title: t.why1,
      desc: 'Comprehensive visa & documentation support — we handle paperwork, contract review, and compliance so you travel with confidence.'
    },
    {
      icon: Sparkles,
      title: t.why2,
      desc: 'Personalized pre-departure training and skills matching to ensure you meet employer expectations and thrive on arrival.'
    },
    {
      icon: Target,
      title: t.why3,
      desc: 'Proven job placement and employer partnerships — we connect you to vetted opportunities that match your career goals.'
    },
    {
      icon: Globe,
      title: t.why4,
      desc: 'End-to-end travel and aftercare support, including onboarding assistance and local follow-up so you are never alone abroad.'
    }
  ];

  return (
    <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary-light rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="lg:w-1/3">
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-serif font-bold text-white mb-6">
              {t.whyTitle}
            </h2>
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              {t.heroDescription}
            </p>
            <a href="#contact" className="inline-block bg-brand-secondary hover:bg-brand-secondary-light text-white text-sm uppercase tracking-wider font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg">
              {t.contactToday}
            </a>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-dark rounded-2xl p-8 flex flex-col items-start gap-4 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0 border border-brand-secondary/30">
                    <Icon className="text-brand-secondary" size={28} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">{feat.title}</h3>
                  <p className="text-brand-sand/70 text-lg leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
