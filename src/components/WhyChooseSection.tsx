import { Shield, Sparkles, Target, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseSection() {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t.why1 },
    { icon: Sparkles, title: t.why2 },
    { icon: Target, title: t.why3 },
    { icon: Globe, title: t.why4 }
  ];

  return (
    <section className="py-20 bg-brand-primary text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary-light rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 xl:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              {t.whyTitle}
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-8">
              {t.heroDescription}
            </p>
            <a href="#contact" className="inline-block bg-brand-secondary hover:bg-brand-secondary-light text-brand-primary text-sm uppercase tracking-wider font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg">
              {t.contactToday}
            </a>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="glass-dark rounded-2xl p-6 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0 border border-brand-secondary/30">
                    <Icon className="text-brand-secondary" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feat.title}</h3>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
