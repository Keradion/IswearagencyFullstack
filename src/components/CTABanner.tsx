import { useLanguage } from '../context/LanguageContext';

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-brand-sand px-4 md:px-8 xl:px-16">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-brand-primary to-brand-primary-light rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          <a href="#contact" className="inline-block bg-brand-secondary hover:bg-brand-secondary-light text-brand-primary text-sm uppercase tracking-wider font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:-translate-y-1">
            {t.ctaBtn}
          </a>
        </div>
      </div>
    </section>
  );
}
